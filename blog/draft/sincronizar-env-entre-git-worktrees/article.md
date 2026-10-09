---
title: Un solo archivo para los .env de todos tus git worktrees
description: Los worktrees multiplican ramas, dependencias y secretos. Presento @jondotsoy/envs, una CLI que centraliza los .env de todos los worktrees en un único YAML, y una guía para incorporarla al flujo diario.
lang: es
author:
  name: Jonathan Delgado
  email: hi@jon.soy
  website: https://jon.soy
  github: "@jondotsoy"
date: 2026-10-09
publications: []
---

Llevo tiempo usando `git worktree` en mi trabajo diario. Permite tener varias ramas abiertas al mismo tiempo, cada una en su propio directorio, sin recurrir a `git stash` ni a cambios de rama constantes. Sin embargo, hace poco me detuve a revisar el costo real de ese hábito y encontré tres problemas.

## Los tres problemas de vivir con worktrees

- **Proliferación de worktrees.** Cada rama termina con su propio directorio de trabajo. Si no existe una disciplina de limpieza, la cantidad crece sin control y se vuelve difícil saber cuáles siguen siendo útiles.
- **Duplicación de dependencias.** Cada worktree es una copia independiente del árbol de trabajo, por lo que también lo es su `node_modules` (o el equivalente según el ecosistema). El espacio en disco y el tiempo de instalación se multiplican por el número de worktrees.
- **Secretos copiados a mano.** Los archivos `.env` no se versionan, de modo que un worktree nuevo nace sin ellos. La salida habitual es copiar y pegar los valores desde otro worktree, con el riesgo de olvidar una variable, usar un valor desactualizado o dejar un secreto en un lugar inapropiado.

Los dos primeros son problemas de organización y de almacenamiento, y se atacan con hábitos y con otras herramientas. El tercero tiene una solución directa, y es el que aborda este artículo.

## La herramienta: `@jondotsoy/envs`

`@jondotsoy/envs` es una CLI que mantiene los valores de `.env` de todos los worktrees de un repositorio en un único archivo, `.envs/values.yml`. Permite editar todos los valores en conjunto y distribuirlos a cada worktree, o bien recogerlos desde los `.env` que ya existen.

> **Definición.** Un archivo YAML central es la fuente de verdad de las variables de entorno; los `.env` de cada worktree son una proyección de ese archivo.

### Requisitos

- **Bun** y **git** instalados. La herramienta usa APIs propias de Bun (por ejemplo, el parser de YAML integrado), por lo que no funciona con Node. El paquete no declara una versión mínima de Bun; se recomienda usar una versión reciente.
- El comando `envs edit` abre el archivo con VS Code, así que el ejecutable `code` debe estar en el `PATH`. El editor no es configurable por ahora.
- No requiere conexión de red: solo invoca `git` y, en el caso de `edit`, `code`.

### Cómo funciona

La herramienta se ejecuta desde cualquier worktree del repositorio. Internamente:

- **Ubicación.** Guarda el archivo en `.envs/values.yml`, dentro del repositorio principal, aunque el comando se ejecute desde otro worktree.
- **Identificación.** Obtiene los worktrees con `git worktree list` y los identifica por el nombre de su rama (por ejemplo, `main` o `feature/biz`). Si un worktree está en estado *detached HEAD*, usa el nombre de su carpeta.
- **Un archivo por repositorio.** No existe un concepto de proyecto aparte: hay un `.envs/` por cada repositorio.

### Comandos

- **`envs init`**: crea `.envs/`, un `.gitignore` interno con `*` (para que su contenido nunca se versione) y un `values.yml` vacío.
- **`envs pull`**: lee el `.env` de cada worktree y consolida los valores en `values.yml`.
- **`envs push`**: escribe en el `.env` de cada worktree los valores definidos en `values.yml`. Actualiza las variables existentes en su lugar, agrega las nuevas al final y conserva comentarios y variables ajenas.
- **`envs edit`**: ejecuta `pull`, abre `values.yml` en VS Code y, al cerrar el editor, ejecuta `push`. Si el editor termina con error, no se distribuye nada.
- **`envs lint`**: revisa problemas de seguridad (permisos del archivo, secretos versionados, valores débiles, URLs con credenciales) y termina con código de salida 1 si encuentra advertencias, lo que lo hace apto para CI.

### El formato de `values.yml`

El archivo se organiza por variable y, dentro de cada una, por worktree:

```yaml
defaults:
  LOG_LEVEL: info

envs:
  DATABASE_URL:
    main: postgres://localhost/main
    feature-x: postgres://localhost/feature_x
  PORT:
    main: "3000"
    feature-x: "3001"
```

- **`defaults`**: valores que se escriben en **todos** los worktrees.
- **`envs.<VARIABLE>.<worktree>`**: valor específico de un worktree; tiene prioridad sobre `defaults`.

Esta organización por variable responde a la segunda pregunta que motivó la herramienta: ver de un vistazo en qué worktrees está configurada cada variable y con qué valor. No existe un comando `list` o `status`; el propio `values.yml` es esa vista consolidada. Además, `pull` y `push` informan qué ramas y variables se movieron:

```text
↓ pulling main, feature/biz - 3 variables
↻ LOG_LEVEL=info → main, feature/biz
```

## Guía de adopción rápida

Esta guía lleva la herramienta desde cero hasta el uso cotidiano. Cada paso es independiente del anterior en cuanto a riesgo, y el conjunto toma pocos minutos.

### 1. Verificar los requisitos

```bash
bun --version
git --version
code --version
```

### 2. Probar sin instalar

Desde cualquier worktree del repositorio:

```bash
bunx @jondotsoy/envs help
```

Si te convence, instálala de forma global para tener el comando `envs` disponible:

```bash
bun add -g @jondotsoy/envs
```

### 3. Inicializar el repositorio

```bash
envs init
```

Esto crea `.envs/values.yml`. Conviene además asegurarse de que los `.env` de tus worktrees estén ignorados por git en el `.gitignore` del proyecto, porque `init` solo protege el directorio `.envs/`:

```gitignore
.env
```

### 4. Importar lo que ya tienes

```bash
envs pull
```

El comando recoge los `.env` existentes de todos los worktrees y los consolida en `values.yml`. Si el valor de una variable coincide con el de `defaults`, no se duplica.

### 5. Editar y distribuir

```bash
envs edit
```

Cambia los valores en el editor y cierra el archivo: la herramienta distribuye los cambios al `.env` de cada worktree. Este es el comando del día a día.

### 6. Proteger el archivo

El archivo contiene secretos en texto plano. La herramienta no modifica los permisos por sí misma, por lo que se recomienda restringirlos y validar con `lint`:

```bash
chmod 600 .envs/values.yml
envs lint
```

Puedes agregar `envs lint` a tu pipeline de CI para detectar regresiones.

### 7. Incorporarlo al flujo de trabajo

- **Al crear un worktree nuevo:**

  ```bash
  git worktree add ../mi-proyecto-feature-x -b feature-x
  envs edit
  ```

  Agrega las variables propias de la rama nueva, o define las comunes en `defaults`, y cierra el editor para que se escriba su `.env`.
- **Al cambiar un secreto:** edítalo una sola vez en `values.yml`; el `push` lo propaga a todos los worktrees que lo usan.
- **Al eliminar un worktree:** ejecuta `envs edit` y retira las entradas de su rama para mantener el archivo limpio.

## Consideraciones antes de adoptarla

- **Es un proyecto joven.** La versión actual es 0.x, de publicación muy reciente, por lo que su interfaz puede cambiar. Conviene fijar la versión en equipos.
- **`pull` reescribe el YAML.** Al reserializar el archivo se pierden los comentarios que hayas agregado manualmente.
- **No hay respaldo ni bloqueo.** Si dos personas o procesos ejecutan `pull` y `push` al mismo tiempo, el último en escribir gana.
- **El nombre de la rama es la clave.** Si renombras una rama, sus entradas quedan huérfanas y debes migrarlas.
- **Solo maneja `.env`.** No soporta `.env.local` u otros nombres, ni parsea valores multilínea.
- **Sin cifrado.** Es una herramienta de comodidad local, no un gestor de secretos: no la uses para compartir credenciales entre personas ni para producción.
- **`defaults` y secretos.** Los valores en `defaults` llegan a todos los worktrees, incluidos los que no los necesitan; `lint` advierte cuando una variable sensible está allí.

## Conclusión y llamado a la acción

Los worktrees seguirán siendo parte de mi flujo diario, y los problemas de proliferación y de dependencias duplicadas requieren soluciones distintas. Pero el tercer problema, copiar secretos a mano, ya no debería existir. Un solo archivo, un solo comando y una verificación de seguridad integrada reducen una tarea repetitiva y propensa a errores a unos segundos.

Te invito a incorporarla ahora mismo en todos tus proyectos que usen worktrees:

```bash
bunx @jondotsoy/envs init
bunx @jondotsoy/envs pull
bunx @jondotsoy/envs edit
```

Si encuentras errores o tienes ideas para mejorarla, repórtalas en el repositorio del proyecto: <https://github.com/JonDotsoy/envs>.
