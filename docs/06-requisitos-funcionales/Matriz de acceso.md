---
id: DOC-MAT-ACC-001
tipo: matriz
titulo: Matriz de acceso y visibilidad pública de la web
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Matriz de acceso

En la Fase 1 la web es **100 % pública y sin autenticación de usuarios finales**. El acceso de administración editorial queda restringido al repositorio de contenidos y flujo de publicación del equipo de MBL ([[PA-011]]).

| Recurso / Ruta | Visitante web ([[ACT-001]], [[ACT-002]], [[ACT-003]]) | Rastreadores ([[ACT-005]]) | Equipo MBL ([[ACT-004]]) |
|---|---|---|---|
| Portada (`/`) y Servicios (`/*-en-asturias/`) | Lectura pública | Indexable (`index, follow`) | Edición en fuente ([[PA-011]]) |
| Portfolio (`/proyectos/`) | Lectura y filtrado público | Indexable (`index, follow`) | Alta / edición |
| Blog (`/innovacion-sostenible/` y artículos) | Lectura pública | Indexable (`index, follow`) | Redacción / actualización |
| Simulador (`/calcula-el-precio-de-tu-reforma-en-asturias/`) | Uso interactivo + envío de lead | Indexable (`index, follow`) | Recepción de leads |
| Contacto (`/contacto/`) | Lectura NAP + envío de lead | Indexable (`index, follow`) | Recepción de leads |
| Confirmación (`/mensaje-enviado/`) | Lectura tras envío de formulario | Excluido (`noindex, nofollow`) | — |
| Legales (`/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`) | Lectura pública + gestión cookies | Indexable o no prioritario según [[RNF-SEO-002]] | Actualización legal |
| Landings locales (`/reformas-gijon/`, etc., si se aprueban en [[PA-008]]) | Lectura pública | Indexable (`index, follow`) | Edición |
| Taxonomías heredadas `/tag/*` y `/author/3fwu9/` | No accesibles (respuesta `410`/`301`) | Excluidas de sitemap (`410`/`301`) | — |
| Acceso externo Webmail | Enlace externo opcional ([[PA-006]]) | No aplica | Autenticación externa |
