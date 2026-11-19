---
id: CA-LEAD-002
tipo: ca
titulo: Envío fiable de formularios, aviso RGPD en español y recuperación ante fallo
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-LEAD-002]]"
  - "[[RF-LEAD-004]]"
---

# CA-LEAD-002 — Envío fiable de formularios, aviso RGPD en español y recuperación ante fallo

```gherkin
Característica: Captación de formularios de contacto y simulador
  Escenario: Validación, privacidad en español y envío exitoso
    Dado que el visitante completa el formulario en "/contacto/" o en el simulador
    Cuando intenta enviar sin marcar la casilla RGPD o con un email inválido
    Entonces el sistema bloquea el envío mostrando el mensaje de error en español junto al campo correspondiente
    Y el texto informativo de tratamiento de datos aparece íntegramente en español (sin textos en inglés)
    Cuando corrige los datos y envía con éxito
    Entonces el sistema entrega el lead a la interfaz configurada y muestra confirmación clara

  Escenario: Plan de respaldo ante error de red o servidor
    Dado que el servicio receptor de formularios devuelve error temporal
    Cuando el usuario pulsa enviar
    Entonces el sistema informa del fallo sin borrar los datos escritos y muestra enlace directo al teléfono "684 675 898" y WhatsApp
```
