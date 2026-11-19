---
id: DOC-STK-001
tipo: stack
titulo: Stack tecnológico del proyecto — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Stack tecnológico

En la Fase 1 el proyecto comprende únicamente la **web corporativa pública** desarrollada en **Astro**, apoyada en servicios ligeros para formularios, analítica bajo consentimiento y despliegue estático/edge.

## Componentes
| Componente | Estado | Índice / Referencia |
|---|---|---|
| **Web corporativa** (`Astro SSG + Islas`) | Decidido (base) · Subáreas en propuesta | [[Stack web]] · [[ADR-001]] |
| **Guía visual** (`mbl-maqueta` + tokens CSS) | Decidido | [[Guia de estilos]] · [[ADR-002]] |
| **Interfaces externas** (leads, GTM, WhatsApp, GBP, DNS) | En definición | `08-interfaces-externas/` (`IE-001`..`IE-006`) |

> [!note] Evolución
> No existen componentes de aplicación móvil ni servidor/ERP propios en esta fase. Cualquier ampliación futura deberá registrarse mediante nuevos objetivos y ADRs tras validar [[PA-016]].
