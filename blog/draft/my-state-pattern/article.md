---
title: "my-state: un patrón para gestionar el estado de tus páginas con nanostores"
description: "Un patrón de diseño para modelar el estado de una página o app como un único store compuesto por recurso (sesión, datos remotos, health checks), usando nanostores, con variantes monolítica y atomizada, y ejemplos en React y JS vanilla."
cover: ./assets/cover.png
lang: es
author:
  name: Jonathan Delgado
  email: hi@jon.soy
  website: https://jon.soy
  github: "@jondotsoy"
date: 2026-08-19
publications: []
---

# my-state: un patrón para gestionar el estado de tus páginas con nanostores

## Overview

Casi cualquier página no trivial de una app necesita combinar varias fuentes de datos: la sesión del usuario, un listado que viene de una API, el estado de salud del backend, alguna configuración remota. Cada una de esas fuentes tiene su propio ciclo: está cargando, falló, o ya tiene datos. El problema aparece cuando cada desarrollador resuelve ese ciclo a su manera dentro de cada componente: un `useState` acá, un `useEffect` allá, un `isLoading` que no siempre significa lo mismo.

`my-state` es un patrón simple para ordenar ese caos: modelar el estado de una página como **un único store compuesto por recurso**, donde cada recurso sigue la misma forma predecible, usando [nanostores](https://github.com/nanostores/nanostores) como base.

## TLDR

- Cada "pieza" de estado (sesión, artículos recientes, health del server, etc.) se modela como una tupla `[loading, error, data]`.
- El estado de una página completa es un objeto que agrupa todas esas piezas, expuesto como un `atom` de nanostores.
- El fetch de cada pieza se dispara dentro de `onMount`, así solo se pide la información cuando alguien realmente está escuchando el store.
- El mismo store se puede modelar de forma monolítica (un solo atom con un solo `onMount`) o atomizada (un atom por recurso, compuestos con `computed`).
- El consumo es igual de simple en React (`useStore`) que en JS vanilla (`subscribe` / `listen`).

## El problema: estado disperso sin una forma común

Piensa en una página `home` que necesita mostrar:

- La sesión del usuario autenticado.
- Los artículos más recientes.
- El estado de salud del servidor.

Sin un patrón claro, es común terminar con tres piezas de estado gestionadas de formas distintas, cada una con su propio nombre para "cargando" (`isLoading`, `loading`, `pending`) y su propia forma de representar errores (a veces un string, a veces un objeto, a veces ni siquiera se contempla). El resultado es una página difícil de razonar y difícil de testear.

`my-state` propone resolver esto fijando una convención única para cualquier recurso remoto: la tupla de estado.

## Anatomía del estado: la tupla `[loading, error, data]`

Cada recurso que la página consume se representa con el mismo tipo:

```ts
type Resource<T> = [loading: boolean, error: Error | null, data: T | null]
```

Y el estado completo de la página es un objeto que agrupa una tupla por cada sección de información que necesita:

```ts
type HomeState = {
  session: Resource<SessionData>
  recentArticles: Resource<Article[]>
  serverHealth: Resource<HealthData>
}
```

> La ventaja de usar siempre la misma forma `[loading, error, data]` es que cualquier componente que consuma una pieza de estado sabe exactamente cómo leerla, sin importar de qué recurso se trate.

## Implementación monolítica: un atom, un `onMount`

La forma más directa de implementar `my-state` es con un solo `atom` de nanostores que contiene todo el estado de la página, y un `onMount` que dispara todos los fetch necesarios:

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
      const data = await fetch('/api/session').then((r) => r.json())
      $home.set({ ...$home.get(), session: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), session: [false, error as Error, null] })
    }
  }

  async function fetchRecentArticles() {
    try {
      const data = await fetch('/api/articles/recent').then((r) => r.json())
      $home.set({ ...$home.get(), recentArticles: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), recentArticles: [false, error as Error, null] })
    }
  }

  async function fetchServerHealth() {
    try {
      const data = await fetch('/api/health').then((r) => r.json())
      $home.set({ ...$home.get(), serverHealth: [false, null, data] })
    } catch (error) {
      $home.set({ ...$home.get(), serverHealth: [false, error as Error, null] })
    }
  }
})
```

Dos detalles importantes de este ejemplo:

- **`onMount` es perezoso**: nanostores solo ejecuta el callback cuando el store tiene al menos un subscriptor, y lo limpia cuando el último subscriptor se va. Esto evita pedir datos de una página que nadie está mirando.
- **El estado nunca se muta**: cada actualización llama a `$home.set(...)` con un objeto nuevo, construido a partir del estado anterior (`$home.get()`). Mutar el objeto directamente rompería la reactividad de nanostores.

Esta variante es ideal cuando la página es simple y no necesitas reutilizar la lógica de fetch de `session` o `serverHealth` en ninguna otra parte de la app.

## Implementación atomizada: un recurso, un atom, compuestos con `computed`

Cuando varias páginas comparten recursos (por ejemplo, `session` la necesitan casi todas las páginas autenticadas), conviene atomizar cada pieza en su propio store reutilizable, y componer el estado de la página con `computed`:

```ts
import { atom, onMount, computed } from 'nanostores'

function createResource<T>(fetcher: () => Promise<T>) {
  const $resource = atom<Resource<T>>([true, null, null])

  onMount($resource, () => {
    fetcher()
      .then((data) => $resource.set([false, null, data]))
      .catch((error) => $resource.set([false, error as Error, null]))
  })

  return $resource
}

const $session = createResource(() => fetch('/api/session').then((r) => r.json()))
const $recentArticles = createResource(() => fetch('/api/articles/recent').then((r) => r.json()))
const $serverHealth = createResource(() => fetch('/api/health').then((r) => r.json()))

const $home = computed(
  [$session, $recentArticles, $serverHealth],
  (session, recentArticles, serverHealth) => ({ session, recentArticles, serverHealth }),
)
```

Lo interesante de `computed` en nanostores es que propaga la suscripción de forma transitiva: en cuanto algo escucha `$home`, nanostores activa automáticamente el `onMount` de cada atom fuente (`$session`, `$recentArticles`, `$serverHealth`), sin que tengas que orquestarlo manualmente.

**Ventajas de esta variante:**

- Cada recurso (`$session`, `$serverHealth`, etc.) es reutilizable en cualquier otra página sin duplicar la lógica de fetch.
- Cada pieza se puede testear de forma aislada, sin montar toda la página.
- Se pueden combinar recursos compartidos con recursos específicos de una página en un mismo `computed`.

**Costo a considerar:** si necesitas lógica compartida entre los distintos fetch (por ejemplo, resolver un token de autenticación una sola vez y reutilizarlo en todos), esa coordinación ya no vive naturalmente en un único `onMount`, y hay que resolverla explícitamente (por ejemplo, con un recurso adicional del que dependan los demás).

## Consumo en React

Con `@nanostores/react`, exponer el estado como un hook es directo:

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

`useStore` se encarga de suscribirse al montar el componente y desuscribirse al desmontarlo, lo que activa y desactiva el `onMount` del store automáticamente.

## Consumo en JS vanilla

El mismo store `$home` funciona igual de bien fuera de React, con dos métodos que conviene distinguir:

```ts
// subscribe: dispara inmediatamente con el valor actual, y luego con cada cambio
$home.subscribe((state) => {
  render(state)
})

// listen: solo dispara con cambios futuros, no con el valor actual
$home.listen((state) => {
  console.log('state changed', state)
})
```

La diferencia es clave: si necesitas pintar el estado inicial (aunque sea el estado de "cargando"), usa `subscribe`. Si solo te interesa reaccionar a cambios posteriores (por ejemplo, para loguear o disparar analítica), `listen` evita el disparo inicial redundante.

## Buenas prácticas

- **Nombra los stores por página o feature**, no genéricamente: `$home`, `$profile`, `$checkout`. Facilita ubicar a qué pantalla pertenece cada estado.
- **Nunca mutes el objeto de estado.** Siempre actualiza con `set` pasando un objeto nuevo derivado del anterior.
- **Tipa la tupla de estado** para no depender de acceder por índice sin contexto; desestructurar con nombres (`const [loading, error, data] = session`) ayuda a la legibilidad.
- **Considera cancelar fetch en curso** si el store se desmonta antes de que la petición termine, especialmente en páginas donde el usuario navega rápido.
- **Comparte recursos entre páginas** con la variante atomizada cuando detectes que dos o más páginas piden lo mismo (como `session`).

## ¿Por qué nanostores y no Redux, Zustand o Context?

Nanostores no busca reemplazar a estas herramientas en todos los casos, pero encaja particularmente bien con `my-state` por tres razones:

- **Stores atómicos por diseño**: cada pieza de estado es un store independiente, que es exactamente la unidad que necesita este patrón.
- **Framework-agnostic**: el mismo store se consume desde React, Vue, Svelte o JS vanilla sin cambiar la lógica de negocio, algo que no es tan directo con soluciones acopladas a un framework como Context+`useReducer`.
- **Tree-shakeable y liviano**: al no depender de un store global único (como Redux), cada página solo carga los stores que realmente usa.

## Conclusión

`my-state` no es una librería, es una convención: representar cada recurso remoto como una tupla `[loading, error, data]`, agrupar esas tuplas por página en un store de nanostores, y disparar los fetch dentro de `onMount` para que solo se pidan datos cuando alguien los está mirando. Empieza con la variante monolítica si tu página es simple, y migra a la variante atomizada en cuanto detectes recursos compartidos entre páginas. El resto —React, JS vanilla, o cualquier otro consumidor— se conecta al store sin fricción.
