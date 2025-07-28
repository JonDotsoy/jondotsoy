# Notas de Investigación: Gherkin, BDD, MCP y Testing Funcional

_Última actualización: Enero 8, 2025_

## ¿Qué es Gherkin?

**Fuente**: ACCELQ - "Gherkin Syntax: A Complete Guide"  
**Fecha de publicación**: 4 de abril de 2025  
**URL**: https://www.accelq.com/blog/gherkin-syntax/

Gherkin es un **Lenguaje Específico de Dominio (DSL)** desarrollado para resolver un problema de comunicación entre los perfiles de negocio y los perfiles técnicos al trabajar bajo un enfoque BDD (Behavior Driven Development).

### Características principales:

- Utiliza **lenguaje natural** fácil de entender para personas no técnicas
- Sirve como puente entre equipos de negocio y equipos técnicos
- Permite describir el comportamiento esperado de una aplicación de manera clara
- Es la base para las pruebas automatizadas en BDD
- Se integra nativamente con frameworks como Cucumber, SpecFlow y Behave

### Sintaxis de Gherkin

#### Palabras clave principales:

- **Feature**: Describe la funcionalidad general que se está probando
- **Scenario**: Define un caso de prueba específico para esa característica
- **Given**: Establece el contexto inicial o las precondiciones
- **When**: Describe la acción que realiza el usuario
- **Then**: Describe el resultado esperado
- **And/But**: Permiten agregar pasos adicionales al escenario
- **Background**: Define pasos comunes que se ejecutan antes de cada escenario
- **Scenario Outline**: Permite crear escenarios con datos parametrizados
- **Examples**: Proporciona conjuntos de datos para Scenario Outline

#### Ejemplo práctico:

```gherkin
Feature: Inicio de sesión
Como usuario, quiero poder iniciar sesión en la aplicación
para poder acceder a mis datos personales.

Background:
Given el usuario ha navegado a la página de inicio de sesión

Scenario: Usuario con credenciales válidas
Given el usuario ve el formulario de inicio de sesión
When el usuario introduce su nombre de usuario "usuario_valido"
And el usuario introduce su contraseña "contraseña_segura"
And el usuario hace clic en el botón "Iniciar Sesión"
Then el usuario es redirigido a su página de inicio
And el usuario ve su nombre "Usuario Válido" en la barra de navegación
And el sistema registra el acceso exitoso

Scenario Outline: Validación de credenciales incorrectas
Given el usuario ve el formulario de inicio de sesión
When el usuario introduce su nombre de usuario "<usuario>"
And el usuario introduce su contraseña "<contraseña>"
And el usuario hace clic en el botón "Iniciar Sesión"
Then el sistema muestra el mensaje "<mensaje_error>"
And el usuario permanece en la página de inicio de sesión

Examples:
| usuario      | contraseña        | mensaje_error                    |
| usuario_malo | contraseña_mala   | Credenciales incorrectas         |
| ""           | contraseña_válida | El usuario es requerido          |
| usuario_válido | ""              | La contraseña es requerida       |
```

## ¿Qué es MCP (Model Context Protocol)?

**Fuente**: Visual Studio Code Blog - "Full Model Context Protocol (MCP) Specification Support"  
**Fecha de publicación**: 12 de junio de 2025  
**URL**: https://code.visualstudio.com/blogs/2025/06/12/full-mcp-spec-support

### Definición

El **Model Context Protocol (MCP)** es un estándar abierto que permite a los desarrolladores crear conexiones bidireccionales seguras entre sus fuentes de datos y herramientas basadas en IA. Proporciona una forma estandarizada para que los modelos de IA descubran e interactúen con herramientas externas, aplicaciones y fuentes de datos.

### Características principales:

- **Protocolo abierto** desarrollado por Anthropic
- Permite **integración seamless** entre aplicaciones de modelos de lenguaje
- Actúa como **puente** entre modelos de IA y sistemas externos
- Facilita el acceso a **bases de datos, APIs y tareas especializadas**
- Disponible en VS Code desde la versión 1.102
- **Soporte completo de especificación** implementado en VS Code con funciones avanzadas de autorización
- **Integración empresarial** con características de seguridad y gestión centralizadas

### Funcionalidades en VS Code:

1. **Tools**: Herramientas que los modelos pueden invocar para realizar acciones
2. **Resources**: Fuentes de datos que pueden usarse como contexto
3. **Prompts**: Indicaciones preconfiguradas para tareas comunes
4. **Elicitations**: Solicitudes de entrada adicional del usuario
5. **Authorization Framework**: Sistema robusto de permisos y autenticación
6. **Enterprise Management**: Gestión centralizada para organizaciones

### Configuración en VS Code:

- Archivo de configuración: `.vscode/mcp.json` (para workspace)
- Configuración global de usuario
- Autodescubrimiento desde otras herramientas (como Claude Desktop)
- Soporte para Dev Containers
- **Nuevas características de autorización** para control granular de permisos

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
      "args": ["-y", "@microsoft/mcp-server-playwright"],
      "authorization": {
        "required": true,
        "scope": "browser-automation"
      }
    },
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "authorization": {
        "required": true,
        "scope": "repository-access"
      }
    }
  }
}
```

## Costos de GitHub Copilot

**Fuentes principales**:

1. **GitHub Docs** - "Plans for GitHub Copilot"  
   **Fecha de acceso**: Enero 8, 2025  
   **URL**: https://docs.github.com/en/copilot/get-started/plans

2. **TechCrunch** - "GitHub Copilot introduces new limits, charges for 'premium' AI models"  
   **Fecha de publicación**: 4 de abril de 2025  
   **URL**: https://techcrunch.com/2025/04/04/github-copilot-introduces-new-limits-charges-for-premium-ai-models/

### Planes Individuales (Actualizados 2025):

#### 1. GitHub Copilot Free

- **Precio**: Gratis
- **Características**:
  - **2,000 completaciones por mes** con modelos incluidos
  - **50 mensajes de chat por mes** en IDEs
  - **50 premium requests por mes**
  - Acceso a modelos básicos: GPT-4.1, GPT-4o, Claude Sonnet 3.5, Gemini 2.0 Flash
  - Sin acceso a modelos premium como o3, Claude Opus 4, etc.
  - **No permite comprar premium requests adicionales**

#### 2. GitHub Copilot Pro

- **Precio**: $10 USD/mes o $100 USD/año
- **Características**:
  - **Completaciones ilimitadas** con modelos incluidos
  - **Chat ilimitado** con modelos incluidos en IDEs
  - **300 premium requests por mes**
  - Acceso a modelos adicionales: o4-mini, Claude Sonnet 3.7, Claude Sonnet 4, Gemini 2.5 Pro
  - **Premium requests adicionales**: $0.04 USD por request
  - Copilot coding agent incluido
  - Copilot pull request summaries
  - **Prueba gratuita de 30 días** para usuarios elegibles
  - **Acceso gratuito** para estudiantes verificados, profesores y mantenedores de proyectos open source populares

#### 3. GitHub Copilot Pro+ (Nuevo Plan 2025)

- **Precio**: $39 USD/mes o $390 USD/año
- **Características**:
  - **Todo lo incluido en Copilot Pro**
  - **1,500 premium requests por mes** (5x más que Pro)
  - **Acceso completo a todos los modelos disponibles**, incluyendo:
    - o3 (modelo de razonamiento avanzado de OpenAI)
    - Claude Opus 4 (modelo más potente de Anthropic)
    - GPT-4.5 (próxima generación de OpenAI)
  - **Premium requests adicionales**: $0.04 USD por request
  - Audit logs incluidos
  - GitHub Spark (public preview)
  - **Ideal para "AI power users"** que necesitan acceso a las capacidades más avanzadas

### Planes Empresariales:

#### 1. GitHub Copilot Business

- **Precio**: $19 USD por usuario/mes
- **Características**:
  - **300 premium requests por usuario por mes**
  - Gestión centralizada y control de políticas de Copilot
  - Instrucciones personalizadas a nivel organizacional
  - Content exclusion
  - Exclusión de archivos específicos de Copilot
  - Gestión de políticas a nivel organizacional

#### 2. GitHub Copilot Enterprise

- **Precio**: $39 USD por usuario/mes
- **Características**:
  - **1,000 premium requests por usuario por mes**
  - Todas las características de Copilot Business
  - Copilot knowledge bases
  - Coding guidelines para code review
  - Características empresariales avanzadas y gestión centralizada

### Sistema de Premium Requests (Actualizado Abril 2025):

#### ¿Qué son los Premium Requests?

Los **premium requests** son un sistema de límites de velocidad implementado cuando los usuarios cambian a modelos de IA distintos al modelo base (GPT-4o) para tareas como:

- Codificación "agéntica" (uso del coding agent)
- Ediciones multi-archivo
- Uso de modelos avanzados en Copilot Chat
- Extensiones de Copilot

#### Modelos que Consumen Premium Requests:

**Modelos gratuitos** (no consumen premium requests):

- GPT-4.1
- GPT-4o
- Claude Sonnet 3.5
- Gemini 2.0 Flash

**Modelos premium** (consumen premium requests):

- o3, o4-mini (OpenAI)
- Claude Sonnet 3.7, Claude Sonnet 3.7 Thinking, Claude Sonnet 4, Claude Opus 4 (Anthropic)
- Gemini 2.5 Pro (Google)
- GPT-4.5 (OpenAI)

#### Multiplicadores de Modelo:

Algunos modelos avanzados pueden contar como **múltiples requests** (hasta 50x el costo base) debido a su mayor costo computacional. Los modelos de razonamiento como Claude Sonnet 3.7 Thinking y o3 toman más tiempo para verificar sus respuestas, haciéndolos más confiables pero aumentando el costo computacional.

#### Costo de Premium Requests Adicionales:

- **Precio**: $0.04 USD por premium request adicional
- **Disponible en**: Todos los planes pagos (Pro, Pro+, Business, Enterprise)
- **No disponible en**: Plan gratuito

### Cambios Implementados en 2025:

**Fechas de implementación**:

- **Copilot Pro**: Límites activos desde el 5 de mayo de 2025
- **Copilot Business y Enterprise**: Límites activos entre el 12 y 19 de mayo de 2025
- **Copilot Pro+**: Lanzado el 4 de abril de 2025

### Análisis de Costos para Testing Funcional:

#### Escenario Típico de Testing:

- **Uso de Playwright MCP**: Cada automatización puede consumir múltiples premium requests
- **Modelos recomendados**: Claude Sonnet 3.7 para razonamiento complejo, o4-mini para tareas rápidas
- **Estimación de consumo**: 10-50 premium requests por sesión de testing compleja

#### Recomendaciones por Uso:

1. **Uso Ocasional (< 10 horas/mes)**: Copilot Pro ($10/mes)
2. **Uso Regular (10-40 horas/mes)**: Copilot Pro+ ($39/mes)
3. **Equipos Pequeños (2-10 desarrolladores)**: Copilot Business ($19/usuario/mes)
4. **Empresas (10+ desarrolladores)**: Copilot Enterprise ($39/usuario/mes)

### Rentabilidad de GitHub Copilot:

Según Satya Nadella (CEO de Microsoft, agosto 2024), GitHub Copilot representa **más del 40% del crecimiento de ingresos de GitHub en 2024** y ya es un negocio más grande que todo GitHub cuando Microsoft lo adquirió hace aproximadamente siete años.

## Relación con BDD (Behavior Driven Development)

**Fuente complementaria**: ACCELQ - "Gherkin Syntax: A Complete Guide" (4 de abril de 2025)

### ¿Qué es BDD?

- Evolución del TDD (Test Driven Development) propuesta por Dan North
- En lugar de tests unitarios, se enfocan en **pruebas que validan requisitos funcionales de negocio**
- Los tests se escriben **antes** que el código (como en TDD)
- Permite cruzar el puente entre perfiles de negocio y técnicos
- **Enfoque en comportamiento**: Se centra en cómo debe comportarse el sistema desde la perspectiva del usuario final

### Diferencias con TDD:

- **TDD**: Tests unitarios → Código → Refactoring
- **BDD**: Especificaciones de comportamiento (en Gherkin) → Tests funcionales → Código → Validación de comportamiento

### Ventajas del enfoque BDD:

1. **Comunicación clara** entre equipos técnicos y de negocio
2. **Documentación viva** que se actualiza automáticamente con el código
3. **Casos de prueba legibles** por personas no técnicas
4. **Automatización** de pruebas basada en requisitos de negocio
5. **Validación de comportamiento** en lugar de solo funcionalidad técnica
6. **Reduce malentendidos** entre stakeholders y desarrolladores

## Herramientas y Frameworks

### Cucumber

- Framework de testing más popular para BDD
- Soporta especificaciones escritas en Gherkin
- Genera casos de prueba automáticamente a partir de especificaciones Gherkin
- Acelera el desarrollo de software
- Patrón "Given-When-Then"
- Disponible para múltiples lenguajes: Java, Ruby, JavaScript, Python, C#

### Otros frameworks BDD:

- **SpecFlow** (para .NET)
- **Behave** (para Python)
- **JBehave** (para Java)
- **Lettuce** (para Python)

## Aplicación en Testing Funcional

### Casos de uso típicos:

- Validación de flujos de usuario en aplicaciones web
- Pruebas de integración que involucran múltiples componentes
- Verificación de reglas de negocio complejas
- Testing de APIs desde la perspectiva del usuario final
- Pruebas de aceptación automatizadas
- Validación de interfaces de usuario complejas

## Integración con VS Code y Playwright

### Posibilidades actualizadas (2025):

1. **VS Code Extensions**: Soporte nativo para sintaxis Gherkin y autocompletado
2. **Playwright + Gherkin**: Automatización de navegadores usando especificaciones legibles
3. **GitHub Copilot con MCP**: Generación asistida de casos de prueba en Gherkin y ejecución automatizada
4. **Documentación como código**: Casos de uso almacenados junto al código fuente
5. **MCP de Playwright**: Integración directa con Copilot para ejecución de pruebas
6. **Authorization Framework**: Control granular de permisos para herramientas de testing

### Workflow propuesto con MCP:

1. Definir historias de usuario en formato Gherkin en `/docs/user-case/`
2. Configurar MCP de Playwright en VS Code (`.vscode/mcp.json`) con permisos apropiados
3. Usar VS Code con extensiones para escribir y validar sintaxis
4. Abrir chat de Copilot en modo agente
5. Activar herramientas de Playwright en el selector de tools
6. Ejecutar comando: "ejecuta el caso de uso `docs/user-case/login.md`"
7. Copilot utiliza MCP de Playwright para automatizar la navegación
8. Generar evidencias y reportes automáticamente
9. Revisar resultados y ajustar casos de uso según sea necesario

### Configuración práctica del MCP de Playwright (Actualizada 2025):

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"],
      "authorization": {
        "required": true,
        "scope": "browser-automation",
        "permissions": ["navigate", "click", "fill", "screenshot", "wait"]
      }
    }
  }
}
```

### Comandos de ejemplo para Copilot:

- "Ejecuta el caso de uso docs/user-case/login.md"
- "Prueba el formulario de registro siguiendo el escenario en user-case/registro.md"
- "Valida la navegación principal según el caso de uso navigation.md"
- "Genera evidencias de las pruebas ejecutadas en formato HTML"
- "Compara el comportamiento actual con las especificaciones Gherkin"

## Estructura para el Artículo Actualizada

### Conceptos clave a desarrollar:

1. **Introducción al testing funcional** automatizado con IA
2. **¿Qué es Gherkin?** - Fundamentos, filosofía y sintaxis completa
3. **¿Qué es MCP?** - Model Context Protocol y su importancia en 2025
4. **BDD vs TDD** - ¿Por qué Behavior Driven Development?
5. **Configuración del entorno** - VS Code + Copilot + MCP de Playwright
6. **Instalación y configuración de MCP** - Paso a paso con autorización
7. **Estructura de proyecto** - Organización de archivos de prueba
8. **Casos de uso prácticos** - Historias de usuario reales en `/docs/user-case/`
9. **Automatización con Copilot y MCP** - Comandos directos en chat
10. **Ejemplos prácticos** - Navegación, formularios, validaciones
11. **Costos y consideraciones** - Análisis detallado de planes de Copilot y premium requests
12. **Mejores prácticas** - Mantenibilidad, escalabilidad y autorización
13. **Integración con CI/CD** - Automatización completa del testing
14. **Casos de estudio** - Implementaciones reales y lecciones aprendidas

## Instrucciones paso a paso para el usuario

### 1. Configuración inicial

1. Instalar VS Code (versión 1.102+)
2. Instalar extensión de GitHub Copilot
3. Configurar plan de Copilot apropiado (considerar costos de premium requests)
4. Instalar extensiones de Gherkin/Cucumber para sintaxis highlighting
5. Configurar autorización y permisos para MCP

### 2. Configuración del MCP de Playwright

1. Crear archivo `.vscode/mcp.json` en el workspace
2. Configurar servidor de Playwright MCP con permisos apropiados
3. Instalar Playwright: `npx playwright install`
4. Verificar que MCP está funcionando en la vista de extensiones
5. Probar conexión y autorización

### 3. Estructura del proyecto recomendada

```
proyecto/
├── .vscode/
│   └── mcp.json
├── docs/
│   └── user-case/
│       ├── login.feature.md
│       ├── registro.feature.md
│       ├── navegacion.feature.md
│       └── checkout.feature.md
├── src/
├── tests/
│   ├── evidence/
│   └── reports/
└── package.json
```

### 4. Crear casos de uso

1. Definir historias de usuario en formato Gherkin
2. Guardar en `/docs/user-case/nombre-caso.feature.md`
3. Incluir pasos detallados de navegación con selectores específicos
4. Especificar evidencias esperadas (screenshots, logs, etc.)
5. Documentar datos de prueba y precondiciones

### 5. Ejecutar pruebas con Copilot

1. Abrir chat de Copilot (Ctrl+Alt+I)
2. Seleccionar modo "Agente"
3. Activar herramientas de Playwright en el selector de tools
4. Ejecutar comando: "ejecuta el caso de uso docs/user-case/login.feature.md"
5. Revisar y confirmar acciones del MCP
6. Obtener evidencias automáticas en `/tests/evidence/`
7. Generar reportes en formato HTML/PDF

### Consideraciones de costos para testing intensivo:

- **Plan recomendado**: Copilot Pro+ ($39/mes) para acceso a modelos avanzados
- **Estimación de consumo**: 20-100 premium requests por sesión de testing
- **Optimización**: Usar modelos gratuitos para tareas simples, modelos premium para análisis complejo
