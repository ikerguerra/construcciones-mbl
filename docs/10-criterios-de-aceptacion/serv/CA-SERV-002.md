---
id: CA-SERV-002
tipo: ca
titulo: Control de vigencia promocional y soporte de landings locales
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-SERV-003]]"
  - "[[RF-SERV-004]]"
---

# CA-SERV-002 — Control de vigencia promocional y soporte de landings locales

```gherkin
Característica: Vigencia de ofertas y escalabilidad geográfica en Asturias
  Escenario: Evitar fechas promocionales caducadas en producción
    Dado que una promoción de cambio de bañera por plato de ducha tiene fecha_fin vencida respecto a la compilación
    Cuando se compila el sitio web
    Entonces el sistema no muestra texto de oferta caducada como "válida hasta 1 de Octubre 2026" y presenta la tarifa o aviso vigente configurado

  Escenario: Plantilla diferenciada para páginas locales de Asturias
    Dado que se habilitan páginas locales para Gijón, Oviedo o Avilés
    Cuando se renderiza cada landing municipal
    Entonces incluye información específica del municipio, proyectos cercanos y marcado geográfico propio sin texto duplicado
```
