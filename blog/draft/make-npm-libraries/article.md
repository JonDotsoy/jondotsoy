---
author: '@jondotsoy'
tags:
- npm
- library
---


# Nunca mas `npm publish`

Este es el stack perfecto para publicar tus libarías js en [npm](https://www.npmjs.com) sin esfuerzo. Esta guía te quiero presentar una flujo de despliegue para pasar de código alojado en github a [NPM](https://www.npmjs.com).

## Que es NPM

([www.npmjs.com](https://www.npmjs.com)) este es un registry que usan por defecto node.js y bun para descargar dependencias de los proyectos cuando usamo `npm add` o `bun add`. Este registry es gratuito y si queremos compartir codigo entre la comunidad o nuestros proyectos es buena idea alojar este codigo aqui. Si bien permite guardar cualquier tipo de archivo lo normal es guardar archivos escritos en javascript.

Ademoas tengo que mencionar que este sitio tiene una serie de reglas al momento de publicar algun código.

- Cada paquete debe tener a lo menos un archivo `package.json` con una propiedad `title`, `version` y `description`. Tambien es buena idea agregar una propiedad `license`
- Puede ser publicado un paquete privado o publico. Sin embargo de ser privado puede tener  tiene un costo que puedes revisar aquí https://www.npmjs.com/products
- Toda actualización a un paquete ya publicado debe estar con una version superior a la previamente publicada
- No se pueden remplazar paquetes ya publicados a no ser que tu seas el dueno de ese paquete
- Todas las verciones deben seguir la convencion semver

Es gracias a estas reglas que nos impide publicar una version mas antigua es que debemos tener en consideración los generadores de versiones, entre los que podemos encontrar [sematic-release](https://github.com/semantic-release/semantic-release) y [release-please](https://github.com/googleapis/release-please). Esta herramienta nos dará un numero de version que podremos usar en nuestro proyecto mas adelante y 100% basado en el historial de commits.

## Paso 1: Crear nuestro token para publicar

El primer antes de publicar nuestro paquete sera el obtener un token para publicar paquetes en npm y para esto podemos optar por 2 caminos:

### Opción 1: Crear token desde la WEB

> Prefiera este método dentro de lo posible.

Vamos a ir al sitio https://www.npmjs.com/settings/jondotsoy/tokens 

### Opción 2: Crear token desde la terminal

Ejecuta el comando NPM `npm token create`

## Paso 2: Preparemos el código de nuestro paquete

Bien, ya tenemos el token y ahora debemos pensar en el código que vamos a publicar.

> Aquí te dejo unos concejos de seguridad:
> 
> - Si requires configuraciones puedes hacer que tu código lo lea desde las variables de ambientes (`process.env`)
> - No permitas cargar código desde tu librería sin un origen claro.

Debemos pensar bien en quien sera el usuario librería o en otras palabras donde sera ejecutado el código, este puede ser un navegador, un entorno con NodeJS, BunJS o Deno. Si no tenemos claro el entorno podemos siempre asumir que sera un entorno que ejecute soporta javascript [TC39](https://tc39.es/).

Lo mas importante es tener siempre disponible el código JS antes de ser publicado.

## Paso 3: Empaquetar el código

Siempre es buena idea probar el código antes de publicar y para esto *npm* nos ofrece el comando `npm pack` este nos ayudara a crear un paquete comprimir.

![Ejemplo empaquetar código](make-npm-libraries/assets/sample-npm-pack-on-console.png)

Cuando lo ejecutemos veremos por un lado el resultado del empaquetamiento y un archivo con extension `.tgz`, este archivo nos servirá para probarlos mas tarde.

El command `npm pack` tiene un ciclo de vida que podemos aprovechar para compilar o preparar cualquier archivo si se necesita. 

El comando `npm pack` ejecuta en orden los siguientes scripts `prepack`, `prepare` y `postpack`.

```json
{
    ...
    "scripts": {
        "prepack": "Este script es ejecutado previo al empaquetamiento",
        "prepare": "Este script se ejecuta después de prepack y antes de empaqueta",
        "postpack": "Este script se ejecuta después de empaquetamiento (puede ser util para limpiar archivos)"
    }
    ...
}
```

## Puntos de entrada (main y exports)

Nuestro modulo debe tener un identificado un modulo de entrada, este es el script que cargara cuando sea importado por nuestra aplicación, para esto usaremos la propiedad `main` del `package.json`.

```json
{
    ...
    "main": "index.js",
    ...
}
```

```js
require("sample-pack") // cargara el archivo `node_modules/sample-pack/index.js`
```

Revisa mas a detalle esta propiedad en la documentación de npm https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main

### Multiples puntos de entrada

Nuestro modulo puede tener muchos punto de entradas, estos pueden ser definidos usando la propiedad `exports` del `package.json`, la idea de exportar varios scripts es util si queremos exportar varias utilidades y a su ves disminuir el tamaño del proyecto del cliente final.

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

Revisa mas a detalle esta propiedad en la documentación de npm https://docs.npmjs.com/cli/v10/configuring-npm/package-json#exports

## Paso 4 (Opcional): Probar código

Ya tenemos nuestro paquete, ahora podemos probarlo
