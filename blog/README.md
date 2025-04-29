# Basic structure document

The purpose of this document is to provide a clear and concise guide for organizing and structuring markdown files within this repository. By adhering to a standardized format and directory structure, contributors can ensure consistency, improve collaboration, and streamline the content creation process.

<!-- TOC -->

**Content**

1. [Document Organization](#document-organization)
2. [Format](#format)
   1. [Metadata](#metadata)
3. [Asset Management](#asset-management)
4. [Table of Contents Tags](#table-of-contents-tags)
   1. [Usage](#usage)
   2. [Example](#example)
   3. [Notes](#notes)

<!-- /TOC -->

## Document Organization

To maintain a clear and efficient workflow, markdown documents are organized into two main directories:

- `./draft`: This directory contains documents that are still in progress or under review. Each draft must be stored in its own dedicated folder following the format `./draft/<article name>/`. The article itself should be written in a file named `article.md` within this folder, serving as the root file for the article.

- `./posts`: Once a document is finalized and ready for publication, it is moved to this directory. Similar to drafts, each published article must have its own folder following the format `./posts/<article name>/`, with the main content written in an `article.md` file.

This structure ensures that each article is self-contained, making it easier to manage and distinguish between work-in-progress and published materials. For example:

```
./draft/example-article/
  ├── article.md
  ├── assets/
      ├── image1.png
      ├── diagram.svg

./posts/example-article/
  ├── article.md
  ├── assets/
      ├── image1.png
      ├── diagram.svg
```

By adhering to this organization, contributors can maintain a clean and consistent repository structure.

## Format

The format of the markdown document follows a structured approach, starting with a metadata section enclosed in triple dashes (`---`). This metadata provides essential information about the document, such as its title, tags, author, language, and date. Below the metadata, the main content of the document is written using standard markdown syntax for headings, paragraphs, and other elements.

### Metadata

The metadata section is written in YAML format, a human-readable data serialization standard that is easy to write and understand. This section serves as a structured way to define key attributes of the document, providing essential information that can be used for categorization, searchability, and automation within the repository. By using YAML, contributors can ensure that the metadata is both machine-readable and user-friendly, facilitating better organization and integration with tools or workflows.

Each property in the metadata section serves a specific purpose:

- `title`: The title of the document, providing a concise and descriptive name for the content.
- `summary`: A brief summary or description of the document's content, providing an overview of its purpose and key points.
- `tags`: A list of keywords or topics associated with the document, useful for categorization and searchability.
- `author`: The creator or contributor of the document, identified by their name or handle.
- `lang`: The language and regional format of the document, specified using a language code in IETF BCP 47 format (e.g., `es-CL` for Spanish - Chile).
- `date`: The publication or creation date of the document, formatted for clarity and reference. It is recommended to use the ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`) for consistency and to avoid ambiguity. This format also supports specifying the time, which can be useful for scheduling the publication of the article to go live at a precise moment.

**Example:**

```md
---
title: Magnific markdown
tags:
  - version
  - semver
author: "@jondotsoy"
lang: es-CL
date: 2024-04-08
---

# Desarrollo basado Planificación de Versiones

Normalmente cuando tenemos un proyecto siempre comenzamos con una idea clara el problema a resolver y por eso el primer enfoque suele ser escribir un script rápido para probar la solución y el tamaño del código casi siempre está correlacionado al tamaño del problema. Y si tienes algo más de experiencia surge un nuevo enfoque que llega con la planificación donde se encuentran las etapas; escribir la funcionalidad, planificar y desarrollar.
```

## Asset Management

For each article, all related assets (such as images, videos, or other media files) must be stored in a dedicated `./assets/<file>` directory within the folder of the respective article. This ensures that all resources are organized and easily accessible, maintaining a clean and consistent structure.

By keeping assets alongside their corresponding articles, contributors can avoid confusion and ensure that all necessary files are readily available for editing or publication. For example:

```
./posts/article-title/
  ├── article.md
  ├── assets/
      ├── image1.png
      ├── diagram.svg
```

This approach helps streamline the management of resources and improves the overall maintainability of the repository.

## Table of Contents Tags

The `<!-- TOC -->` and `<!-- /TOC -->` tags are used to define a section in a document that represents the Table of Contents (TOC). These tags help in distinguishing the TOC from the rest of the document and can be used by tools or scripts to identify and update the TOC dynamically.

### Usage

Place these tags around the content that serves as the Table of Contents. This ensures that the TOC is clearly marked and can be easily managed or updated.

- `<!-- TOC -->`: Marks the beginning of the Table of Contents section.
- `<!-- /TOC -->`: Marks the end of the Table of Contents section.

### Example

```markdown
<!-- TOC -->

1. Introduction
2. Key Concepts
3. Examples

<!-- /TOC -->
```

### Notes

- Ensure that the content between these tags is properly formatted and updated to reflect the structure of the document.
- These tags are particularly useful for automation tools that generate or maintain the Table of Contents.
- The TOC should provide a clear and concise overview of the document's structure to improve navigation and readability.

## Interactive Badges

The `<!-- BADGES -->` and `<!-- /BADGES -->` tags are used to define a section in a document that represents interactive badges. These badges provide quick access to relevant actions or information, such as viewing or adding comments for the article.

### Example

```markdown
<!-- BADGES -->

[![Comentarios](https://img.shields.io/github/issues-search/jondotsoy/jondotsoy?query=is:issue+label:question+article:custom-queue+&style=flat-square&label=Comentarios)](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:custom-queue:+&labels=question)

<!-- /BADGES -->
```

### Badge Templates

Below is a list of templates for badges that can be used in the articles. Replace `<article name>` with the specific name of the article as used in the `draft` or `posts` directories.

#### Comments Badge

```markdown
[![Comentarios](https://img.shields.io/github/issues-search/jondotsoy/jondotsoy?query=is:issue+label:question+article:<article name>+&style=flat-square&label=Comentarios)](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:<article name>:+&labels=question)
```

- Replace `<article name>` with the article's folder name.
- This badge links to the GitHub issues section for adding comments or questions related to the article.

### Notes

- Replace `custom-queue` in the badge URL with the specific article name to ensure the badge links to the correct comments section.
- These badges enhance interactivity and provide a convenient way for readers to engage with the content.
- Ensure the badge URLs are updated if the repository or article structure changes.
