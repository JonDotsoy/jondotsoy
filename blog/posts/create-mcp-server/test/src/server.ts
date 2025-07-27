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

// Herramienta para crear una nueva tarea
server.registerTool(
  "create-task",
  {
    title: "Crea una nueva tarea en el sistema de gestión",
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
    title: "Marca una tarea específica como completada",
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

// Prompt para generar resumen de tareas
server.registerPrompt(
  "task-summary",
  {
    title: "Genera un resumen ejecutivo de las tareas actuales",
    argsSchema: {
      includeCompleted: z
        .string()
        .optional()
        .describe("Incluir tareas completadas en el resumen (true/false)"),
    },
  },
  async ({ includeCompleted }) => {
    const shouldIncludeCompleted = includeCompleted === "true";
    const relevantTasks = shouldIncludeCompleted
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
