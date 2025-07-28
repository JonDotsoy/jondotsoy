```chatmode
---
description: 'Este modo está pensado para crear, editar y gestionar artículos del blog.'
tools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'findTestFiles', 'githubRepo', 'new', 'openSimpleBrowser', 'problems', 'runCommands', 'runNotebooks', 'runTasks', 'runTests', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---

# Modo de Gestión de Artículos del Blog

## Propósito

Este chatmode está diseñado específicamente para la creación, edición y gestión completa de artículos del blog personal. Su objetivo principal es:

- **Crear artículos** siguiendo la estructura de carpetas y nomenclatura establecida
- **Gestionar metadatos** automáticamente, incluyendo la obtención de autores colaboradores
- **Mantener consistencia** en el formato y estructura de todos los artículos
- **Facilitar el workflow** desde borrador hasta publicación
- **Automatizar tareas repetitivas** como la generación de metadatos y validación de estructura

Este modo asegura que todos los artículos cumplan con los estándares establecidos y simplifica el proceso de publicación de contenido técnico.

## Instrucciones para la Gestión de Artículos

## ¿Qué es un artículo?

Un artículo es un documento en formato Markdown que debe ser creado explícitamente en la carpeta `/blog/:estado/:slug/article.md`.

## Estructura de Carpetas

### Estados
- `draft`: Para artículos en borrador
- `posts`: Para artículos publicados

### Slug
El slug debe ser un texto que:
- Solo puede contener letras [a-z]
- Solo puede contener números [0-9]
- Solo puede contener guiones [-]

**Ejemplo de ruta válida:**
```

/blog/draft/mi-primer-articulo/article.md
/blog/posts/desarrollo-basado-versiones/article.md

````

## Estructura Base del Documento

Según `blog/README.md`, cada artículo debe tener la siguiente estructura de metadatos:

```markdown
---
title: Título del artículo
tags:
  - tag1
  - tag2
author: Jonathan Delgado <jonathan.delgado@example.com>
lang: es-CL
date: Mes día año
---

# Título del Artículo

Contenido del artículo...
````

### Metadatos Requeridos

- `title`: Título del artículo
- `tags`: Lista de etiquetas relacionadas
- `author`: Autor(es) del artículo - se debe llenar automáticamente usando el comando:
  ```bash
  git log --follow --pretty=format:"%an <%ae>" <article-path> | sort -u
  ```
  Donde `<article-path>` es la carpeta completa del artículo (ej: `blog/draft/mi-articulo/`).
  Este comando analiza todos los archivos dentro de la carpeta para incluir a todos los colaboradores,
  incluso editores que no hayan colaborado directamente en el `article.md`.
- `lang`: Idioma del artículo (ej: es-CL, en-US)
- `date`: Fecha en formato "Mes día año" (ej: "Apr 8 2024")

## Workflow de Gestión

1. **Crear artículo**: Crear en `/blog/draft/:slug/article.md`
2. **Editar**: Actualizar contenido, tags y descripción según sea necesario
3. **Obtener autores**: Ejecutar el comando git para obtener todos los contribuidores de la carpeta
4. **Publicar**: Mover de `draft` a `posts` cuando esté listo
5. **Actualizar metadatos**: Mantener tags y fecha actualizados durante el proceso de edición

## Obtención de Autores

Para obtener la lista completa de autores que han contribuido al artículo:

```bash
git log --follow --pretty=format:"%an <%ae>" <ruta-completa-carpeta-articulo> | sort -u
```

**Ejemplo:**

```bash
git log --follow --pretty=format:"%an <%ae>" blog/draft/mi-primer-articulo/ | sort -u
```

Este comando:

- Analiza todo el historial de cambios en la carpeta completa
- Incluye todos los archivos dentro de la carpeta (no solo `article.md`)
- Lista todos los colaboradores únicos con su nombre y email
- Permite incluir editores, revisores y otros contribuidores

## Reglas de Edición

- Solo actualizar tags y descripción si es realmente necesario
- Mantener la estructura de metadatos consistente
- Asegurar que el slug siga las reglas de nomenclatura
- Verificar que el contenido esté en el formato Markdown correcto
