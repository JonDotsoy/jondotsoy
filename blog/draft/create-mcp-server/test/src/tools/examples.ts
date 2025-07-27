import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function setupToolExamples(server: McpServer) {
  // Ejemplo de herramienta con validación de email
  server.registerTool(
    "send-email",
    {
      title:
        "Envía un correo electrónico a través del servidor SMTP configurado. Requiere destinatario válido y contenido. No puede enviar a direcciones bloqueadas o con archivos adjuntos mayores a 25MB.",
      inputSchema: {
        to: z.string().email().describe("Dirección de correo del destinatario"),
        subject: z.string().describe("Asunto del correo electrónico"),
        body: z
          .string()
          .describe("Contenido del mensaje en texto plano o HTML"),
      },
    },
    async ({ to, subject, body }) => {
      // Simulación del envío de email
      return {
        content: [
          {
            type: "text",
            text: `Email enviado exitosamente a ${to} con asunto: "${subject}"`,
          },
        ],
      };
    },
  );

  // Ejemplo de herramienta con validación de consulta SQL
  server.registerTool(
    "query-database",
    {
      title:
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
      // Simulación de consulta a base de datos
      const mockResults = [
        { id: 1, name: "Usuario 1", email: "user1@example.com" },
        { id: 2, name: "Usuario 2", email: "user2@example.com" },
      ];

      return {
        content: [
          {
            type: "text",
            text: `Consulta ejecutada: ${query}\nLímite: ${limit}\nResultados: ${JSON.stringify(mockResults, null, 2)}`,
          },
        ],
      };
    },
  );

  // Ejemplo de herramienta simple para calcular BMI
  server.registerTool(
    "calculate-bmi",
    {
      title: "Calculadora de Índice de Masa Corporal",
      inputSchema: {
        weight: z.number().positive().describe("Peso en kilogramos"),
        height: z.number().positive().describe("Altura en metros"),
      },
    },
    async ({ weight, height }) => {
      const bmi = weight / (height * height);
      let category = "";

      if (bmi < 18.5) category = "Bajo peso";
      else if (bmi < 25) category = "Peso normal";
      else if (bmi < 30) category = "Sobrepeso";
      else category = "Obesidad";

      return {
        content: [
          {
            type: "text",
            text: `IMC: ${bmi.toFixed(2)}\nCategoría: ${category}`,
          },
        ],
      };
    },
  );
}
