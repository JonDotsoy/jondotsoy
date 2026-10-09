# Notas: sincronizar `.env` entre git worktrees con `@jondotsoy/envs`

Contexto original (dictado, depurado):

- Uso `git worktree` a diario en mi trabajo.
- Problema 1: acumulo una cantidad enorme de worktrees (cada rama tiene el suyo).
- Problema 2: las dependencias (`node_modules`, archivos de versiones) se duplican en cada worktree y el tamaño en disco crece demasiado.
- Problema 3: copiar y pegar los secretos (`.env`) manualmente entre worktrees.
- Solución parcial: `@jondotsoy/envs` resuelve solo el problema 3.
  - `bunx @jondotsoy/envs edit` genera un YAML único y permite publicar variables similares en todos los worktrees.
  - También permite saber qué variables ya están configuradas en cada uno.

Requisitos editoriales:

- Tono semiformal, en español, orientado a público técnico.
- Call to action: usar la herramienta en todos los proyectos.
- El documento incluye una guía de adopción rápida en el flujo diario.

Datos verificados de la investigación (ver revisión técnica): v0.1.4, requiere Bun y git, `edit` requiere `code` en el PATH, no existe `list`/`status`, escribe siempre `.env`.
