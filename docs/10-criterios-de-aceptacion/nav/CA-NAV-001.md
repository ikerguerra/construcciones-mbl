---
id: CA-NAV-001
tipo: ca
titulo: Navegación principal y pie de página corporativo consistente
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-NAV-001]]"
  - "[[RF-NAV-004]]"
---

# CA-NAV-001 — Navegación principal y pie de página corporativo consistente

```gherkin
Característica: Navegación global y pie de página de Construcciones MBL
  Escenario: Acceso a servicios y teléfono desde cabecera en escritorio y móvil
    Dado que el visitante carga cualquier página pública del sitio
    Cuando inspecciona la cabecera superior de navegación
    Entonces visualiza las píldoras de navegación hacia Inicio, Servicios, Proyectos, Innovación Sostenible y Contacto
    Y dispone del enlace directo al teléfono "684 675 898" y del CTA "Calcula tu reforma"
    Y en ancho inferior o igual a 900px el menú móvil se despliega y cierra mediante teclado

  Escenario: Integridad de datos NAP y accesos legales en el pie de página
    Dado que el visitante desplaza la página hasta el bloque oscuro del pie de página
    Cuando revisa los datos corporativos y enlaces legales
    Entonces encuentra la dirección "Av. Argentina 132 (Cristasa of. 221), 33213 Gijón, Asturias"
    Y visualiza enlaces operativos hacia Aviso Legal, Política de Privacidad, Política de Cookies y configuración de consentimiento
```
