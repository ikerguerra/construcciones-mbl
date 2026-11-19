---
id: CA-LEAD-003
tipo: ca
titulo: Canales directos de llamada/WhatsApp y medición bajo consentimiento
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-LEAD-003]]"
  - "[[RF-LEAD-005]]"
---

# CA-LEAD-003 — Canales directos de llamada/WhatsApp y medición bajo consentimiento

```gherkin
Característica: Contacto directo y analítica subordinada a consentimiento
  Escenario: Funcionamiento de enlaces directos sin consentimiento analítico
    Dado que un visitante rechaza las cookies analíticas y de marketing
    Cuando pulsa en "tel:+34684675898" o en "https://wa.me/34684675898"
    Entonces los enlaces funcionan con normalidad y no se instalan cookies analíticas ni se envían identificadores personales sin permiso

  Escenario: Medición de conversiones tras aceptación de analítica
    Dado que un visitante acepta la categoría de analítica en el banner de consentimiento
    Cuando envía un formulario o pulsa los canales directos de contacto
    Entonces el sistema emite el evento correspondiente hacia la capa de medición configurada
```
