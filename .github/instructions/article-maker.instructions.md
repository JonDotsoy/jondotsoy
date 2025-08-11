---
applyTo: 'blog/draft/**.md'
---

# Instrucciones para creación de artículos

Los artículos deben seguir el siguiente formato:

## Estructura del archivo

El formato del archivo debe ser markdown. Debe tener siempre la metadata en formato YAML al inicio del archivo:

```markdown
---
title: Título del artículo
tags:
  - tag1
  - tag2
  - tag3
author: "@jondotsoy"
lang: es-CL
date: YYYY-MM-DD
summary: Breve resumen del contenido del artículo
---

# Título del artículo

<!-- badges -->

[![Comentarios](https://img.shields.io/github/issues-search/jondotsoy/jondotsoy?query=is:issue+label:question+article:ARTICLE_SLUG+&style=flat-square&label=Comentarios)](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:ARTICLE_SLUG:+&labels=question)

<!-- /badges -->

<!-- Introducción -->
Párrafo introductorio que explique el tema del artículo...

<!-- TOC -->

**Tabla de Contenidos**

1. [Sección 1](#sección-1)
2. [Sección 2](#sección-2)
...

<!-- /TOC -->

## Contenido del artículo...

## Conclusión y agradecimientos

Párrafo de cierre con agradecimientos y invitación a comentarios con enlace a GitHub issues.
```

## Campos obligatorios en metadata

- `title`: Título del artículo
- `tags`: Array de etiquetas relevantes al contenido
- `author`: Autor del artículo (usar "@jondotsoy")
- `lang`: Idioma del artículo (usar "es-CL")
- `date`: Fecha de publicación en formato YYYY-MM-DD
- `summary`: Resumen breve del contenido del artículo

## Estructura del contenido

1. **Badges**: Sección con badge de comentarios que enlace a GitHub issues
2. **Introducción**: Párrafo explicativo del tema
3. **Tabla de contenidos**: Lista numerada con enlaces internos
4. **Contenido principal**: Desarrollo del tema con secciones apropiadas
5. **Conclusión**: Cierre con agradecimientos e invitación a participar

## Elementos adicionales

- Usar diagramas Mermaid cuando sea apropiado
- Incluir ejemplos de código en bloques apropiados
- Usar enlaces a GitHub issues para comentarios
- Mantener un tono conversacional pero informativo
- Incluir ejemplos prácticos cuando sea posible

## Formato de slug del artículo

El slug del artículo para badges y enlaces debe derivarse del nombre de la carpeta donde se encuentra el archivo.
