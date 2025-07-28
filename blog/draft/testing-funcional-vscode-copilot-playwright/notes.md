# Notas de Investigación: Gherkin, BDD, MCP y Testing Funcional

## ¿Qué es Gherkin?

Gherkin es un **Lenguaje Específico de Dominio (DSL)** desarrollado para resolver un problema de comunicación entre los perfiles de negocio y los perfiles técnicos al trabajar bajo un enfoque BDD (Behavior Driven Development).

### Características principales:

- Utiliza **lenguaje natural** fácil de entender para personas no técnicas
- Sirve como puente entre equipos de negocio y equipos técnicos
- Permite describir el comportamiento esperado de una aplicación de manera clara
- Es la base para las pruebas automatizadas en BDD

## Sintaxis de Gherkin

### Palabras clave principales:

- **Feature**: Describe la funcionalidad general que se está probando
- **Scenario**: Define un caso de prueba específico para esa característica
- **Given**: Establece el contexto inicial o las precondiciones
- **When**: Describe la acción que realiza el usuario
- **Then**: Describe el resultado esperado
- **And/But**: Permiten agregar pasos adicionales al escenario

### Ejemplo práctico:

```gherkin
Feature: Inicio de sesión
Como usuario, quiero poder iniciar sesión en la aplicación
para poder acceder a mis datos personales.

Scenario: Usuario con credenciales válidas
Given el usuario ha abierto la aplicación
When el usuario introduce su nombre de usuario "usuario"
And el usuario introduce su contraseña "contraseña"
Then el usuario es redirigido a su página de inicio
And el usuario ve su nombre en la barra de navegación
```

## ¿Qué es MCP (Model Context Protocol)?

### Definición

El **Model Context Protocol (MCP)** es un estándar abierto que permite a los desarrolladores crear conexiones bidireccionales seguras entre sus fuentes de datos y herramientas basadas en IA. Proporciona una forma estandarizada para que los modelos de IA descubran e interactúen con herramientas externas, aplicaciones y fuentes de datos.

### Características principales:

- **Protocolo abierto** desarrollado por Anthropic
- Permite **integración seamless** entre aplicaciones de modelos de lenguaje
- Actúa como **puente** entre modelos de IA y sistemas externos
- Facilita el acceso a **bases de datos, APIs y tareas especializadas**
- Disponible en VS Code desde la versión 1.102

### Funcionalidades en VS Code:

1. **Tools**: Herramientas que los modelos pueden invocar para realizar acciones
2. **Resources**: Fuentes de datos que pueden usarse como contexto
3. **Prompts**: Indicaciones preconfiguradas para tareas comunes
4. **Elicitations**: Solicitudes de entrada adicional del usuario

### Configuración en VS Code:

- Archivo de configuración: `.vscode/mcp.json` (para workspace)
- Configuración global de usuario
- Autodescubrimiento desde otras herramientas (como Claude Desktop)
- Soporte para Dev Containers

### Ejemplo de configuración MCP:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "api-key",
      "description": "API Key",
      "password": true
    }
  ],
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    },
    "github": {
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

## Costos de GitHub Copilot

### Planes Individuales:

#### 1. GitHub Copilot Individual

- **Precio**: $10 USD/mes o $100 USD/año
- **Características**:
  - Completaciones ilimitadas de código
  - Interacciones de chat ilimitadas con modelos incluidos (GPT-4.1 y GPT-4o)
  - Uso personal

#### 2. GitHub Copilot Pro

- **Precio**: $10 USD/mes o $100 USD/año
- **Características**:
  - Todo lo incluido en Individual
  - Acceso a modelos premium
  - **Hasta 1,500 premium requests por mes**
  - Acceso prioritario a capacidades avanzadas de IA

#### 3. GitHub Copilot Pro+

- **Precio**: $39 USD/mes o $390 USD/año
- **Características**:
  - Todas las funciones de Copilot Pro
  - **Hasta 1,500 premium requests por mes expandidos**
  - Acceso prioritario a capacidades avanzadas de IA

### Planes Empresariales:

#### 1. GitHub Copilot Business

- **Precio**: $19 USD por usuario/mes
- **Características**: Funciones similares a planes individuales pero gestionado a nivel organizacional

#### 2. GitHub Copilot Enterprise

- **Precio**: Variable, requiere consulta directa con GitHub
- **Características**: Para organizaciones grandes con funciones avanzadas y gestión centralizada

### Costos de Premium Requests:

- **Costo adicional**: $0.04 USD por request premium
- Los premium requests se consumen cuando se usan:
  - Modelos premium en Copilot Chat
  - Modo agente
  - Revisión de código con IA
  - Extensiones de Copilot
- **Multiplicadores de modelo**: Algunos modelos avanzados pueden contar como múltiples requests (hasta 50x)

### Plan Gratuito:

- **Disponible**: Hasta 2,000 completaciones y 50 chat requests por mes gratis

## Relación con BDD (Behavior Driven Development)

### ¿Qué es BDD?

- Evolución del TDD (Test Driven Development) propuesta por Dan North
- En lugar de tests unitarios, se enfocan en **pruebas que validan requisitos funcionales de negocio**
- Los tests se escriben **antes** que el código (como en TDD)
- Permite cruzar el puente entre perfiles de negocio y técnicos

### Diferencias con TDD:

- **TDD**: Tests unitarios → Código
- **BDD**: Especificaciones de comportamiento (en Gherkin) → Tests funcionales → Código

## Herramientas y Frameworks

### Cucumber

- Framework de testing más popular para BDD
- Soporta especificaciones escritas en Gherkin
- Genera casos de prueba automáticamente a partir de especificaciones Gherkin
- Acelera el desarrollo de software
- Patrón "Given-When-Then"

## Aplicación en Testing Funcional

### Ventajas:

1. **Comunicación clara** entre equipos
2. **Documentación viva** que se actualiza con el código
3. **Casos de prueba legibles** por personas no técnicas
4. **Automatización** de pruebas basada en requisitos de negocio
5. **Validación de comportamiento** en lugar de solo funcionalidad

### Casos de uso típicos:

- Validación de flujos de usuario en aplicaciones web
- Pruebas de integración que involucran múltiples componentes
- Verificación de reglas de negocio complejas
- Testing de APIs desde la perspectiva del usuario final

## Integración con VS Code y Playwright

### Posibilidades:

1. **VS Code Extensions**: Soporte para sintaxis Gherkin y autocompletado
2. **Playwright + Gherkin**: Automatización de navegadores usando especificaciones legibles
3. **GitHub Copilot**: Generación asistida de casos de prueba en Gherkin
4. **Documentación como código**: Casos de uso almacenados junto al código fuente
5. **MCP de Playwright**: Integración directa con Copilot para ejecución de pruebas

### Workflow propuesto con MCP:

1. Definir historias de usuario en formato Gherkin en `/docs/user-case/`
2. Configurar MCP de Playwright en VS Code (`.vscode/mcp.json`)
3. Usar VS Code con extensiones para escribir y validar sintaxis
4. Abrir chat de Copilot en modo agente
5. Ejecutar comando: "ejecuta el caso de uso `<file>`"
6. Copilot utiliza MCP de Playwright para automatizar la navegación
7. Generar evidencias y reportes automáticamente

### Configuración práctica del MCP de Playwright:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}
```

### Comandos de ejemplo para Copilot:

- "Ejecuta el caso de uso docs/user-case/login.md"
- "Prueba el formulario de registro siguiendo el escenario en user-case/registro.md"
- "Valida la navegación principal según el caso de uso navigation.md"

## Estructura para el Artículo Actualizada

### Conceptos clave a desarrollar:

1. **Introducción al testing funcional** automatizado
2. **¿Qué es Gherkin?** - Fundamentos y filosofía
3. **¿Qué es MCP?** - Model Context Protocol y su importancia
4. **BDD vs TDD** - ¿Por qué Behavior Driven Development?
5. **Configuración del entorno** - VS Code + Copilot + MCP de Playwright
6. **Instalación y configuración de MCP** - Paso a paso
7. **Estructura de proyecto** - Organización de archivos de prueba
8. **Casos de uso prácticos** - Historias de usuario reales en `/docs/user-case/`
9. **Automatización con Copilot y MCP** - Comandos directos en chat
10. **Ejemplos prácticos** - Navegación, formularios, validaciones
11. **Costos y consideraciones** - Planes de Copilot y premium requests
12. **Mejores prácticas** - Mantenibilidad y escalabilidad
13. **Integración con CI/CD** - Automatización completa del testing

## Instrucciones paso a paso para el usuario

### 1. Configuración inicial

1. Instalar VS Code (versión 1.102+)
2. Instalar extensión de GitHub Copilot
3. Configurar plan de Copilot (considerar costos de premium requests)
4. Instalar extensiones de Gherkin/Cucumber para sintaxis highlighting

### 2. Configuración del MCP de Playwright

1. Crear archivo `.vscode/mcp.json` en el workspace
2. Configurar servidor de Playwright MCP
3. Instalar Playwright: `npx playwright install`
4. Verificar que MCP está funcionando en la vista de extensiones

### 3. Estructura del proyecto

```
proyecto/
├── .vscode/mcp.json
├── docs/user-case/
│   ├── login.md
│   ├── registro.md
│   └── navegacion.md
├── src/
└── package.json
```

### 4. Crear casos de uso

1. Definir historias de usuario en formato Gherkin
2. Guardar en `/docs/user-case/nombre-caso.md`
3. Incluir pasos detallados de navegación
4. Especificar evidencias esperadas

### 5. Ejecutar pruebas con Copilot

1. Abrir chat de Copilot (Ctrl+Alt+I)
2. Seleccionar modo "Agente"
3. Activar herramientas de Playwright en el selector de tools
4. Ejecutar comando: "ejecuta el caso de uso docs/user-case/login.md"
5. Revisar y confirmar acciones del MCP
6. Obtener evidencias automáticas

## Referencias consultadas

- Documentación oficial de VS Code sobre MCP Servers
- GitHub Docs: Plans for GitHub Copilot y costos
- Google AI Overview sobre Gherkin y BDD
- Profile Software Services: "Qué es Gherkin: cómo usarlo y cuáles son sus elementos"
- Videos educativos sobre casos de prueba Gherkin
- Documentación de BrowserStack, SmartBear, TestQuality
- Documentación oficial del Model Context Protocol
- Reddit: Discusiones sobre costos de premium requests en Copilot

## Relación con BDD (Behavior Driven Development)

### ¿Qué es BDD?

- Evolución del TDD (Test Driven Development) propuesta por Dan North
- En lugar de tests unitarios, se enfocan en **pruebas que validan requisitos funcionales de negocio**
- Los tests se escriben **antes** que el código (como en TDD)
- Permite cruzar el puente entre perfiles de negocio y técnicos

### Diferencias con TDD:

- **TDD**: Tests unitarios → Código
- **BDD**: Especificaciones de comportamiento (en Gherkin) → Tests funcionales → Código

## Herramientas y Frameworks

### Cucumber

- Framework de testing más popular para BDD
- Soporta especificaciones escritas en Gherkin
- Genera casos de prueba automáticamente a partir de especificaciones Gherkin
- Acelera el desarrollo de software
- Patrón "Given-When-Then"

## Aplicación en Testing Funcional

### Ventajas:

1. **Comunicación clara** entre equipos
2. **Documentación viva** que se actualiza con el código
3. **Casos de prueba legibles** por personas no técnicas
4. **Automatización** de pruebas basada en requisitos de negocio
5. **Validación de comportamiento** en lugar de solo funcionalidad

### Casos de uso típicos:

- Validación de flujos de usuario en aplicaciones web
- Pruebas de integración que involucran múltiples componentes
- Verificación de reglas de negocio complejas
- Testing de APIs desde la perspectiva del usuario final

## Integración con VS Code y Playwright

### Posibilidades:

1. **VS Code Extensions**: Soporte para sintaxis Gherkin y autocompletado
2. **Playwright + Gherkin**: Automatización de navegadores usando especificaciones legibles
3. **GitHub Copilot**: Generación asistida de casos de prueba en Gherkin
4. **Documentación como código**: Casos de uso almacenados junto al código fuente

### Workflow propuesto:

1. Definir historias de usuario en formato Gherkin
2. Usar VS Code con extensiones para escribir y validar sintaxis
3. Utilizar Copilot para generar automáticamente pasos de testing
4. Implementar automatización con Playwright basada en los escenarios Gherkin
5. Mantener evidencias y reportes de las pruebas ejecutadas

## Estructura para el Artículo

### Conceptos clave a desarrollar:

1. **Introducción al testing funcional** automatizado
2. **¿Qué es Gherkin?** - Fundamentos y filosofía
3. **BDD vs TDD** - ¿Por qué Behavior Driven Development?
4. **Casos de uso prácticos** - Historias de usuario reales
5. **Setup del entorno** - VS Code + Copilot + Playwright MCP
6. **Estructura de proyecto** - Organización de archivos de prueba
7. **Automatización con Copilot** - Generación asistida de tests
8. **Ejemplos prácticos** - Navegación, formularios, validaciones
9. **Mejores prácticas** - Mantenibilidad y escalabilidad
10. **Integración con CI/CD** - Automatización completa del testing

## Referencias consultadas

- Google AI Overview sobre Gherkin y BDD
- Profile Software Services: "Qué es Gherkin: cómo usarlo y cuáles son sus elementos"
- Videos educativos sobre casos de prueba Gherkin
- Documentación de BrowserStack, SmartBear, TestQuality
