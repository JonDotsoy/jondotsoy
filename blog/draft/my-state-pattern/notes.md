# Notas: Patrón "my-state" para gestión de estado por página/app con nanostores

## Idea central

Proponer un patrón de diseño para gestionar el estado de una página o de una app
usando [nanostores](https://github.com/nanostores/nanostores). La idea es tener
**un solo átomo compuesto por página/app** que agrupe todas las "piezas" de
información que esa página necesita (sesión, datos remotos, health checks, etc.),
en vez de tener múltiples stores sueltos sin relación explícita entre sí.

Cada pieza del estado se modela como una tupla/tag de estado tipo:

```ts
type Piece<T> = [loading: boolean, error: Error | null, data: T | null]
```

Y el estado completo de la página es un objeto con una pieza por cada
"sección" de información que la página consume.

## Ejemplo motivador

Una página `home` que necesita:

- `session`: sesión del usuario autenticado
- `recentArticles`: lista de artículos recientes
- `serverHealth`: estado de salud del servidor

```ts
type HomeState = {
  session: [loading: boolean, error: Error | null, data: SessionData | null]
  recentArticles: [loading: boolean, error: Error | null, data: Article[] | null]
  serverHealth: [loading: boolean, error: Error | null, data: HealthData | null]
}
```

## Store con nanostores

```ts
import { atom, onMount } from 'nanostores'

const $home = atom<HomeState>({
  session: [true, null, null],
  recentArticles: [true, null, null],
  serverHealth: [true, null, null],
})

onMount($home, () => {
  fetchSession()
  fetchRecentArticles()
  fetchServerHealth()

  async function fetchSession() {
    try {
      const data = await fetch('/api/session').then(r => r.json())
      $home.set({ ...$home.get(), session: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), session: [false, error as Error, null] })
    }
  }

  async function fetchRecentArticles() {
    try {
      const data = await fetch('/api/articles/recent').then(r => r.json())
      $home.set({ ...$home.get(), recentArticles: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), recentArticles: [false, error as Error, null] })
    }
  }

  async function fetchServerHealth() {
    try {
      const data = await fetch('/api/health').then(r => r.json())
      $home.set({ ...$home.get(), serverHealth: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), serverHealth: [false, error as Error, null] })
    }
  }
})
```

`onMount` de nanostores solo se ejecuta cuando el store tiene al menos un
subscriptor y se limpia (cleanup) cuando el último subscriptor se desmonta. Esto
evita hacer fetch de datos que nadie está usando.

## Variante atomizada + compose

En vez de un único atom gigante, se puede modelar cada pieza como su propio
atom independiente (reutilizable entre páginas) y luego "componerlos" en un
store derivado por página, enganchando el `onMount` de cada pieza por separado.

```ts
import { atom, onMount, computed } from 'nanostores'

function createResource<T>(fetcher: () => Promise<T>) {
  const $resource = atom<[loading: boolean, error: Error | null, data: T | null]>(
    [true, null, null]
  )

  onMount($resource, () => {
    fetcher()
      .then(data => $resource.set([false, null, data]))
      .catch(error => $resource.set([false, error as Error, null]))
  })

  return $resource
}

const $session = createResource(() => fetch('/api/session').then(r => r.json()))
const $recentArticles = createResource(() => fetch('/api/articles/recent').then(r => r.json()))
const $serverHealth = createResource(() => fetch('/api/health').then(r => r.json()))

const $home = computed(
  [$session, $recentArticles, $serverHealth],
  (session, recentArticles, serverHealth) => ({ session, recentArticles, serverHealth })
)
```

Ventajas de esta variante:

- Cada pieza (`$session`, `$serverHealth`, etc.) es reutilizable en otras
  páginas sin duplicar lógica de fetch.
- `computed` en nanostores ya maneja el "subscribe cuando alguien me escucha,
  limpia cuando nadie me escucha" de forma transitiva: si algo escucha
  `$home`, automáticamente se activan los `onMount` de cada atom fuente.
- Se pueden testear las piezas de forma aislada.

Desventaja: se pierde un poco la noción de "un solo mount para toda la página"
si se necesita alguna lógica compartida entre fetches (ej. usar el mismo
token de auth resuelto una sola vez).

## Consumo en React

```ts
import { useStore } from '@nanostores/react'

function useHome() {
  return useStore($home)
}

function HomePage() {
  const { session, recentArticles, serverHealth } = useHome()
  const [sessionLoading, sessionError, sessionData] = session

  if (sessionLoading) return <Spinner />
  if (sessionError) return <ErrorBanner error={sessionError} />

  return (
    <div>
      <UserBadge session={sessionData} />
      <RecentArticlesList state={recentArticles} />
      <ServerHealthIndicator state={serverHealth} />
    </div>
  )
}
```

## Consumo en JS vanilla

```ts
// Suscripción simple: recibe valor actual + cambios futuros
$home.subscribe((state) => {
  render(state)
})

// listen: solo cambios futuros (no dispara con el valor actual)
$home.listen((state) => {
  console.log('state changed', state)
})
```

## Puntos a cubrir en la página/artículo

1. Qué problema resuelve este patrón (estado disperso, falta de loading/error
   consistente, fetch duplicado, fetch de datos que nadie usa).
2. Anatomía del tipo de estado: tupla `[loading, error, data]` por pieza.
3. Implementación "monolítica": un solo atom + un solo onMount con varios
   fetch adentro.
4. Implementación "atomizada": un atom por recurso + `computed` para componer,
   reutilización entre páginas.
5. Uso en React vía `useStore` (hook `useHome`).
6. Uso en vanilla JS vía `subscribe` vs `listen` (diferencia clave: subscribe
   dispara inmediatamente con el valor actual, listen no).
7. Buenas prácticas:
   - Nombrar los stores por página/feature: `$home`, `$profile`, `$checkout`.
   - No mutar el objeto de estado, siempre `set` con un objeto nuevo.
   - Considerar abortar fetch en curso si el componente se desmonta muy rápido.
   - Tipar bien la tupla de estado para evitar accesos incorrectos por índice.
8. Comparación breve con alternativas (Redux, Zustand, Context+useReducer) y
   por qué nanostores encaja bien para este patrón (stores atómicos, tree
   shakeable, framework-agnostic).
9. Demo interactiva embebida (o enlace) que muestre el patrón funcionando:
   loading -> data/error, y cómo cambia el estado de la página en vivo.

## Tono

Igual que el resto del blog: español, profesional pero accesible, con
ejemplos de código TypeScript, sin usar tablas (preferir bullets), sin `---`
como separador de secciones.
