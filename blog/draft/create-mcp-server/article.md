---
title: Crea tu propio MCP Server
tags:
  - MCP
  - microservicios
  - Node.js
  - TypeScript
  - LLM
author: "@jondotsoy"
lang: es-CL
date: 2025-01-27
summary: "Aprende a crear tu propio servidor MCP (Model Context Protocol) usando TypeScript SDK para conectar aplicaciones de IA con datos y funcionalidades externas de forma estandarizada y segura."
---

# Crea tu propio MCP Server

<!-- badges -->

[![Comentarios](https://img.shields.io/github/issues-search/jondotsoy/jondotsoy?query=is:issue+label:question+article:create-mcp-server+&style=flat-square&label=Comentarios)](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:create-mcp-server:+&labels=question)

<!-- /badges -->

<!-- Introducción -->

En el mundo actual de la inteligencia artificial, la capacidad de conectar modelos de lenguaje con datos y funcionalidades externas se ha vuelto fundamental. El **Model Context Protocol (MCP)** representa una solución estandarizada que permite a las aplicaciones de IA acceder a contexto de manera segura y eficiente, separando la provisión de contexto de la interacción directa con el modelo de lenguaje.

Este artículo te guiará paso a paso en la creación de tu propio servidor MCP utilizando el SDK de TypeScript, permitiéndote exponer recursos, herramientas y prompts que enriquezcan las capacidades de cualquier aplicación compatible con MCP.

<!-- TOC -->

**Tabla de Contenidos**

1. [¿Qué es el Model Context Protocol (MCP)?](#qué-es-el-model-context-protocol-mcp)
2. [Configuración del proyecto MCP con TypeScript](#configuración-del-proyecto-mcp-con-typescript)
3. [Ejemplo práctico: Creando un servidor MCP funcional](#ejemplo-práctico-creando-un-servidor-mcp-funcional)
4. [La importancia de títulos y descripciones en herramientas MCP](#la-importancia-de-títulos-y-descripciones-en-herramientas-mcp)
5. [Conclusión y recursos adicionales](#conclusión-y-recursos-adicionales)

<!-- /TOC -->

## ¿Qué es el Model Context Protocol (MCP)?

El **Model Context Protocol (MCP)** es un protocolo estandarizado que permite a las aplicaciones de inteligencia artificial conectarse con fuentes de datos y funcionalidades externas de manera segura y estructurada. Desarrollado para superar las limitaciones de los modelos de lenguaje que tradicionalmente solo pueden acceder a información proporcionada manualmente o mediante integraciones específicas.

### Conceptos fundamentales de MCP

MCP funciona bajo una arquitectura cliente-servidor donde:

- **Servidor MCP**: Expone recursos, herramientas y prompts a través del protocolo
- **Cliente MCP**: Aplicaciones de IA que consumen estos servicios (como Claude, VS Code, ChatGPT)
- **Transporte**: Canal de comunicación entre cliente y servidor (stdio, HTTP, etc.)

### Componentes principales

1. **Resources (Recursos)**: Proporcionan acceso a datos de solo lectura, similares a endpoints GET en APIs REST. Permiten cargar información en el contexto del modelo de lenguaje.

2. **Tools (Herramientas)**: Funcionalidades que pueden ejecutar acciones o producir efectos secundarios, comparables a endpoints POST. Permiten al modelo realizar operaciones.

3. **Prompts (Plantillas)**: Patrones de interacción reutilizables que definen cómo el modelo debe procesar cierta información.

### Beneficios de utilizar MCP

- **Estandarización**: Un protocolo unificado para conectar cualquier aplicación de IA con servicios externos
- **Seguridad**: Control granular sobre qué información y funcionalidades se exponen
- **Escalabilidad**: Posibilidad de combinar múltiples servidores MCP en flujos de trabajo complejos
- **Interoperabilidad**: Compatibilidad entre diferentes aplicaciones de IA y proveedores

## Configuración del proyecto MCP con TypeScript

Para crear un servidor MCP robusto y mantenible, utilizaremos el SDK oficial de TypeScript que proporciona todas las herramientas necesarias para implementar el protocolo de manera eficiente.

### Prerrequisitos del sistema

Antes de comenzar, asegúrate de tener instalado:

- **Node.js v18.x o superior**: El SDK requiere características modernas de JavaScript
- **npm o yarn**: Para la gestión de dependencias
- **TypeScript**: Para tipado estático y mejor experiencia de desarrollo

### Instalación de dependencias

Crea un nuevo proyecto e instala las dependencias necesarias:

```bash
# Crear directorio del proyecto
mkdir my-mcp-server
cd my-mcp-server

# Inicializar proyecto Node.js
npm init -y

# Instalar SDK de MCP y dependencias
npm install @modelcontextprotocol/sdk zod

# Instalar dependencias de desarrollo
npm install -D typescript @types/node tsx
```

### Estructura del proyecto recomendada

Organiza tu proyecto con la siguiente estructura:

```
my-mcp-server/
├── src/
│   ├── server.ts          # Servidor principal
│   ├── tools/             # Definición de herramientas
│   ├── resources/         # Definición de recursos
│   └── types.ts           # Tipos personalizados
├── package.json
├── tsconfig.json
└── README.md
```

### Configuración de TypeScript

Crea un archivo `tsconfig.json` con la configuración apropiada:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Ejemplo práctico: Creando un servidor MCP funcional

A continuación desarrollaremos un servidor MCP completo que demuestra los conceptos principales a través de un ejemplo práctico: un servidor de gestión de tareas.

### Paso 1: Crear el servidor base

Comienza creando el archivo `src/server.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Crear instancia del servidor MCP
const server = new McpServer({
  name: "task-management-server",
  version: "1.0.0",
});

// Base de datos simulada en memoria
const tasks: Array<{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}> = [];

console.log("Servidor MCP de gestión de tareas iniciado");
```

### Paso 2: Implementar herramientas (Tools)

Las herramientas permiten al modelo de lenguaje ejecutar acciones. Añade las siguientes funcionalidades:

```typescript
// Herramienta para crear una nueva tarea
server.registerTool(
  "create-task",
  {
    title: "Crear Nueva Tarea",
    description: "Crea una nueva tarea en el sistema de gestión",
    inputSchema: {
      title: z.string().describe("Título de la tarea"),
      description: z.string().describe("Descripción detallada de la tarea"),
    },
  },
  async ({ title, description }) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    tasks.push(newTask);

    return {
      content: [
        {
          type: "text",
          text: `Tarea creada exitosamente: ${newTask.title} (ID: ${newTask.id})`,
        },
      ],
    };
  },
);

// Herramienta para marcar tarea como completada
server.registerTool(
  "complete-task",
  {
    title: "Completar Tarea",
    description: "Marca una tarea específica como completada",
    inputSchema: {
      taskId: z.string().describe("ID único de la tarea a completar"),
    },
  },
  async ({ taskId }) => {
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return {
        content: [
          {
            type: "text",
            text: `Error: No se encontró la tarea con ID ${taskId}`,
          },
        ],
        isError: true,
      };
    }

    task.completed = true;

    return {
      content: [
        {
          type: "text",
          text: `Tarea "${task.title}" marcada como completada`,
        },
      ],
    };
  },
);
```

### Paso 3: Implementar recursos (Resources)

Los recursos proporcionan acceso a datos. Añade recursos para consultar tareas:

```typescript
// Recurso para listar todas las tareas
server.registerResource(
  "all-tasks",
  "tasks://all",
  {
    title: "Lista de Todas las Tareas",
    description: "Recurso que contiene todas las tareas del sistema",
    mimeType: "application/json",
  },
  async () => ({
    contents: [
      {
        uri: "tasks://all",
        text: JSON.stringify(tasks, null, 2),
        mimeType: "application/json",
      },
    ],
  }),
);

// Recurso para tareas pendientes
server.registerResource(
  "pending-tasks",
  "tasks://pending",
  {
    title: "Tareas Pendientes",
    description: "Recurso que contiene solo las tareas no completadas",
    mimeType: "application/json",
  },
  async () => {
    const pendingTasks = tasks.filter((task) => !task.completed);

    return {
      contents: [
        {
          uri: "tasks://pending",
          text: JSON.stringify(pendingTasks, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  },
);
```

### Paso 4: Implementar prompts

Los prompts proporcionan plantillas reutilizables para interacciones específicas:

```typescript
// Prompt para generar resumen de tareas
server.registerPrompt(
  "task-summary",
  {
    title: "Resumen de Tareas",
    description: "Genera un resumen ejecutivo de las tareas actuales",
    arguments: [
      {
        name: "includeCompleted",
        description: "Incluir tareas completadas en el resumen",
        required: false,
      },
    ],
  },
  async (args) => {
    const includeCompleted = args?.includeCompleted === "true";
    const relevantTasks = includeCompleted
      ? tasks
      : tasks.filter((t) => !t.completed);

    const prompt = `
Por favor, analiza las siguientes tareas y proporciona un resumen ejecutivo:

${JSON.stringify(relevantTasks, null, 2)}

Incluye en tu análisis:
- Número total de tareas
- Estado de completitud
- Tareas más importantes o urgentes
- Recomendaciones para mejorar la productividad
    `;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt,
          },
        },
      ],
    };
  },
);
```

### Paso 5: Configurar el transporte y conexión

Finalmente, configura el transporte y establece la conexión:

```typescript
// Configurar transporte stdio
const transport = new StdioServerTransport();

// Conectar servidor al transporte
async function main() {
  try {
    await server.connect(transport);
    console.log("Servidor MCP conectado y listo para recibir peticiones");
  } catch (error) {
    console.error("Error al conectar el servidor:", error);
    process.exit(1);
  }
}

// Manejo de señales del sistema
process.on("SIGINT", async () => {
  console.log("\nCerrando servidor MCP...");
  await server.close();
  process.exit(0);
});

// Iniciar servidor
main().catch(console.error);
```

## La importancia de títulos y descripciones en herramientas MCP

Uno de los aspectos más críticos en el desarrollo de servidores MCP exitosos es la correcta definición de metadatos para las herramientas, recursos y prompts. Los agentes de IA utilizan esta información para determinar cuándo y cómo usar cada funcionalidad.

### Cómo los agentes interpretan metadatos

Los modelos de lenguaje analizan los siguientes elementos para tomar decisiones:

1. **Título (`title`)**: Proporciona una identificación clara y concisa de la funcionalidad
2. **Descripción (`description`)**: Explica detalladamente el propósito y comportamiento
3. **Esquema de entrada (`inputSchema`)**: Define qué parámetros requiere la herramienta
4. **Anotaciones adicionales**: Proporcionan contexto sobre limitaciones o consideraciones especiales

### Mejores prácticas para metadatos efectivos

#### Títulos descriptivos

```typescript
// ❌ Título poco descriptivo
server.registerTool("calc", { title: "Calc" }, ...)

// ✅ Título claro y específico
server.registerTool("calculate-bmi", {
  title: "Calculadora de Índice de Masa Corporal"
}, ...)
```

#### Descripciones detalladas

```typescript
server.registerTool(
  "send-email",
  {
    title: "Enviar Correo Electrónico",
    description:
      "Envía un correo electrónico a través del servidor SMTP configurado. Requiere destinatario válido y contenido. No puede enviar a direcciones bloqueadas o con archivos adjuntos mayores a 25MB.",
    inputSchema: {
      to: z.string().email().describe("Dirección de correo del destinatario"),
      subject: z.string().describe("Asunto del correo electrónico"),
      body: z.string().describe("Contenido del mensaje en texto plano o HTML"),
    },
  },
  async ({ to, subject, body }) => {
    // Implementación del envío
  },
);
```

#### Validación y documentación de parámetros

```typescript
server.registerTool(
  "query-database",
  {
    title: "Consultar Base de Datos",
    description:
      "Ejecuta consultas SQL SELECT en la base de datos de producción. Solo permite operaciones de lectura por seguridad.",
    inputSchema: {
      query: z
        .string()
        .regex(/^SELECT/i, "Solo se permiten consultas SELECT")
        .describe("Consulta SQL válida que comience con SELECT"),
      limit: z
        .number()
        .min(1)
        .max(1000)
        .default(100)
        .describe("Número máximo de registros a retornar (1-1000)"),
    },
  },
  async ({ query, limit }) => {
    // Implementación de la consulta
  },
);
```

### Impacto en la experiencia del usuario

Una documentación clara y precisa de las herramientas MCP resulta en:

- **Mayor precisión**: Los agentes seleccionan las herramientas correctas más frecuentemente
- **Mejor experiencia**: Los usuarios obtienen resultados más relevantes y útiles
- **Reducción de errores**: Menos intentos fallidos por uso incorrecto de herramientas
- **Facilidad de debug**: Problemas más fáciles de identificar y corregir

## Conclusión y recursos adicionales

El desarrollo de servidores MCP representa una oportunidad significativa para ampliar las capacidades de las aplicaciones de inteligencia artificial de manera estandarizada y segura. A través de este artículo, hemos explorado desde los conceptos fundamentales hasta la implementación práctica de un servidor completamente funcional.

### Puntos clave aprendidos

1. **MCP como estándar**: El protocolo proporciona una base sólida para la integración entre aplicaciones de IA y servicios externos
2. **Flexibilidad del SDK**: TypeScript SDK ofrece una API intuitiva para implementar recursos, herramientas y prompts
3. **Importancia de metadatos**: Una documentación clara es crucial para el éxito de las herramientas MCP
4. **Escalabilidad**: La arquitectura permite combinar múltiples servidores para crear flujos de trabajo complejos

### Próximos pasos recomendados

- Experimenta con diferentes tipos de transporte (HTTP, WebSocket)
- Implementa autenticación y autorización para entornos de producción
- Explora la integración con bases de datos reales y APIs externas
- Desarrolla pruebas automatizadas para tu servidor MCP

### Recursos adicionales

- [Documentación oficial de MCP](https://modelcontextprotocol.io)
- [Especificación completa del protocolo](https://spec.modelcontextprotocol.io)
- [Repositorio de servidores de ejemplo](https://github.com/modelcontextprotocol/servers)
- [TypeScript SDK en GitHub](https://github.com/modelcontextprotocol/typescript-sdk)

### Agradecimientos

Gracias por acompañarme en este recorrido por el Model Context Protocol. Si tienes preguntas, sugerencias o quieres compartir tu experiencia implementando servidores MCP, no dudes en [abrir una discusión en GitHub](https://github.com/JonDotsoy/jondotsoy/issues/new?title=article:create-mcp-server:+&labels=question) donde podremos continuar la conversación y ayudarnos mutuamente en el desarrollo de mejores soluciones.
