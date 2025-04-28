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

¿Te has preguntado cómo hacen las grandes aplicaciones para no colapsar cuando todos quieren hacer algo al mismo tiempo? La respuesta muchas veces está en las colas. Un sistema de colas es como una fila virtual donde los mensajes o tareas esperan su turno para ser atendidos. Así, los distintos componentes de una app pueden trabajar tranquilos, sin pisarse los talones. Las colas ayudan a que todo sea más escalable, tolerante a fallos y, sobre todo, mucho más ordenado. Hoy en día, si tienes una app con microservicios, eventos o simplemente muchos usuarios, seguro usas (o deberías usar) colas. Ejemplos famosos: Apache Kafka, RabbitMQ, Amazon SQS y Google Pub/Sub. Todos resuelven el mismo problema: que nada se pierda y que todo fluya.

En este artículo te voy a mostrar cómo puedes armar tu propio sistema de colas desde cero. Vamos a ver los conceptos clave, para qué sirven realmente y cómo puedes adaptarlo a lo que necesitas, sin complicaciones.

# ¿Qué es una cola y cómo funciona?

Imagina una fila en la panadería: el primero que llega es el primero que se atiende. Así funcionan las colas en tecnología (sí, también se llaman FIFO: First-In, First-Out). Una cola es básicamente un lugar donde dejas mensajes o tareas para que alguien más los recoja y los procese después. Sirve para que los sistemas no se saturen y para que cada cosa se haga en su momento, sin apuros ni pérdidas.

## Funcionalidades clave de una cola

- **Crear un registro o mensaje:** Los productores (o sea, los que generan trabajo) mandan mensajes a la cola. Cada mensaje es una tarea pendiente.
- **Consumir mensajes:** Los consumidores son los que revisan la cola y se encargan de procesar esos mensajes. Puede ser un servicio, un script, o cualquier cosa que lea y haga lo que hay que hacer.

## ¿Qué es un consumidor?

Un consumidor es simplemente quien se encarga de sacar mensajes de la cola y hacer el trabajo. Puede ser un proceso, un microservicio, o incluso varios trabajando juntos para que todo avance más rápido. Los consumidores son clave para que nada se quede esperando demasiado y para que el sistema sea flexible y escalable.

# Diseñando nuestro sistema

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

## Reclamadores de mensajes (propiedades claimed_at y claimed_by)

Estas propiedades son fundamentales en nuestro sistema de colas, ya que permiten identificar quién está consumiendo un mensaje en un momento dado. Un consumidor es un agente que monitorea constantemente la base de datos en busca de mensajes para procesar. Sin embargo, queremos garantizar que cada mensaje sea procesado por un único consumidor a la vez. Aquí es donde entran en juego las propiedades `claimed_by` y `claimed_at`.

Cuando un consumidor necesita procesar un nuevo mensaje, lo primero que hace es solicitar a la base de datos que asigne su identificador (`claimed_by`) a un mensaje disponible. Para que un mensaje sea elegible, debe cumplir con dos condiciones: su propiedad `claimed_by` debe ser `null` y su propiedad `claimed_at` debe ser mayor a un tiempo de tolerancia predefinido. 

¿Por qué es importante que `claimed_at` sea mayor a cierto tiempo? Esto nos permite identificar si un mensaje fue abandonado por un consumidor anterior. Si un mensaje no se procesa dentro del tiempo de tolerancia, se considera disponible nuevamente para ser reclamado por otro consumidor. Este mecanismo asegura que los mensajes no queden bloqueados indefinidamente y permite gestionar la tolerancia de tiempo de manera flexible dentro del sistema.
