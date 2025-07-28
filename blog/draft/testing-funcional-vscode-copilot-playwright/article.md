---
title: Testing Funcional con VS Code, Copilot y Playwright
tags:
  - testing
  - playwright
  - vscode
  - copilot
  - gherkin
  - qa
  - bdd
  - automation
  - mcp
  - model-context-protocol
  - pricing
  - ai-tools
  - functional-testing
author: Jonathan Delgado <hi@jon.soy>
lang: es-CL
date: Jul 28 2025
---

# Testing Funcional con VS Code, Copilot y Playwright: Automatización de Historias de Usuario con MCP

El testing funcional automatizado ha evolucionado significativamente con la llegada del Model Context Protocol (MCP) y las herramientas de IA como GitHub Copilot. En este artículo exploraremos cómo usar VS Code con el agente de Copilot y Playwright para crear casos de uso funcionales que se puedan ejecutar mediante comandos naturales, eliminando la necesidad de escribir código de testing complejo.

## ¿Por qué necesitamos un enfoque diferente al testing?

Tradicionalmente, el testing se ha dejado para el final del desarrollo, perdiendo una valiosa oportunidad de optimizar nuestro trabajo como programadores. Además, la comunicación entre equipos de negocio y técnicos suele ser compleja, generando malentendidos que se traducen en productos que no cumplen exactamente con las expectativas del usuario final.

Es aquí donde entra en juego **BDD (Behavior Driven Development)** y **Gherkin**, que nos permiten crear un puente de comunicación eficaz entre todos los stakeholders del proyecto.

## ¿Qué es Gherkin y por qué es importante?

Gherkin es un **Lenguaje Específico de Dominio (DSL)** diseñado para resolver el problema de comunicación entre perfiles de negocio y técnicos. Su principal ventaja es que utiliza **lenguaje natural** que cualquier persona puede entender, independientemente de sus conocimientos técnicos.

### Sintaxis fundamental de Gherkin

Gherkin se basa en palabras clave específicas que estructuran los casos de prueba:

- **Feature**: Describe la funcionalidad general que se está probando
- **Scenario**: Define un caso de prueba específico para esa característica
- **Given**: Establece el contexto inicial o las precondiciones
- **When**: Describe la acción que realiza el usuario
- **Then**: Describe el resultado esperado
- **And/But**: Permiten agregar pasos adicionales al escenario

### Ejemplo práctico de Gherkin

```gherkin
Feature: Autenticación de usuario en la aplicación web
  Como usuario registrado
  Quiero poder iniciar sesión en la aplicación
  Para acceder a mis datos personales y funcionalidades

  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given el usuario está en la página de inicio de sesión
    When el usuario introduce su email "usuario@ejemplo.com"
    And el usuario introduce su contraseña "miContraseña123"
    And el usuario hace clic en el botón "Iniciar Sesión"
    Then el usuario es redirigido a su dashboard personal
    And el sistema muestra el mensaje "Bienvenido de nuevo"
    And el nombre del usuario aparece en la barra de navegación

  Scenario: Intento de inicio de sesión con credenciales inválidas
    Given el usuario está en la página de inicio de sesión
    When el usuario introduce su email "usuario@ejemplo.com"
    And el usuario introduce una contraseña incorrecta "contraseñaIncorrecta"
    And el usuario hace clic en el botón "Iniciar Sesión"
    Then el sistema muestra el mensaje de error "Credenciales inválidas"
    And el usuario permanece en la página de inicio de sesión
```

## BDD vs TDD: ¿Cuál es la diferencia?

Mientras que **TDD (Test Driven Development)** se enfoca en escribir tests unitarios antes del código, **BDD (Behavior Driven Development)** va un paso más allá:

### TDD (Enfoque tradicional):

1. Escribir test unitario (que falla)
2. Escribir código mínimo para pasar el test
3. Refactorizar el código

### BDD (Enfoque orientado al comportamiento):

1. Definir el comportamiento esperado en Gherkin
2. Escribir tests funcionales basados en esas especificaciones
3. Implementar el código que satisface el comportamiento

La principal ventaja de BDD es que las pruebas validan **requisitos funcionales de negocio** en lugar de solo la correctitud técnica del código.

## Configuración del entorno de trabajo

Para implementar este flujo de trabajo necesitaremos configurar nuestro entorno con las siguientes herramientas:

### 1. Visual Studio Code con extensiones esenciales

```bash
# Extensiones recomendadas para VS Code
- Cucumber (Gherkin) Full Support
- GitHub Copilot
- GitLens
```

### 2. Configuración del proyecto local

```bash
# Estructura de proyecto recomendada
mi-proyecto/
├── .vscode/
│   └── mcp.json
├── docs/
│   └── user-cases/
│       ├── autenticacion.md
│       ├── navegacion.md
│       └── formularios.md
└── src/
```

### 4. Levantamiento del servidor en modo local

Para poder ejecutar nuestras pruebas necesitaremos tener nuestro servidor corriendo localmente:

```bash
# Ejemplo para una aplicación Node.js
npm run dev

# Ejemplo para una aplicación React
npm start

# Ejemplo para una aplicación con Vite
npm run dev
```

## ¿Qué es el Model Context Protocol (MCP) y por qué es revolucionario?

El **Model Context Protocol (MCP)** es un estándar abierto desarrollado por Anthropic que representa un cambio de paradigma en cómo las aplicaciones de IA interactúan con herramientas externas. En el contexto de VS Code y testing funcional, MCP permite que GitHub Copilot tenga acceso directo y controlado a herramientas como Playwright.

### Características fundamentales de MCP:

- **Estándar abierto**: Desarrollado por Anthropic como protocolo universal
- **Integración segura**: Control granular sobre el acceso a herramientas y datos
- **Arquitectura modular**: Permite conectar múltiples herramientas simultáneamente
- **Soporte nativo**: Disponible en VS Code desde la versión 1.102+
- **Tiempo real**: Ejecución directa de comandos sin salir del IDE

### ¿Cómo funciona MCP con Playwright?

La integración MCP + Playwright + VS Code crea un flujo de trabajo completamente nuevo:

1. **Definimos casos de uso** en formato Gherkin en `/docs/user-cases/`
2. **Configuramos el MCP server** de Playwright en VS Code
3. **Abrimos el chat de Copilot** en modo agente
4. **Ejecutamos comandos naturales** como "ejecuta el caso de uso login.md"
5. **Copilot utiliza MCP** para controlar Playwright automáticamente
6. **Obtenemos evidencias** en tiempo real (screenshots, videos, logs)

### Configuración del MCP de Playwright

#### Paso 1: Crear archivo de configuración MCP

Crear el archivo `.vscode/mcp.json` en la raíz del proyecto:

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

#### Paso 2: Verificar configuración en VS Code

1. Abrir VS Code (versión 1.102+)
2. Ir a la vista de extensiones (Ctrl+Shift+X)
3. Verificar que aparece "MCP Servers" en la sección de extensiones instaladas
4. Confirmar que Playwright aparece como servidor disponible

### Comandos prácticos con MCP y Copilot

Una vez configurado, puedes usar comandos naturales en el chat de Copilot:

```
# Ejemplos de comandos que Copilot entiende
"Ejecuta el caso de uso docs/user-cases/login.md"
"Prueba el formulario de registro siguiendo registro.md"
"Navega a localhost:3000 y toma una captura de pantalla"
"Verifica que el botón 'Enviar' esté visible en la página"
"Llena el formulario de contacto con datos de prueba"
```

### Ventajas del enfoque MCP + Playwright:

1. **Ejecución interactiva**: Ver en tiempo real lo que hace el navegador
2. **Debugging visual**: Identificar problemas inmediatamente
3. **Evidencias automáticas**: Screenshots y videos generados automáticamente
4. **Lenguaje natural**: No necesitas conocer la API de Playwright
5. **Contextual**: Copilot entiende el contexto del proyecto y sugiere siguientes pasos

## Estructurando casos de uso para máxima reutilización

### Organización en /docs/user-cases/

Cada historia de usuario debe documentarse detalladamente en su propio archivo Markdown dentro de la carpeta `/docs/user-cases/`. Esto nos permite:

1. **Trazabilidad**: Conectar cada test con su requisito de negocio
2. **Documentación viva**: Mantener actualizada la documentación con los cambios
3. **Colaboración**: Facilitar la revisión por parte de stakeholders no técnicos

### Ejemplo de caso de uso documentado

**Archivo: `/docs/user-cases/registro-usuario.md`**

```markdown
# Historia de Usuario: Registro de Nuevo Usuario

## Descripción

Como visitante del sitio web
Quiero poder registrarme con mi email y contraseña
Para acceder a las funcionalidades de usuario registrado

## Criterios de Aceptación

### Escenario 1: Registro exitoso

**Dado** que soy un visitante no registrado
**Cuando** navego a la página de registro
**Y** completo el formulario con datos válidos
**Y** hago clic en "Registrarse"
**Entonces** mi cuenta es creada exitosamente
**Y** recibo un email de confirmación
**Y** soy redirigido a la página de verificación

### Pasos detallados para testing:

1. **Navegar** a `http://localhost:3000/register`
2. **Verificar** que aparece el formulario de registro
3. **Completar** el campo email con un email válido
4. **Completar** el campo contraseña con una contraseña válida
5. **Completar** el campo confirmar contraseña con la misma contraseña
6. **Hacer clic** en el botón "Registrarse"
7. **Verificar** redirección a página de verificación
8. **Verificar** mensaje de confirmación visible

### Evidencias esperadas:

- Screenshot del formulario completado
- Screenshot de la página de confirmación
- Verificación de que el usuario aparece en la base de datos
- Log del email enviado
```

## Casos de uso prácticos con MCP y Copilot

Una vez configurado el entorno, el verdadero poder viene de poder usar comandos naturales en el chat de Copilot para ejecutar casos de uso directamente desde VS Code.

### Ejemplos de comandos naturales

```
# Navegación básica
"Navega a localhost:3000 y toma una captura de pantalla"
"Abre la página de login en el navegador"

# Interacción con formularios
"Llena el formulario de contacto con datos de prueba"
"Prueba el formulario de registro siguiendo el caso de uso registro.md"

# Ejecución de casos de uso completos
"Ejecuta el caso de uso docs/user-cases/login.md"
"Verifica la navegación principal según navigation.md"

# Validaciones específicas
"Verifica que el botón 'Enviar' esté visible en la página"
"Confirma que aparece el mensaje de bienvenida después del login"
```

### Flujo de trabajo con agente de Copilot

1. **Abrir chat de Copilot** (Ctrl+Alt+I)
2. **Seleccionar modo "Agente"** en el chat
3. **Activar herramientas de Playwright** en el selector de tools
4. **Escribir comando natural** describiendo lo que quieres probar
5. **Revisar y confirmar** las acciones propuestas por el MCP
6. **Observar ejecución** en tiempo real en el navegador
7. **Obtener evidencias** automáticas (screenshots, logs)

### Ventajas de usar comandos naturales

- **No necesitas programar**: Solo describes lo que quieres probar
- **Comprensible para todos**: Product managers pueden ejecutar casos de uso
- **Documentación viva**: Los comandos sirven como documentación ejecutable
- **Evidencias automáticas**: Cada ejecución genera capturas y reportes
- **Debugging visual**: Ves exactamente qué está pasando en el navegador

## Mejores prácticas para casos de uso efectivos

### 1. Documentación clara de casos de uso

- **Descripciones específicas**: Cada caso de uso debe ser detallado y sin ambigüedades
- **Pasos secuenciales**: Organizar las acciones en orden lógico y cronológico
- **Criterios de éxito**: Definir claramente qué constituye un caso exitoso

### 2. Gestión de evidencias

- **Screenshots automáticos**: MCP captura evidencia en cada paso crítico
- **Videos de ejecución**: Registra las pruebas ejecutadas para análisis posterior
- **Reportes conversacionales**: Copilot genera resúmenes de las ejecuciones en lenguaje natural

## Consideraciones de Costos: GitHub Copilot y Premium Requests

Al implementar este flujo de trabajo con MCP y GitHub Copilot, es importante entender la estructura de costos para tomar decisiones informadas sobre el plan más adecuado para tu equipo.

### Planes Disponibles de GitHub Copilot

#### Plan Individual ($10 USD/mes)

- **Incluye**: Autocompletado de código básico
- **Limitaciones**: Sin acceso a premium requests (comandos avanzados con MCP)
- **Ideal para**: Desarrolladores individuales con uso básico

#### Plan Pro ($10 USD/mes)

- **Incluye**: 1,500 premium requests mensuales
- **Características adicionales**:
  - Acceso a MCP servers
  - Comandos avanzados en chat
  - Integración con herramientas externas (como Playwright)
  - GPT-4 y Claude 3.5 Sonnet
- **Ideal para**: Desarrolladores que usan testing automatizado y MCP

#### Plan Pro+ ($39 USD/mes)

- **Incluye**: Todo del Plan Pro + requests ilimitados
- **Sin límites**: Uso intensivo de premium requests
- **Ideal para**: Equipos que hacen uso extensivo de automatización

### ¿Qué son los Premium Requests?

Los **premium requests** son llamadas especiales que:

- Utilizan modelos de IA más avanzados (GPT-4, Claude 3.5 Sonnet)
- Permiten el uso de MCP servers y herramientas externas
- Incluyen comandos complejos de Playwright a través de MCP
- Generan respuestas más elaboradas y contextualmente precisas

### Costos de Premium Requests Adicionales

Si excedes tu límite mensual:

- **Costo por request adicional**: $0.04 USD
- **Ejemplo**: 100 requests adicionales = $4 USD extras

### Estimación de Uso para Testing Funcional

Para un proyecto de testing funcional típico:

#### Uso ligero (Plan Individual + upgrade a Pro):

- **~200-500 premium requests/mes**
- **Actividades**: Generación básica de tests, consultas esporádicas sobre Gherkin
- **Costo mensual**: $10 USD

#### Uso moderado (Plan Pro):

- **~800-1,200 premium requests/mes**
- **Actividades**: Ejecución regular de casos de uso con MCP, generación de evidencias
- **Costo mensual**: $10 USD (dentro del límite)

#### Uso intensivo (Plan Pro+):

- **~2,000+ premium requests/mes**
- **Actividades**: Desarrollo activo con automatización completa, múltiples proyectos
- **Costo mensual**: $39 USD (sin límites)

### Recomendaciones por Tipo de Proyecto

#### Proyectos pequeños/personales:

- **Plan sugerido**: Individual → Pro según necesidad
- **Justificación**: Costo inicial bajo, upgrade cuando necesites MCP

#### Equipos de desarrollo (2-5 personas):

- **Plan sugerido**: Pro para cada miembro clave
- **Justificación**: Balance entre funcionalidad y costo

#### Empresas/equipos grandes:

- **Plan sugerido**: Pro+ para leads, Pro para desarrolladores
- **Justificación**: Maximizar productividad sin restricciones

### Optimización de Costos

#### Estrategias para reducir premium requests:

1. **Usar comandos específicos**: Ser preciso en las instrucciones reduce iteraciones
2. **Reutilizar patrones**: Documentar soluciones comunes para evitar regeneración
3. **Combinar requests**: Agrupar múltiples consultas en una sola sesión
4. **Entrenar al equipo**: Mejor uso de la herramienta = menos requests desperdiciados

### ROI del Testing Automatizado con Copilot

El costo de Copilot se compensa rápidamente considerando:

- **Tiempo ahorrado**: 40-60% menos tiempo escribiendo tests
- **Bugs evitados**: Detección temprana reduce costos de fixes en producción
- **Calidad del código**: Tests más consistentes y completos
- **Onboarding**: Nuevos miembros del equipo son productivos más rápido

**Ejemplo de ROI**:

- Costo anual Copilot Pro: $120 USD
- Tiempo ahorrado: ~20 horas/mes × $50 USD/hora = $1,000 USD/mes
- ROI: ~833% anual

## Ventajas de este enfoque

### 1. **Colaboración mejorada**

Los casos de prueba escritos en Gherkin pueden ser revisados y entendidos por product managers, diseñadores UX y stakeholders de negocio.

### 2. **Documentación viva**

Las pruebas automáticas sirven como documentación actualizada del comportamiento del sistema.

### 3. **Detección temprana de bugs**

Al automatizar las historias de usuario desde el primer momento, detectamos inconsistencias entre la implementación y los requisitos.

### 4. **Escalabilidad**

Los casos de uso documentados en formato Gherkin son fáciles de mantener y escalar según crezca el proyecto.

### 5. **Integración con IA**

GitHub Copilot con MCP permite ejecutar casos de uso usando comandos naturales, sin necesidad de programar.

## Conclusión

La combinación de VS Code, GitHub Copilot, el Model Context Protocol (MCP) y Playwright nos proporciona un entorno de testing funcional revolucionario que trasciende las limitaciones tradicionales del testing automatizado. Este enfoque integral no solo automatiza nuestras pruebas, sino que democratiza el testing funcional y lo hace accesible para todo el equipo.

### Los pilares de esta revolución:

1. **MCP como puente tecnológico**: Permite que Copilot interactúe directamente con Playwright, eliminando la barrera entre IA y herramientas de automatización
2. **Gherkin como lenguaje universal**: Facilita la comunicación entre stakeholders técnicos y de negocio
3. **Automatización inteligente**: GitHub Copilot comprende el contexto y genera casos de prueba coherentes
4. **Evidencias en tiempo real**: Capturas, videos y logs automáticos que documentan cada ejecución

### Impacto transformador:

- **Para desarrolladores**: Menos tiempo escribiendo tests repetitivos, más tiempo innovando
- **Para QA**: Herramientas poderosas para crear suites de pruebas comprehensivas
- **Para product managers**: Visibilidad directa del comportamiento real del software
- **Para la organización**: Mayor confianza en deployments y menos bugs en producción

### Consideraciones estratégicas:

El análisis de costos demuestra que la inversión en GitHub Copilot Pro ($10/mes) o Pro+ ($39/mes) se justifica rápidamente. Con un ROI superior al 800% anual para la mayoría de equipos, el costo se convierte en una inversión en productividad y calidad.

### El futuro del testing:

Este enfoque representa una evolución natural hacia el **testing conversacional**, donde describir lo que queremos probar es suficiente para generar automatización completa. MCP es apenas el comienzo de una nueva era donde las herramientas de IA se integran nativamente con nuestro flujo de desarrollo.

### Próximos pasos recomendados:

1. **Implementar gradualmente**: Comenzar con un proyecto piloto
2. **Capacitar al equipo**: Invertir en training sobre Gherkin y BDD
3. **Medir impacto**: Tracking de métricas de calidad y productividad
4. **Iterar y mejorar**: Refinar el proceso basado en feedback del equipo

El testing funcional automatizado ya no es una tarea ardua reservada para especialistas. Con MCP, Copilot y Playwright, cualquier miembro del equipo puede contribuir a crear software más confiable, documentado y alineado con las expectativas del usuario final.

La inversión inicial en configurar este flujo de trabajo se recupera no solo en forma de menos bugs y mayor confianza, sino en la transformación cultural hacia un desarrollo más colaborativo, transparente y orientado al usuario.
