---
title: Un solo archivo para los .env de todos tus git worktrees
description: Cada vez que creas un worktree copias secretos a mano. Presento @jondotsoy/envs, una CLI que centraliza los .env de todos los worktrees en un único YAML y se usa con un solo comando, sin instalar nada.
lang: es
author:
  name: Jonathan Delgado
  email: hi@jon.soy
  website: https://jon.soy
  github: "@jondotsoy"
date: 2026-10-09
publications: []
---

Cada vez que creo un `git worktree`, lo primero que hago es copiar a mano el `.env` de otro. Es un gesto pequeño, repetido decenas de veces y con más riesgo del que parece. Este artículo explica por qué ocurre, presenta una herramienta que lo elimina y propone una guía para incorporarla hoy mismo a tu flujo de trabajo.

Un *worktree* es un directorio de trabajo adicional asociado al mismo repositorio. Permite tener varias ramas abiertas a la vez, cada una en su propia carpeta, sin recurrir a `git stash` ni a cambios de rama constantes. Lo uso a diario, y al revisar el costo real de ese hábito encontré tres problemas.

## Los tres problemas de vivir con worktrees

- **Proliferación de worktrees.** Cada rama termina con su propio directorio. Sin disciplina de limpieza, la cantidad crece sin control y cuesta saber cuáles siguen siendo útiles.
- **Duplicación de dependencias.** Cada worktree es un árbol de trabajo independiente, y también lo es su `node_modules` (o el equivalente de tu ecosistema). El espacio en disco y el tiempo de instalación se multiplican por el número de worktrees.
- **Secretos copiados a mano.** Los archivos `.env` no se versionan, así que un worktree nuevo nace sin ellos. La salida habitual es copiar y pegar desde otro worktree, con el riesgo de olvidar una variable, arrastrar un valor desactualizado o dejar un secreto donde no corresponde.

Los dos primeros son problemas de organización y almacenamiento, y se resuelven con hábitos y otras herramientas. El tercero tiene una solución directa, y [se aborda aquí](#la-herramienta-jondotsoyenvs).

## La herramienta: `@jondotsoy/envs`

> **Definición.** `@jondotsoy/envs` es una CLI que convierte un único archivo YAML (`.envs/values.yml`) en la fuente de verdad de las variables de entorno de todos los worktrees de un repositorio. Los `.env` de cada worktree pasan a ser una proyección de ese archivo.

Permite editar todos los valores en conjunto y distribuirlos a cada worktree, o recogerlos desde los `.env` que ya existen.

### Requisitos

- **Bun** y **git** instalados. La herramienta usa APIs propias de Bun (por ejemplo, su parser de YAML integrado), por lo que no funciona con Node. El paquete no declara una versión mínima de Bun: usa una versión reciente.
- Para `envs edit`, el ejecutable **`code`** (VS Code) debe estar en el `PATH`. El editor no es configurable por ahora, y sin `code` el comando falla con un error poco amigable.
- **Nada que instalar.** Se ejecuta con `bunx`, que descarga el paquete la primera vez. La instalación global es opcional y solo acorta el comando.
- **Versión del paquete.** Este artículo describe la 0.1.5. Es un proyecto joven y su interfaz puede cambiar.

### Cómo funciona

La herramienta se ejecuta desde cualquier worktree del repositorio. Internamente:

- **Ubicación.** Guarda el archivo en `.envs/values.yml`, dentro del repositorio principal, aunque el comando se ejecute desde otro worktree.
- **Identificación.** Obtiene los worktrees con `git worktree list` y los identifica por el nombre de su rama (por ejemplo, `main` o `feature/biz`). Si un worktree está en *detached HEAD*, usa el nombre de su carpeta.
- **Un archivo por repositorio.** No existe un concepto de proyecto aparte: hay un `.envs/` por cada repositorio.
- **Sin red.** La herramienta no realiza conexiones de red; solo invoca `git` y, en el caso de `edit`, `code`. (`bunx` sí necesita red para descargar el paquete la primera vez.)

### Comandos

- **`envs init`:** (opcional; `edit` lo ejecuta por ti) crea `.envs/`, un `.gitignore` interno con `*` (para que su contenido nunca se versione) y un `values.yml` vacío.
- **`envs pull`:** (requiere `values.yml`) lee el `.env` de cada worktree y consolida los valores en `values.yml`.
- **`envs push`:** (requiere `values.yml`) escribe en el `.env` de cada worktree los valores definidos en `values.yml`. Actualiza las variables existentes en su lugar, agrega las nuevas al final y conserva comentarios y variables ajenas.
- **`envs edit`:** es el comando principal. Si `values.yml` no existe, ejecuta `init`; luego ejecuta `pull`, abre `values.yml` en VS Code, espera a que lo cierres y ejecuta `push`. Si el editor termina con error, no se distribuye nada (aunque el `pull` previo ya habrá reescrito el YAML).
- **`envs lint`:** revisa problemas de seguridad (permisos del archivo, secretos versionados, valores débiles, URLs con credenciales) y termina con código de salida 1 si encuentra advertencias.

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

- **`defaults`:** valores que se escriben en **todos** los worktrees.
- **`envs.<VARIABLE>.<worktree>`:** valor específico de un worktree; tiene prioridad sobre `defaults`.

Esta organización responde a una necesidad concreta: ver de un vistazo en qué worktrees está configurada cada variable y con qué valor. No existe un comando `list` o `status`; el propio `values.yml` es esa vista consolidada. Además, `pull` y `push` informan qué ramas y variables se movieron:

```text
↓ pulling main, feature/biz - 3 variables
↻ LOG_LEVEL=info → main, feature/biz
```

## Guía de adopción rápida

No hay nada que instalar ni configurar. Está pensada para un repositorio con al menos dos worktrees; el conjunto toma pocos minutos.

### 1. Verificar los requisitos

```bash
bun --version
git --version
code --version
```

### 2. Ejecutar el comando principal

Desde cualquier worktree del repositorio:

```bash
bunx @jondotsoy/envs edit
```

La primera vez, `edit` hace todo el trabajo inicial:

- Crea `.envs/values.yml` y `.envs/.gitignore` (con `*`, para que git ignore la carpeta).
- Recoge el `.env` actual de cada worktree y los consolida en `values.yml`. Como `defaults` está vacío al inicio, las variables comunes aparecerán repetidas por rama; puedes moverlas a `defaults` y los siguientes `pull` no las duplicarán.
- Abre `values.yml` en VS Code y queda esperando hasta que lo cierres.
- Al cerrar el editor, escribe los valores en el `.env` de cada worktree.

### 3. Proteger lo que se generó

El archivo contiene secretos en texto plano y la herramienta no modifica permisos por sí misma:

```bash
chmod 600 .envs/values.yml
bunx @jondotsoy/envs lint
```

`init` solo protege `.envs/`, no los `.env` de cada worktree. Agrega esta línea al `.gitignore` del proyecto:

```gitignore
.env
```

Si algún `.env` ya estaba versionado, ignorarlo no basta: sigue en el historial. Quítalo del índice con `git rm --cached .env`, y considera rotar los secretos que hayan quedado expuestos.

Usa `lint` como verificación local, por ejemplo en un hook de pre-commit. No sirve en CI: `.envs/` está ignorado, por lo que un clon limpio no tiene `values.yml` y el comando termina con error.

### 4. Incorporarlo al flujo diario

Desde ahora, `bunx @jondotsoy/envs edit` es el único comando que necesitas. Edítalo siempre con `edit`; si modificas `values.yml` a mano, ejecuta `push` inmediatamente después, porque un `pull` previo borraría las entradas que aún no estén en los `.env`.

#### Al crear un worktree nuevo

```bash
git worktree add ../mi-proyecto-feature-x -b feature-x
bunx @jondotsoy/envs edit
```

El worktree nuevo solo recibe lo definido en `defaults`; no hereda nada de otras ramas. Para cada variable propia, agrega una línea con el nombre exacto de la rama (`feature-x: valor`) bajo la variable correspondiente y cierra el editor.

#### Al cambiar un secreto

Edítalo en `values.yml`: una sola vez si está en `defaults`, o en cada worktree si es específico. Ten presente que `lint` advierte cuando una variable sensible vive en `defaults`, porque se copia a todos los worktrees.

#### Al eliminar un worktree

Elimínalo primero con `git worktree remove` y después borra sus entradas del YAML con `edit`. `pull` no las elimina automáticamente, y si el worktree sigue existiendo, el siguiente `pull` las reimporta.

#### Opcional: instalar el comando corto

Si lo usas a diario, puedes instalarlo de forma global y reemplazar `bunx @jondotsoy/envs` por `envs`:

```bash
bun add -g @jondotsoy/envs
```

## Consideraciones de seguridad

La herramienta resuelve una comodidad, no el problema de gestionar secretos. Antes de adoptarla, ten presente lo siguiente:

- **Texto plano.** `values.yml` contiene todos tus secretos sin cifrar, y también los `.env` que escribe `push`. Aplica `chmod 600` a ambos tipos de archivo; la herramienta no modifica permisos por sí misma.
- **No compartas el archivo.** No lo envíes por chat ni por correo, y no lo uses para entregar credenciales a otras personas ni en producción.
- **Copias fuera de control.** El historial local de VS Code, los respaldos del sistema y los servicios de sincronización en la nube pueden conservar versiones anteriores de `values.yml`. Un valor rotado puede seguir existiendo en alguna de esas copias.
- **Secretos que reaparecen.** `pull` importa lo que haya en los `.env`. Si rotas un secreto y algún worktree conserva el valor antiguo, un `pull` posterior lo reintroduce.
- **Salida en consola.** `push` enmascara los valores de variables cuyo nombre sugiere un secreto (`TOKEN`, `PASSWORD`, `KEY`, entre otros), pero no el resto. Una `DATABASE_URL` con contraseña puede imprimirse en claro, así que evita compartir capturas o logs de la terminal.
- **Cadena de suministro.** `bunx @jondotsoy/envs` ejecuta siempre la última versión publicada, y esta herramienta tiene acceso a todos tus secretos. Si lo prefieres, fija la versión (`bunx @jondotsoy/envs@0.1.5 edit`) y revisa los cambios antes de actualizar.

## Limitaciones conocidas

- **Proyecto joven.** Es una versión 0.x, de publicación muy reciente.
- **`push` no elimina variables.** Quitar una variable del YAML no la borra del `.env`, y el siguiente `pull` la vuelve a importar. Para eliminarla, bórrala también del `.env`.
- **`pull` reescribe el YAML.** Se pierden los comentarios (incluidos los de línea), cambia el orden y los números dejan de llevar comillas.
- **La clave es el nombre de la rama.** Al renombrar una rama, el siguiente `pull` crea entradas con el nombre nuevo y deja duplicadas las del anterior; bórralas a mano.
- **Sin respaldo ni bloqueo.** Si dos procesos ejecutan `pull` y `push` a la vez, gana el último en escribir.
- **Solo `.env`.** No maneja `.env.local` ni otros nombres, ni valores multilínea.

## Conclusión y llamado a la acción

Los worktrees seguirán siendo parte de mi flujo diario, y la proliferación de ramas y la duplicación de dependencias requieren soluciones distintas. Pero copiar secretos a mano ya no tiene por qué existir. Un solo archivo y un solo comando reducen una tarea repetitiva y propensa a errores a unos segundos.

Elige hoy un repositorio con al menos dos worktrees y ejecuta, desde cualquiera de ellos:

```bash
bunx @jondotsoy/envs edit
```

Sin instalar nada, en menos de cinco minutos tendrás tus variables en un único lugar. Después, repite el proceso en el resto de tus proyectos y protege el resultado con los pasos 3 y 4 de la guía.

Si encuentras errores o tienes ideas para mejorarla, repórtalas en el repositorio del proyecto: <https://github.com/JonDotsoy/envs>.
