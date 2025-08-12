---
mode: agent
description: Este prompt ayuda al usuario a definir la estructura de un artículo en formato Markdown, incluyendo título, slug, índice de contenidos y plantilla del artículo.
model: Claude Sonnet 4
tools: ['extensions', 'codebase', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'openSimpleBrowser', 'fetch', 'findTestFiles', 'searchResults', 'githubRepo', 'runCommands', 'editFiles', 'runNotebooks', 'search', 'new', 'runTasks']
---

Este prompt ayuda al usuario a definir la estructura del artículo, lo que significa que va a definir una ruta para escribir el artículo en formato Markdown y la estructura mínima que debe tener el artículo creado.

## Tareas a realizar

1. Describir la información proporcionada por el usuario y pensar detenidamente el contexto entregado
2. Se debe definir un título apropiado para el artículo
3. Se debe definir un slug o palabra clave para el artículo. Este slug contiene solamente letras minúsculas, números y guiones (-).
4. Se debe describir el índice de contenidos sugerido

## Especificaciones

- Para generar la ruta del artículo se debe seguir el siguiente formato: `blog/draft/<slug>/article.md`, donde `<slug>` es el slug definido en el paso 3.
- Se debe usar la siguiente plantilla para construir el archivo `article.md`:

Plantilla

```markdown
---
title: <title>
tags:
  - <tag1>
  - <tag2>
  - <tag3>
author: "@jondotsoy"
lang: <lang por defecto "es-CL">
date: <fecha actual, formato: YYYY-MM-DD>
summary: <Breve resumen del contenido del artículo>
---

# <Título del artículo>
```

## Restricciones

- Se debe crear como mínimo el documento `article.md`.
- Se pueden realizar descargas de contenido y respaldarlas dentro de la misma carpeta. Por ejemplo: `blog/draft/<slug>/assets/` y se debe hacer referencia a este contenido dentro del artículo.
- El formato Markdown usado debe seguir las siguientes reglas:
  - Los títulos H1, H2, H3 deben usar el símbolo `#` para H1, `##` para H2, `###` para H3, etc.


