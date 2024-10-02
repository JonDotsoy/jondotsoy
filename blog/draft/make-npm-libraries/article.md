# Nunca mas `npm publish`

El stack perfecto para publicar tus libarías en [npm](https://www.npmjs.com) sin esfuerzo. Esta guía te quiero presentar una flujo de despliegue para pasar de código alojado en github a el [NPM](https://www.npmjs.com).

Comencemos primero con npm ([www.npmjs.com](https://www.npmjs.com)) este es un registry que usaremos para alojar todas nuestra librerías y aplicaciones escritas en javascript. y este sitio tiene una serie de reglas al momento de ser publicado algo de código.

- Puede ser publicado un paquete privado o publico. Si es privado tiene un costo que puedes revisar aquí https://www.npmjs.com/products
- Todo paquete publicado debe tener una version, description y nombre
- Toda actualización debe estar con una version superior a la previamente publicada

Es gracias a la para regla que nos impide publicar una version mas antigua es que debemos tener en consideración los generadores de versiones, entre los que podemos encontrar [sematic-release](https://github.com/semantic-release/semantic-release) y [release-please](https://github.com/googleapis/release-please). Esta herramienta nos dará un numero de version que podremos usar en nuestro proyecto mas adelante y 100% basado en el historial de commits.

## Crear nuestro token para publicar

Ya sea que necesitemos un paquete privado o publico necesitaremos un token de NPM. Para publicar paquetes debemos tener en cuenta que necesitamos un token de NPM para esto tenemos 2 caminos:

### Crear token desde la WEB

> Prefiera este método dentro de lo posible.

Vamos a ir al sitio https://www.npmjs.com/settings/jondotsoy/tokens 

### Crear token desde la terminal

Ejecuta el comando NPM `npm token create`

## Preparemos el código de nuestro paquete

hay que ser honestos, la estructura de tu código y no importa, para nuestro caso de ejemplo usaremos un simple hola mundo. y debo de aclarar que no existe ningun problema si quieres tener una estructura de código mas complejo y sofisticado.

Revisemos el siguiente repositorio https://github.com/JonDotsoy/sample-code aquí deje un ejemplo de una librería que tiene una función helloWorld 
