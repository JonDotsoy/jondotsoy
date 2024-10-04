---
lang: es-cl
title: La mejor estrategia para desarrollar con Kubernetes
# date: 2024-10-02T17:26:57.232Z
author: '@jondotsoy'
tags: 
- k8s
---

# La mejor estrategia para desarrollar con Kubernetes

Como desarrolladores siempre nos tenemos que encontrar con la tarea de desplegar nuestras aplicaciones en algún entorno, ya sea dentro de una MVs, Clusters orquestados con Kubernetes, servicios serverless entre otros.

Bueno spoiler pero hoy hablaremos de como trabajar con Kubernetes, este es una herramienta orquestadora, quiere decir que se encargara de disponer y escalar nuestra aplicación, e lo que reconoce como Nodos que para fines prácticos pueden ser maquinas virtuales o servidores, lo importante es que esta herramienta nos permite desplegar infraestructura como código o en otras palabras describir como se despliega nuestra aplicación, como debe escalar, como debe exponerse y como debe ejecutarse.

## El infierno de Kubernetes

Por hoy Kubernetes es mi herramienta favorita si se trata de desplegar una aplicación en internet, ya que siempre me permite desplegar mi aplicación de una manera muy rápida y concisa (cuando se sabe como) y por hoy uso GKE de GCP para desplegar todas mis aplicaciones, y para exponer a internet lo hago mediante Cloudflare. Esto se vería algo asi.

![](image.png)

Donde mi código se guarda en github, lo despliego en un pod de Kubernetes y lo expongo mediante Cloudflare a internet. 

y entonces ¿por que hablo del *infierno de Kubernetes 😈*? por una simple razón, como desarrollador me gusta que mi código funciona siempre tan solo cambiando las variables de ambientes. Pero cuando se trata de trabajar con formulas de Kubernetes parece que cada formula funciona solo para una ocasión. Incluso he visto algunos casos donde no se puede rehusar nisiquiera el deployment por que tiene configuraciones finas del cluster en donde esta alojado. Esto lo hace una pesadilla sobre todo cuando queremos rehusar, migrar o simplemente mantener dar mantenimiento al cluster. 

¿Es problema de Kubernetes estos problemas? No, Kubernetes cumple con su objetivo y es orquestar cargas de trabajo, pero como puede estar en mucha infraestructuras distintas no podemos evitar pensar en ellas cuando estamos creando nuestras formulas. En este articulo en especifico vamos a entender como usar Kubernetes desde local hasta producción.

## Volvamos a ejecutar todo en Local

![alt text](image-2.png)

Es común escuchar el ticket ya lo termine y cuando pasa al ambiente de staging o productivo todo falla. Si esto te ha pasado es posible que por hoy estés conforme ya cuando todo esta en el ambiente de pre-productivo, pero aun asi todo puede ir mal, ya sea por un secreto, por una configuración de recursos o simplemente por que no esta bien montado el servicio. Lo normal es que en el ambiente de staging comencemos a hacer todos los cambios para ver que nuestro servicio se monte bien y esto nos lleve a varias commits de infra cuando solo deberiamos tener 1. esto es ineficiente por todo el tiempo que nos lleva probar nuestras formulas en el ambiente preproductivo y eso si es que no hay pequeñas diferencias con el ambiente productivo.

Desde hoy te invito a cargar el 100% de tus formulas en local, no importa que tanto artefacto necesites desplegar, si necesitas una computadora mas poderosa para soporta esa base de datos enterprise premium que la licencia cuesta 10.000.- dolares puedes o exigir una computadora mas grande o simplemente darte cuenta que tu infra alomejor necesita de una base de datos del tipo SaaS.

Toda las formulas de tu aplicación a lo menos deben poder cargarse en local con [minikube](https://minikube.sigs.k8s.io/docs/start/?arch=/macos/arm64/stable/binary+download) o [talos](https://www.talos.dev/).

Otro concejo que puedo dejar en este articulo es que ejecutes tantos nodos como sea necesario para tu aplicación, te puede dar señales de que tu aplicación tenga problemas cuando se escale. Otro error puede ser el monitoreo o el acceso a otros servicios, ya sea por que se encuentra en otro namespace o simplemente por que no especificaste el namespace en tus artefactos.
