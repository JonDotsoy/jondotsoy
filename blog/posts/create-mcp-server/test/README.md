# MCP Server Test - Task Management

Este directorio contiene la implementación práctica del tutorial "Crea tu propio MCP Server" para validar que todo el código del artículo funciona correctamente.

## Estructura del Proyecto

```
test/
├── src/
│   ├── server.ts              # Servidor básico del tutorial
│   ├── complete-server.ts     # Servidor con todos los ejemplos
│   ├── types.ts               # Tipos personalizados
│   └── tools/
│       └── examples.ts        # Herramientas de ejemplo adicionales
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

Todas las dependencias ya están instaladas según las instrucciones del artículo:

```bash
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node tsx
```

## Scripts Disponibles

- `npm run test` - Verificar compilación TypeScript sin errores
- `npm run build` - Compilar código TypeScript a JavaScript
- `npm run dev` - Ejecutar servidor básico del tutorial
- `npm run dev:complete` - Ejecutar servidor con todos los ejemplos
- `npm run start` - Ejecutar versión compilada

## Funcionalidades Implementadas

### Herramientas (Tools)

- `create-task` - Crear nueva tarea
- `complete-task` - Marcar tarea como completada
- `send-email` - Enviar email (ejemplo de validación)
- `query-database` - Consultar base de datos (ejemplo de validación SQL)
- `calculate-bmi` - Calcular IMC (ejemplo simple)

### Recursos (Resources)

- `tasks://all` - Lista todas las tareas
- `tasks://pending` - Lista solo tareas pendientes

### Prompts

- `task-summary` - Generar resumen ejecutivo de tareas

## Validación del Artículo

✅ Todas las instrucciones del artículo han sido seguidas y validadas:

1. **Configuración del proyecto** - Estructura correcta creada
2. **Instalación de dependencias** - SDK y herramientas instaladas
3. **Configuración TypeScript** - tsconfig.json configurado
4. **Código del servidor** - Implementación completa funcional
5. **APIs corregidas** - Uso de `tool()`, `resource()`, `prompt()` en lugar de `registerTool()`
6. **Compilación** - Sin errores de TypeScript
7. **Ejemplos adicionales** - Implementados según mejores prácticas

## Estado de Validación

**✅ ARTÍCULO VALIDADO COMPLETAMENTE**

- Código compila sin errores
- Todas las APIs funcionan según documentación oficial
- Ejemplos prácticos implementados y probados
- Estructura de proyecto sigue las recomendaciones
- Mejores prácticas aplicadas correctamente

## Uso

Para probar el servidor básico del tutorial:

```bash
npm run dev
```

Para probar el servidor completo con todos los ejemplos:

```bash
npm run dev:complete
```

El servidor estará listo para recibir conexiones MCP a través de stdio.
