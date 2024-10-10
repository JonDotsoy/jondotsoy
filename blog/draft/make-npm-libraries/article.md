---
author: "@jondotsoy"
tags:
  - npm
  - library
---

# Nunca más `npm publish`

Este es el stack perfecto para publicar tus librerías js en [npm](https://www.npmjs.com) sin esfuerzo. Esta guía te quiero presentar un flujo de despliegue para pasar de código alojado en github a [NPM](https://www.npmjs.com).

## Qué es NPM

([www.npmjs.com](https://www.npmjs.com)) este es un registry que usan por defecto node.js y bun para descargar dependencias de los proyectos cuando usamos `npm add` o `bun add`. Este registry es gratuito y si queremos compartir código entre la comunidad o nuestros proyectos es buena idea alojar este código aquí. Si bien permite guardar cualquier tipo de archivo lo normal es guardar archivos escritos en javascript.

Además tengo que mencionar que este sitio tiene una serie de reglas al momento de publicar algún código.

- Cada paquete debe tener al menos un archivo `package.json` con una propiedad `title`, `version` y `description`. También es buena idea agregar una propiedad `license`
- Puede ser publicado un paquete privado o público. Sin embargo, de ser privado puede tener tiene un costo que puedes revisar aquí https://www.npmjs.com/products
- Toda actualización a un paquete ya publicado debe estar con una versión superior a la previamente publicada
- No se pueden reemplazar paquetes ya publicados a no ser que tú seas el dueño de ese paquete
- Todas las versiones deben seguir la convención semver

Es gracias a estas reglas que nos impide publicar una versión más antigua es que debemos tener en consideración los generadores de versiones, entre los que podemos encontrar [sematic-release](https://github.com/semantic-release/semantic-release) y [release-please](https://github.com/googleapis/release-please). Esta herramienta nos dará un número de versión que podremos usar en nuestro proyecto más adelante y 100% basado en el historial de commits.

## Paso 1: Crear nuestro token para publicar

El primer paso antes de publicar nuestro paquete será el obtener un token para publicar paquetes en npm y para esto podemos optar por 2 caminos:

### Opción 1: Crear token desde la WEB

> Prefiera este método dentro de lo posible.

Vamos a ir al sitio https://www.npmjs.com/settings/jondotsoy/tokens

### Opción 2: Crear token desde la terminal

Ejecuta el comando NPM `npm token create`

## Paso 2: Preparemos el código de nuestro paquete

Bien, ya tenemos el token y ahora debemos pensar en el código que vamos a publicar.

> Aquí te dejo unos consejos de seguridad:
>
> - Si requieres configuraciones puedes hacer que tu código lo lea desde las variables de ambientes (`process.env`)
> - No permitas cargar código desde tu librería sin un origen claro.

Debemos pensar bien en quién será el usuario librería o en otras palabras dónde será ejecutado el código, este puede ser un navegador, un entorno con NodeJS, BunJS o Deno. Si no tenemos claro el entorno podemos siempre asumir que será un entorno que ejecute soporte javascript [TC39](https://tc39.es/).

Lo más importante es tener siempre disponible el código JS antes de ser publicado.

## Paso 3: Empaquetar el código

Siempre es buena idea probar el código antes de publicar y para esto _npm_ nos ofrece el comando `npm pack` este nos ayudará a crear un paquete comprimido.

![Ejemplo empaquetar código](make-npm-libraries/assets/sample-npm-pack-on-console.png)

Cuando lo ejecutemos veremos por un lado el resultado del empaquetamiento y un archivo con extensión `.tgz`, este archivo nos servirá para probarlos más tarde.

El comando `npm pack` tiene un ciclo de vida que podemos aprovechar para compilar o preparar cualquier archivo si se necesita.

El comando `npm pack` ejecuta en orden los siguientes scripts `prepack`, `prepare` y `postpack`.

```json
{
    ...
    "scripts": {
        "prepack": "Este script es ejecutado previo al empaquetamiento",
        "prepare": "Este script se ejecuta después de prepack y antes de empaquetar",
        "postpack": "Este script se ejecuta después de empaquetamiento (puede ser útil para limpiar archivos)"
    }
    ...
}
```

## Puntos de entrada (main y exports)

Nuestro módulo debe tener un identificado un módulo de entrada, este es el script que cargará cuando sea importado por nuestra aplicación, para esto usaremos la propiedad `main` del `package.json`.

```json
{
    ...
    "main": "index.js",
    ...
}
```

```js
require("sample-pack"); // cargará el archivo `node_modules/sample-pack/index.js`
```

Revisa más a detalle esta propiedad en la documentación de npm https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main

### Múltiples puntos de entrada

Nuestro módulo puede tener muchos puntos de entradas, estos pueden ser definidos usando la propiedad `exports` del `package.json`, la idea de exportar varios scripts es útil si queremos exportar varias utilidades y a su vez disminuir el tamaño del proyecto del cliente final.

```json
{
    ...
    "exports": {
        ".": "./index.js",
        "./feature": "./lib/feature.js"
    }
    ...
}
```

Revisa más a detalle esta propiedad en la documentación de npm https://docs.npmjs.com/cli/v10/configuring-npm/package-json#exports

## Paso 4 (Opcional): Probar código

Yo realmente te recomiendo probar el paquete antes de seguir, es importante sobre todo para validar que los motores como nodejs puedan leer el paquete bien y si tienes definiciones de typescript también funcionen correctamente. Además que no es tan complejo, solo requerimos de un proyecto limpio o con el entorno que necesitamos.

Este script crea una carpeta con un proyecto en bun limpio:

```shell
cd $TMPDIR
mkdir my-project
cd my-project

bun init . -y
```

![salida en consola ejecutando el comando `ls --color`](image.png)

Ahora necesitamos identificar el archivo tgz del paso 3 e instalar con el comando  `bun add .../sample-pack-1.0.0.tgz` (En mi caso uso bun para la prueba pero se puede usar el mismo comando con npm `npm add .../sample-pack-1.0.0.tgz`).

![instalando paquete hello-world-0.1.0.tgz](image-3.png)

Ahora solo nos hace falta ejecutar nuestras pruebas. Este tipo de pruebas las podemos llamar de integración y tras ejecutar el script `index.ts` podemos ver en la salida el mensaje `hello world` que es ejecutado en el módulo y ver el mensaje `the variable is: ok` que ejecutamos en el script que importa el módulo.

![run script index.ts](image-4.png)

## Paso 5: Automatizar publicación

Ahora que tenemos lista nuestra librería ya podemos publicar en npm, pero para esto lo automatizaremos y para esto vamos a escribir un workflow que nos permita hacer 2 tareas:

- automatiza el versionamiento de la librería. Recordemos que no podemos publicar una librería en npm sin tener una declarada y debe ser superior a la publicada anteriormente
- automatizar la publicación de la librería a npm

El script a continuación es una plantilla que podemos editar a nuestro gusto y esta plantilla tiene dos tareas para crear la versión y publicar los cambios en npm cuando estos estén listos.

```yaml
name: Deploy Release

on:
  push:
    branches:
      - main

# Required by release-please to make a PR
permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release-please.outputs.release_created }}
    steps:
      - name: release
        id: release-please
        uses: googleapis/release-please-action@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

  # publish on npm
  delivery-npm:
    runs-on: ubuntu-latest
    if: needs.release-please.outputs.release_created
    needs:
      - release-please
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - uses: actions/setup-node@v4
        with:
          registry-url: "https://registry.npmjs.org"
      - run: bun install
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Expliquemos más a detalles cada paso de la plantilla:

### Secretos

Como puedes ver en este archivo se usa el secreto `NPM_TOKEN`, debemos configurar aquí el token que obtuvimos en el [paso 1](#paso-1-crear-nuestro-token-para-publicar) podemos crear este secreto ya sea desde la consola de github o con el comando `gh secret set NPM_TOKEN`, usemos el que nos sea más simple.

### Job `release-please`

La tarea `release-please` usa la herramienta [release-please](https://github.com/googleapis/release-please) para observar constantemente la rama main y según los commits proponer una nueva versión en un PR.

![alt text](image-1.png)

Durante esta etapa además podemos automatizar algunos procesos como generar algún otro archivo con la versión del package.json. por si nuestro proyecto lo requiere.

> ℹ️ Si presentan algún problema en esta etapa sería bueno configurar tu proyecto de manera local con el comando `release-please bootstrap`

En la plantilla también podemos ver la variable de salida `release_created` es importante en la siguiente etapa, ya que con ella podemos decidir si publicar o no nuestra variable.

### Job `delivery-npm`

Este job tiene como objetivo el publicar el código de nuestra librería a NPM pero antes valida si la variable `needs.release-please.outputs.release_created` es true. Esto es porque esperamos a que termine de actualizar la versión en el paso anterior de otro modo tendríamos un error constantemente por parte de NPM.

Unos errores comunes en este paso es tener un token obsoleto. Podemos repetir el [Paso 1](#paso-1-crear-nuestro-token-para-publicar) y [actualizar en github el secreto](#secretos).

## Conclusion

En este artículo, hemos explorado un flujo de trabajo completo para publicar tus librerías JavaScript en npm, desde la creación de un token hasta la automatización del proceso de publicación. Hemos cubierto aspectos cruciales como la preparación del código, el empaquetado, las pruebas y la integración con herramientas de automatización como release-please. Ahora estás equipado con las herramientas y conocimientos necesarios para compartir tus creaciones con la comunidad de desarrolladores y contribuir al ecosistema de npm. ¡Feliz desarrollo!

