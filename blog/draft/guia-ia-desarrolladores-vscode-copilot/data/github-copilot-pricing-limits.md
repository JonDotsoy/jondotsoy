# GitHub Copilot - Precios, Límites y Características Detalladas

**Fecha de consulta**: 11 de agosto de 2025  
**Fuentes consultadas**:

- https://github.com/features/copilot
- https://docs.github.com/en/copilot/about-github-copilot/github-copilot-features
- https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot
- https://github.com/features/copilot/plans

---

## Resumen Ejecutivo

GitHub Copilot ofrece varios planes de suscripción diseñados para diferentes tipos de usuarios, desde desarrolladores individuales hasta empresas. La principal diferencia entre los planes radica en los límites de solicitudes premium, acceso a modelos avanzados de IA, y características empresariales.

## Planes Disponibles

### 1. GitHub Copilot Free

- **Precio**: $0 USD
- **Dirigido a**: Desarrolladores individuales que quieren probar Copilot
- **Límites de solicitudes premium**: 50 por mes
- **Completions de código**: 2,000 por mes
- **Modelos incluidos**: Claude Sonnet 3.5, GPT-4.1, y otros básicos
- **Características**:
  - Acceso limitado a funciones selectas de Copilot
  - 50 solicitudes de agente o chat por mes
  - Autocompletado básico
  - No incluye coding agent
  - No incluye code review avanzado

### 2. GitHub Copilot Pro (Más Popular)

- **Precio**: $10 USD/mes o $100 USD/año
- **Dirigido a**: Desarrolladores individuales que quieren flexibilidad completa
- **Límites de solicitudes premium**: 300 por mes (6x más que Free)
- **Completions de código**: Ilimitadas
- **Modelos incluidos**:
  - Todo lo de Free
  - Claude Sonnet 4
  - GPT-5
  - Gemini 2.5 Pro
  - Acceso a code review
- **Características**:
  - Chat y agente ilimitados con GPT-4.1
  - Coding agent (preview)
  - Code review
  - Opción de comprar más solicitudes premium
  - **Gratuito para**: estudiantes verificados, profesores, y mantenedores de proyectos open source populares
- **Prueba gratuita**: 30 días

### 3. GitHub Copilot Pro+

- **Precio**: $39 USD/mes o $390 USD/año
- **Dirigido a**: Desarrolladores power users que necesitan acceso máximo a IA
- **Límites de solicitudes premium**: 1,500 por mes (30x más que Free)
- **Completions de código**: Ilimitadas
- **Modelos incluidos**:
  - Todo lo de Pro
  - Claude Opus 4.1
  - o3
  - o3-mini
  - Acceso a todos los modelos disponibles
- **Características**:
  - Máxima flexibilidad y elección de modelos
  - Acceso a GitHub Spark
  - Límites extendidos de solicitudes
  - Capacidades adicionales avanzadas

### 4. GitHub Copilot Business

- **Precio**: $19 USD por usuario por mes
- **Dirigido a**: Organizaciones en GitHub Free o GitHub Team
- **Límites de solicitudes premium**: 300 por usuario por mes
- **Características**:
  - Gestión centralizada
  - Control de políticas de Copilot
  - Coding agent incluido
  - Todas las características de Pro
  - Gestión de acceso organizacional
  - Datos de uso y auditoría
  - Exclusión de archivos

### 5. GitHub Copilot Enterprise

- **Precio**: $39 USD por usuario por mes
- **Dirigido a**: Empresas usando GitHub Enterprise Cloud
- **Límites de solicitudes premium**: 1,000 por usuario por mes
- **Características**:
  - Todo lo de Business
  - Copilot knowledge bases
  - Capacidades enterprise-grade adicionales
  - Gestión avanzada de políticas
  - Integración completa con GitHub Enterprise

---

## Características Detalladas por Categoría

### Agentes

| Característica         | Free                               | Pro | Pro+ | Business | Enterprise |
| ---------------------- | ---------------------------------- | --- | ---- | -------- | ---------- |
| Coding agent           | ❌                                 | ✅  | ✅   | ✅       | ✅         |
| Agent mode             | ✅                                 | ✅  | ✅   | ✅       | ✅         |
| Code review            | Solo "Review selection" en VS Code | ✅  | ✅   | ✅       | ✅         |
| Pull request summaries | ✅                                 | ✅  | ✅   | ✅       | ✅         |

### Chat

| Característica        | Free | Pro       | Pro+      | Business  | Enterprise |
| --------------------- | ---- | --------- | --------- | --------- | ---------- |
| Mensajes por mes      | 50   | Ilimitado | Ilimitado | Ilimitado | Ilimitado  |
| Chat en IDEs          | ✅   | ✅        | ✅        | ✅        | ✅         |
| Chat en GitHub.com    | ✅   | ✅        | ✅        | ✅        | ✅         |
| Chat en GitHub Mobile | ✅   | ✅        | ✅        | ✅        | ✅         |
| Chat en CLI           | ✅   | ✅        | ✅        | ✅        | ✅         |
| Skills en Chat        | ✅   | ✅        | ✅        | ✅        | ✅         |
| Copilot Spaces        | ❌   | ❌        | ✅        | ✅        | ✅         |
| Copilot Edits         | ❌   | ✅        | ✅        | ✅        | ✅         |

### Modelos de IA Disponibles

| Modelo            | Free | Pro | Pro+ | Business | Enterprise |
| ----------------- | ---- | --- | ---- | -------- | ---------- |
| Claude Sonnet 3.5 | ✅   | ✅  | ✅   | ✅       | ✅         |
| Claude Sonnet 4   | ❌   | ✅  | ✅   | ✅       | ✅         |
| Claude Opus 4.1   | ❌   | ❌  | ✅   | ❌       | ✅         |
| GPT-4.1           | ❌   | ✅  | ✅   | ✅       | ✅         |
| GPT-5             | ❌   | ❌  | ✅   | ❌       | ✅         |
| o3                | ❌   | ❌  | ✅   | ❌       | ✅         |
| Gemini 2.0 Flash  | ✅   | ✅  | ✅   | ✅       | ✅         |
| Gemini 2.5 Pro    | ❌   | ✅  | ✅   | ✅       | ✅         |
| o3-mini           | ❌   | ✅  | ✅   | ✅       | ✅         |
| o4-mini           | ❌   | ✅  | ✅   | ✅       | ✅         |

### Completado de Código

| Característica        | Free  | Pro        | Pro+       | Business   | Enterprise |
| --------------------- | ----- | ---------- | ---------- | ---------- | ---------- |
| Completions por mes   | 2,000 | Ilimitadas | Ilimitadas | Ilimitadas | Ilimitadas |
| Next edit suggestions | ✅    | ✅         | ✅         | ✅         | ✅         |

### Personalización

| Característica        | Free | Pro | Pro+ | Business | Enterprise |
| --------------------- | ---- | --- | ---- | -------- | ---------- |
| Custom instructions   | ✅   | ✅  | ✅   | ✅       | ✅         |
| Copilot Extensions    | ❌   | ❌  | ❌   | ✅       | ✅         |
| Exclude files         | ✅   | ✅  | ✅   | ✅       | ✅         |
| Fine-tuning           | ✅   | ✅  | ✅   | ✅       | ✅         |
| Knowledge bases       | ❌   | ❌  | ❌   | ❌       | ✅         |
| Organization policies | ✅   | ✅  | ✅   | ✅       | ✅         |
| Slack integration     | ❌   | ❌  | ✅   | ✅       | ✅         |
| Third party agents    | ❌   | ❌  | ❌   | ✅       | ✅         |

### Otras Características

| Característica            | Free | Pro | Pro+ | Business | Enterprise |
| ------------------------- | ---- | --- | ---- | -------- | ---------- |
| Copilot in GitHub Desktop | ❌   | ✅  | ✅   | ✅       | ✅         |
| GitHub Spark              | ❌   | ❌  | ✅   | ✅       | ✅         |
| Analytics                 | ❌   | ❌  | ❌   | ✅       | ✅         |
| Audit logs                | ❌   | ❌  | ❌   | ❌       | ✅         |
| Text completion           | ✅   | ✅  | ✅   | ✅       | ✅         |
| GitHub Models rate limits | ❌   | ❌  | ✅   | ❌       | ❌         |

---

## Detalles Importantes sobre Límites

### Solicitudes Premium

- **¿Qué son?**: Solicitudes a modelos avanzados como Claude Sonnet 4, GPT-5, o3, etc.
- **Modelo de facturación**: Por solicitud, no por token
- **Límites mensuales**:
  - Free: 50 solicitudes
  - Pro: 300 solicitudes (6x más que Free)
  - Pro+: 1,500 solicitudes (30x más que Free)
  - Business: 300 por usuario
  - Enterprise: 1,000 por usuario

### Completions de Código

- **Free**: 2,000 completions por mes
- **Todos los planes pagados**: Ilimitadas
- **¿Qué incluye?**: Autocompletado, sugerencias de código, next edit suggestions

### Limitaciones Adicionales

- Los tiempos de respuesta pueden variar durante períodos de alto uso
- Las solicitudes pueden estar sujetas a límites de velocidad
- La opción de comprar solicitudes premium adicionales no está disponible para usuarios que se suscriben a través de GitHub Mobile en iOS o Android

### Solicitudes Premium Adicionales

**¿Qué sucede cuando se agotan las solicitudes premium?**

- Si tienes configurado un método de pago: se te cobrará automáticamente por solicitudes adicionales a las tarifas normales
- Si no tienes método de pago configurado: aparece un mensaje explicando por qué Copilot no puede trabajar en la tarea
- Las solicitudes adicionales se facturan por separado del plan base

**Precios de Solicitudes Premium Adicionales:**

- **Precio confirmado**: $0.04 USD por solicitud premium adicional
- La facturación comenzó el 18 de junio de 2025 para planes pagados en GitHub.com
- La facturación comenzó el 1 de agosto de 2025 en GHE.com
- Por defecto, todos los presupuestos están en $0 y las solicitudes extra son rechazadas
- Debes configurar un presupuesto/límite de gasto para permitir solicitudes adicionales
- **Importante**: No disponible para suscripciones vía GitHub Mobile (iOS/Android)

- **Monitoreo de Uso:**
- Puedes monitorear tu uso mensual de solicitudes premium
- GitHub proporciona herramientas para ver tu consumo y entitlements
- Se recomienda revisar regularmente para evitar cargos inesperados

---

## Estrategias para Gestión de Costos con Solicitudes Premium

### Optimización del Uso de Solicitudes Premium

**Solicitudes que NO consumen límite premium:**

- Autocompletado básico de código (ilimitado en planes pagados)
- Chat básico con modelos incluidos (Claude Sonnet 3.5, GPT-4.1)
- Next edit suggestions
- Copilot en GitHub Desktop
- Text completion básico

**Solicitudes que SÍ consumen límite premium:**

- Chat con modelos avanzados (Claude Sonnet 4, GPT-5, Gemini 2.5 Pro, o3, etc.)
- Copilot coding agent (1 solicitud premium por sesión)
- Code review avanzado
- Solicitudes complejas que requieren modelos de última generación

### Estrategias de Ahorro

1. **Planificación de Solicitudes:**

   - Agrupa múltiples preguntas en una sola solicitud premium
   - Usa modelos básicos para consultas simples
   - Reserva modelos premium para problemas complejos

2. **Uso Eficiente del Coding Agent:**

   - Una sesión de coding agent = 1 solicitud premium
   - Maximiza el trabajo en cada sesión
   - Planifica los cambios antes de iniciar la sesión

3. **Monitoreo Continuo:**
   - Revisa tu uso mensual regularmente
   - Establece alertas de consumo
   - Ajusta el plan si es necesario

### Cálculo de Costos Proyectados

**Escenario Conservative (Pro - $10/mes):**

- 300 solicitudes premium mensuales incluidas
- ~10 solicitudes premium por día hábil
- Solicitudes adicionales: $0.04 USD cada una
- Ejemplo de sobrecosto: 100 solicitudes extra = $4 USD adicionales
- Ideal para: desarrollo moderado con uso ocasional de modelos avanzados

**Escenario Intensivo (Pro+ - $39/mes):**

- 1,500 solicitudes premium mensuales incluidas
- ~50 solicitudes premium por día hábil
- Solicitudes adicionales: $0.04 USD cada una
- Ejemplo de sobrecosto: 500 solicitudes extra = $20 USD adicionales
- Ideal para: desarrollo intensivo, proyectos complejos, uso frecuente de IA

**Costos Reales con Multiplicadores:**

- **Claude Opus 4.1**: 30 interacciones = 300 solicitudes premium (agota límite Pro)
- **Claude Sonnet 4**: 300 interacciones = 300 solicitudes premium
- **Gemini 2.0 Flash**: 1,200 interacciones = 300 solicitudes premium (0.25x)
- **Mixing modelos**: Combinar puede optimizar el uso del límite

**Riesgo de Sobrecostos:**

- **Sin presupuesto configurado**: Solicitudes extra son rechazadas automáticamente
- **Con presupuesto configurado**: Facturación automática a $0.04 USD por solicitud
- **Control recomendado**: Configurar alertas de uso y límites de gasto
- **Facturación**: Los contadores se reinician el 1er día de cada mes a las 00:00:00 UTC

---

## Comparación de Modelos por Plan

### Modelos Básicos (No consumen límite premium)

- **Claude Sonnet 3.5**: Disponible en todos los planes
- **GPT-4.1**: Disponible desde Pro
- **Gemini 2.0 Flash**: Disponible en todos los planes

### Modelos Premium (Consumen límite premium)

- **Claude Sonnet 4**: Pro, Pro+, Business, Enterprise (Multiplicador: 1x)
- **Claude Opus 4.1**: Solo Pro+, Enterprise (Multiplicador: 10x)
- **GPT-5**: Solo Pro+, Enterprise (Multiplicador: 1x)
- **o3 / o3-mini**: Pro+, Pro (limitado), Enterprise (Multiplicador: 10x para o3)
- **Gemini 2.5 Pro**: Pro, Pro+, Business, Enterprise (Multiplicador: 1x)
- **Gemini 2.0 Flash**: Multiplicador 0.25x en planes pagados, 1x en Free

### Multiplicadores de Modelos (Información Crítica)

Los modelos tienen diferentes multiplicadores que afectan el consumo de solicitudes:

| Modelo            | Multiplicador Planes Pagados | Multiplicador Copilot Free |
| ----------------- | ---------------------------- | -------------------------- |
| GPT-4.1           | 0 (gratuito)                 | 1                          |
| GPT-4o            | 0 (gratuito)                 | 1                          |
| Claude Sonnet 3.5 | 1                            | 1                          |
| Claude Sonnet 4   | 1                            | N/A                        |
| Claude Opus 4.1   | 10                           | N/A                        |
| GPT-5             | 1                            | N/A                        |
| o3                | 10                           | N/A                        |
| o3-mini           | 1                            | N/A                        |
| Gemini 2.0 Flash  | 0.25                         | 1                          |
| Gemini 2.5 Pro    | 1                            | N/A                        |

**Ejemplos de Consumo:**

- **Claude Opus 4** en Chat: 1 interacción = 10 solicitudes premium (multiplicador 10x)
- **Claude Sonnet 4** en Chat: 1 interacción = 1 solicitud premium
- **GPT-4.1** en planes pagados: 1 interacción = 0 solicitudes premium (incluido)
- **Gemini 2.0 Flash** en planes pagados: 1 interacción = 0.25 solicitudes premium

---

## Plataformas Compatibles

GitHub Copilot está disponible en:

- **Editores**: Visual Studio Code, Visual Studio, JetBrains IDEs, Xcode, Vim/Neovim, Eclipse, Azure Data Studio
- **Web**: GitHub.com
- **Móvil**: GitHub Mobile (iOS/Android)
- **Terminal**: GitHub CLI, Windows Terminal
- **Desktop**: GitHub Desktop

---

## Casos de Uso Recomendados por Plan

### Free

- Desarrolladores que quieren probar Copilot
- Proyectos personales pequeños
- Aprendizaje y experimentación

### Pro

- Desarrolladores profesionales individuales
- Freelancers
- Startups pequeñas
- Desarrollo activo diario

### Pro+

- Desarrolladores power users
- Proyectos complejos que requieren modelos avanzados
- Usuarios que necesitan acceso a las últimas características de IA

### Business

- Equipos pequeños a medianos
- Necesidad de gestión centralizada
- Control de políticas organizacionales

### Enterprise

- Grandes organizaciones
- Requisitos de compliance estrictos
- Necesidad de knowledge bases personalizadas
- Integración completa con ecosistema empresarial

---

## Notas Importantes

1. **Estudiantes y Educadores**: Pueden acceder a Copilot Pro de forma gratuita si están verificados
2. **Open Source**: Mantenedores de proyectos open source populares pueden acceder gratuitamente a Pro
3. **Prueba Gratuita**: Pro ofrece 30 días gratuitos para usuarios elegibles
4. **Facturación**: Los planes anuales ofrecen descuentos significativos
5. **Migración**: Es posible cambiar entre planes en cualquier momento

---

## Conclusiones para el Artículo

Para el contexto del artículo sobre desarrollo con IA:

1. **Para la mayoría de desarrolladores profesionales**: Copilot Pro ($10/mes) ofrece el mejor balance costo-beneficio
2. **Gestión de costos**: Los 300 solicitudes premium mensuales requieren planificación cuidadosa
3. **Optimización**: Es crucial entender la diferencia entre solicitudes básicas (ilimitadas) y premium (limitadas)
4. **Escalabilidad**: Los planes superiores son principalmente para power users o equipos grandes

Esta información es fundamental para el artículo, especialmente para las secciones sobre gestión de costos y optimización del uso de IA.

---

## Información Adicional sobre Facturación

### Copilot Coding Agent - Consumo Específico

- **1 solicitud premium por sesión** (no por interacción individual)
- Una sesión comienza cuando solicitas a Copilot crear un PR o hacer cambios
- También consume minutos de GitHub Actions de tu asignación mensual gratuita
- Los minutos de Actions se comparten con todos los workflows de tu cuenta

### Límites de GitHub Actions Incluidos

- **Free**: 2,000 minutos/mes
- **Pro**: 3,000 minutos/mes
- **Team**: 3,000 minutos/mes
- **Enterprise**: 50,000 minutos/mes

### Facturación Combinada

Cuando usas Copilot coding agent, consumes:

1. **1 solicitud premium** de tu límite mensual
2. **Minutos de GitHub Actions** para ejecutar el código

### Notas Críticas para Desarrolladores

1. **Precio Confirmado**: Solicitudes premium adicionales cuestan exactamente $0.04 USD cada una
2. **Control de Gastos**: Los presupuestos están en $0 por defecto - debes configurarlos manualmente
3. **Multiplicadores**: Algunos modelos (Claude Opus 4.1, o3) consumen 10x más solicitudes
4. **Facturación Activa**: El sistema de facturación está operativo desde junio/agosto 2025
5. **Plataforma de Suscripción**: Evita suscribirte desde móvil si planeas comprar solicitudes adicionales
6. **Monitoreo Obligatorio**: Los contadores se reinician mensualmente - sin acumulación
7. **Modelos Incluidos**: GPT-4.1 y GPT-4o son completamente gratuitos en planes pagados

### Recomendaciones Finales

- **Para Artículo**: Enfatizar el costo real de $0.04 por solicitud extra y los multiplicadores
- **Gestión de Riesgos**: Configurar presupuestos específicos y alertas de uso
- **Optimización**: Usar modelos con multiplicadores bajos para tareas rutinarias
- **Escalabilidad**: Considerar Pro+ si necesitas más de 300 solicitudes premium mensuales
- **Estrategia**: Planificar el uso considerando que Claude Opus consume 10x más que otros modelos
