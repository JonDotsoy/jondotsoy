---
title: Crear tu propio sistema de colas
tags:
  - arquitectura
  - patrones
  - sistemas distribuidos
author: "@jondotsoy"
lang: es-CL
date: 2025-04-28
summary: Aprende de forma sencilla qué es un sistema de colas, por qué es tan útil hoy en día y cómo puedes crear el tuyo propio, con ejemplos y explicaciones claras.
---

# Crear tu propio sistema de colas

<!-- Introducción -->

¿Te has preguntado cómo hacen las grandes aplicaciones para no colapsar cuando todos quieren hacer algo al mismo tiempo? La respuesta muchas veces está en las colas. Un sistema de colas es como una fila virtual donde los mensajes o tareas esperan su turno para ser atendidos. Así, los distintos componentes de una app pueden trabajar tranquilos, sin pisarse los talones. Las colas ayudan a que todo sea más escalable, tolerante a fallos y, sobre todo, mucho más ordenado. Hoy en día, si tienes una app con microservicios, eventos o simplemente muchos usuarios, seguro usas (o deberías usar) colas. Ejemplos famosos: Apache Kafka, RabbitMQ, Amazon SQS y Google Pub/Sub. Todos resuelven el mismo problema: que nada se pierda y que todo fluya.

En este artículo te voy a mostrar cómo puedes armar tu propio sistema de colas desde cero. Vamos a ver los conceptos clave, para qué sirven realmente y cómo puedes adaptarlo a lo que necesitas, sin complicaciones.

<!-- TOC -->

- [¿Qué es una cola y cómo funciona?](#qué-es-una-cola-y-cómo-funciona)
  - [Funcionalidades clave de una cola](#funcionalidades-clave-de-una-cola)
  - [Importancia de gestionar el tiempo de vida de los mensajes](#importancia-de-gestionar-el-tiempo-de-vida-de-los-mensajes)
  - [Control sobre los reintentos](#control-sobre-los-reintentos)
- [¿Qué es un consumidor?](#qué-es-un-consumidor)
- [Diseñando nuestro sistema](#diseñando-nuestro-sistema) - [Reclamación de mensajes: propiedades `claimed_at` y `claimed_by`](#reclamación-de-mensajes-propiedades-claimed_at-y-claimed_by) - [Proceso de reclamación de mensajes](#proceso-de-reclamación-de-mensajes) - [Asignación de mensajes](#asignación-de-mensajes) - [Beneficios del mecanismo de reclamación](#beneficios-del-mecanismo-de-reclamación)
<!-- /TOC -->

## ¿Qué es una cola y cómo funciona?

Imagina una fila en la panadería: el primero que llega es el primero que se atiende. Así funcionan las colas en tecnología (sí, también se llaman FIFO: First-In, First-Out). Una cola es básicamente un lugar donde dejas mensajes o tareas para que alguien más los recoja y los procese después. Sirve para que los sistemas no se saturen y para que cada cosa se haga en su momento, sin apuros ni pérdidas.

## Funcionalidades clave de una cola

- **Crear un registro o mensaje:** Los productores (o sea, los que generan trabajo) mandan mensajes a la cola. Cada mensaje es una tarea pendiente.
- **Consumir mensajes:** Los consumidores son los que revisan la cola y se encargan de procesar esos mensajes. Puede ser un servicio, un script, o cualquier cosa que lea y haga lo que hay que hacer.

```mermaid
classDiagram
    class Cola {
        +enviarMensaje(data: JSON): void
        +consumirMensaje(): JSON
    }
    class Productor {
        +producirMensaje(data: JSON): void
    }
    class Consumidor {
        +procesarMensaje(mensaje: JSON): void
    }

    Productor --> Cola : enviarMensaje
    Consumidor --> Cola : consumirMensaje
```

### Importancia de gestionar el tiempo de vida de los mensajes

El tiempo de vida de un mensaje es crucial para evitar que el sistema se sature con tareas obsoletas o irrelevantes. Al establecer una fecha de expiración (`expiration_at`), garantizamos que los mensajes que ya no son útiles sean descartados automáticamente, liberando recursos y permitiendo que el sistema se enfoque en las tareas que realmente importan. Esto es especialmente importante en sistemas donde los datos o las tareas tienen una validez limitada, como notificaciones o eventos temporales.

### Control sobre los reintentos

Tener un control claro sobre los reintentos es esencial para manejar errores de manera eficiente y evitar ciclos infinitos de procesamiento. La propiedad `retry_count` nos permite limitar el número de intentos para procesar un mensaje, lo que ayuda a identificar problemas persistentes y a tomar decisiones informadas, como enviar alertas o mover el mensaje a una cola de errores. Este enfoque asegura que el sistema sea resiliente y que los errores no afecten el rendimiento general.

## ¿Qué es un consumidor?

<!-- Aclaracion de lo que es y lo que se espera de un consumidor -->

Un consumidor es simplemente quien se encarga de sacar mensajes de la cola y hacer el trabajo. Puede ser un proceso, un microservicio, o incluso varios trabajando juntos para que todo avance más rápido. Los consumidores son clave para que nada se quede esperando demasiado y para que el sistema sea flexible y escalable.

## Diseñando nuestro sistema

<!-- Aqui se habla del modelo base, que puede ser usado en cualquier motor de db -->

Comencemos a diseñar nuestro sistema de colas, empezando por la estructura de la **base de datos**. Este diseño será flexible y permitirá el uso de diferentes tipos de bases de datos como MySQL, PostgreSQL, SQLite, MongoDB o incluso Redis. El objetivo principal es garantizar que dos consumidores no procesen el mismo mensaje simultáneamente, optimizar el rendimiento de la base de datos para evitar procesos lentos y asegurar la escalabilidad del sistema.

| Columna       | Tipo          | Descripción                                                                                                    |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| id            | string        | Identificador único del mensaje, puede ser un UUID, ULID, ObjectId o cualquier formato que garantice unicidad. |
| data          | JSON          | Contenido del mensaje o tarea.                                                                                 |
| expiration_at | string o null | Fecha y hora en que el mensaje expira y ya no debe ser procesado.                                              |
| claimed_at    | string o null | Fecha y hora en que el mensaje fue reclamado por un consumidor.                                                |
| claimed_by    | string o null | Identificador del consumidor que reclamó el mensaje.                                                           |
| retry_count   | number        | Número de intentos realizados para procesar el mensaje.                                                        |
| labels        | string[]      | Etiquetas opcionales para clasificar o filtrar los mensajes.                                                   |

El esquema es sencillo y, con solo leer los nombres de las propiedades, es posible deducir su propósito dentro del sistema.

## Reclamación de mensajes: propiedades `claimed_at` y `claimed_by`

<!-- Reglas que debe seguir un consumidor al reclamar un mensaje -->

Las propiedades `claimed_at` y `claimed_by` son esenciales para garantizar que cada mensaje en el sistema de colas sea procesado por un único consumidor a la vez. Un consumidor es un agente que monitorea la base de datos en busca de mensajes disponibles para procesar. Estas propiedades permiten coordinar y gestionar la asignación de mensajes de manera eficiente.

### Proceso de reclamación de mensajes

Cuando un consumidor desea procesar un mensaje, debe seguir un procedimiento que asegure que el mensaje no esté siendo procesado por otro consumidor. Para que un mensaje sea elegible, debe cumplir con las siguientes condiciones:

1. **Disponibilidad (`claimed_by` y `claimed_at`)**:

   - El mensaje debe tener la propiedad `claimed_by` como `null`.
   - La propiedad `claimed_at` debe ser `null` o indicar un tiempo mayor al período de tolerancia definido.
   - Este mecanismo permite identificar mensajes abandonados por consumidores anteriores y los vuelve disponibles para ser procesados nuevamente.

2. **Expiración (`expiration_at`)**:

   - Un mensaje es elegible solo si su propiedad `expiration_at` es `null` o si la fecha actual es anterior a su valor.
   - Los mensajes expirados deben ser descartados automáticamente para evitar procesar tareas obsoletas.

3. **Etiquetas (`labels`)**:

   - Si el consumidor requiere procesar mensajes con etiquetas específicas, solo se seleccionarán aquellos que coincidan con las etiquetas definidas.
   - Las etiquetas permiten clasificar y priorizar mensajes según las necesidades del sistema.

4. **Reintentos (`retry_count`)**:
   - Un mensaje no debe ser procesado si ha alcanzado el número máximo de reintentos permitido.
   - Los mensajes que excedan este límite pueden ser movidos a una cola de errores o descartados, dependiendo de la configuración del sistema.

### Asignación de mensajes

Una vez que un mensaje cumple con las condiciones anteriores, el consumidor debe realizar las siguientes acciones para reclamarlo:

1. **Asignar identificador (`claimed_by`)**:

   - El consumidor debe registrar su identificador único en la propiedad `claimed_by`.
   - Esto asegura que ningún otro consumidor procese el mismo mensaje simultáneamente.

2. **Registrar tiempo de reclamación (`claimed_at`)**:
   - El consumidor debe registrar la fecha y hora actuales en la propiedad `claimed_at`.
   - Esto permite rastrear cuándo fue reclamado el mensaje y gestionar el tiempo de tolerancia.

### Beneficios del mecanismo de reclamación

Este enfoque asegura que el sistema de colas sea eficiente, ordenado y tolerante a fallos. Al gestionar adecuadamente las propiedades `claimed_at` y `claimed_by`, se evita que los mensajes queden bloqueados indefinidamente, se optimiza el uso de recursos y se garantiza que las tareas sean procesadas de manera confiable y escalable.

```mermaid
sequenceDiagram
    participant Producer as Productor
    participant Queue as Cola
    participant Consumer as Consumidor

    Producer->>Queue: Enviar mensaje
    Queue->>Queue: Almacenar mensaje
    Consumer->>Queue: Consultar mensajes disponibles
    alt Mensaje disponible
        Queue->>Consumer: Entregar mensaje
        Consumer->>Queue: Actualizar `claimed_by` y `claimed_at`
        Consumer->>Consumer: Procesar mensaje
        alt Procesamiento exitoso
            Consumer->>Queue: Eliminar mensaje
        else Error en procesamiento
            Consumer->>Queue: Incrementar `retry_count`
        end
    else No hay mensajes disponibles
        Queue->>Consumer: Respuesta vacía
    end
```

<!-- Como Ahora con estos conceptos como se consume un mensaje   -->

##

---

[![Comentarios](https://img.shields.io/github/issues-search/jondotsoy/jondotsoy?query=is%3Aissue%20label%3Aquestion%20article%3Acustom-queue%20&style=for-the-badge&label=Comentarios)](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:custom-queue:+&labels=question)
