---
id: DOC-GUI-003
tipo: guia
titulo: Especificación técnica — Suite de calculadoras interactivas y SEO local (Asturias)
estado: vigente
creado: 2026-11-22
actualizado: 2026-11-22
---

# Especificación Técnica: Suite de Herramientas Interactivas y SEO Local (Reformas y Construcción en Asturias)

> **Propósito del documento:** Blueprint ejecutable para desarrollo asistido por IA (Antigravity / Vibe Coding). Define arquitectura, datos verificados (vigentes a ejercicio 2026), fórmulas matemáticas deterministas, reglas legales/fiscales, SEO programático y batería de tests unitarios obligatorios.

## 1. Principios de Arquitectura para la Implementación

Para garantizar fiabilidad total en los cálculos y un posicionamiento SEO óptimo, el agente debe seguir estrictamente estas reglas:

1. **Separación de lógica y vista:** Ninguna fórmula matemática debe vivir dentro de componentes React/UI. Toda lógica de negocio debe implementarse como **funciones puras en TypeScript** dentro de `src/lib/calculators/`.

2. **Constantes externas y auditables:** Todos los datos fiscales (ICIO, IVA, IRPF), precios de referencia y factores energéticos deben centralizarse en `src/data/` con fecha de última verificación (`lastVerified: "2026-11"`), permitiendo actualizaciones rápidas si cambian ordenanzas o prórrogas estatales.

3. **Renderizado SEO-First:** Todas las páginas de calculadoras y rutas programáticas de concejos deben renderizarse en servidor (SSR/SSG) con metadatos dinámicos, JSON-LD estructurado y contenido semántico complementario debajo de la herramienta interactiva.

4. **Interconexión por URL (Query Params):** Todas las calculadoras deben leer parámetros iniciales desde la URL y generar enlaces cruzados hacia las demás pasando el estado actual del usuario (`concejo`, `m2`, `pem`, `tipoObra`, etc.).

5. **Validación por Tests:** Antes de dar por finalizada la tarea, el agente debe generar y ejecutar tests unitarios (`vitest` o `jest`) que validen exactamente los casos de prueba definidos en la **Sección 8**.

### Estructura de Directorios Sugerida

```
src/
├── data/
│   ├── asturiasConcejos.ts      # Dataset verificado: 18 concejos + fallback (ICIO 2026, Zona CTE)
│   ├── budgetPricing.ts         # Precios base/m², multiplicadores, partidas opcionales, plazos
│   ├── taxRules.ts              # Reglas AEAT: IVA 10%/21%, tramos IRPF eficiencia energética
│   └── energyRates.ts           # Tarifas energía 2026, rendimientos calderas y SCOP aerotermia
├── lib/
│   └── calculators/
│       ├── budgetEngine.ts      # Motor Módulo 1: Presupuesto integral + PEM + ICIO + IVA
│       ├── licenseEngine.ts     # Motor Módulo 2: Clasificador TROTU + ICIO + Tasa orientativa
│       ├── irpfEngine.ts        # Motor Módulo 3: Deducciones IRPF 20%/40%/60% + Coste neto
│       ├── aerotermiaEngine.ts  # Motor Módulo 4: Comparador calefacción en clima asturiano
│       └── urlState.ts          # Serializador/deserializador de query params entre herramientas
├── components/
│   └── tools/
│       ├── BudgetCalculator.tsx
│       ├── LicenseSimulator.tsx
│       ├── IrpfCalculator.tsx
│       ├── AerotermiaComparator.tsx
│       └── LeadCaptureModal.tsx # Descarga de informe/PDF + checklist por concejo
├── app/ (o pages/)
│   ├── calculadora-presupuesto-reforma/page.tsx
│   ├── licencia-obra-asturias/
│   │   ├── page.tsx             # Hub general de licencias
│   │   └── [concejo]/page.tsx   # SEO Programático (ej: /licencia-obra-asturias/oviedo)
│   ├── calculadora-deducciones-irpf-reforma/page.tsx
│   └── comparador-aerotermia-asturias/page.tsx
└── __tests__/
    └── calculators.test.ts      # Tests unitarios obligatorios (Sección 8)

```

## 2. Dataset Verificado: Concejos de Asturias (`src/data/asturiasConcejos.ts`)

### Verificación de Datos (Ejercicio 2026)

* **Tipos de gravamen del ICIO:** Verificados según ordenanzas fiscales vigentes en 2026 y datos del Ministerio de Hacienda (tope legal estatal del $4\%$ según art. 103.2 del Real Decreto Legislativo 2/2004, TRLRHL).

* **Zonas Climáticas CTE (DB-HE, Anejo B para Asturias):**

  * Altitud $\le 50\text{ m}$: Zona **C1** (costa).

  * Altitud $51\text{–}550\text{ m}$: Zona **D1** (interior y valles centrales).

  * Altitud $> 550\text{ m}$: Zona **E1** (montaña).

```
export type ClimateZoneCTE = 'C1' | 'D1' | 'E1';

export interface ConcejoAsturias {
  slug: string;
  name: string;
  icioRate: number;           // Porcentaje en decimal (ej. 0.04 = 4.00%)
  climateZone: ClimateZoneCTE;
  avgAltitudeM: number;       // Altitud orientativa de la capital del concejo
  estimatedLicenseFeeRange: [number, number]; // Tasa administrativa orientativa (€)
  allowsSolarIcioBonus: boolean; // Posible bonificación potestativa art. 103.2 TRLRHL
  logisticsFactor: number;    // Factor logístico obra (1.00 área central, 1.04-1.08 alas/montaña)
}

export const ASTURIAS_CONCEJOS: ConcejoAsturias[] = [
  { slug: 'oviedo', name: 'Oviedo', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 231, estimatedLicenseFeeRange: [60, 450], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'gijon', name: 'Gijón', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 10, estimatedLicenseFeeRange: [65, 480], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'aviles', name: 'Avilés', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 20, estimatedLicenseFeeRange: [55, 400], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'siero', name: 'Siero', icioRate: 0.038, climateZone: 'D1', avgAltitudeM: 217, estimatedLicenseFeeRange: [50, 380], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'langreo', name: 'Langreo', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 212, estimatedLicenseFeeRange: [50, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'mieres', name: 'Mieres', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 206, estimatedLicenseFeeRange: [50, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'castrillon', name: 'Castrillón', icioRate: 0.0399, climateZone: 'C1', avgAltitudeM: 35, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.01 },
  { slug: 'san-martin-del-rey-aurelio', name: 'San Martín del Rey Aurelio', icioRate: 0.0329, climateZone: 'D1', avgAltitudeM: 250, estimatedLicenseFeeRange: [45, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'corvera-de-asturias', name: 'Corvera de Asturias', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 67, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.01 },
  { slug: 'villaviciosa', name: 'Villaviciosa', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 10, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'llanes', name: 'Llanes', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 11, estimatedLicenseFeeRange: [50, 400], allowsSolarIcioBonus: true, logisticsFactor: 1.06 },
  { slug: 'llanera', name: 'Llanera', icioRate: 0.0364, climateZone: 'D1', avgAltitudeM: 175, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'carreno', name: 'Carreño', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [45, 320], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'gozon', name: 'Gozón', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [45, 320], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'grado', name: 'Grado', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 62, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'navia', name: 'Navia', icioRate: 0.032, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.07 },
  { slug: 'cangas-de-onis', name: 'Cangas de Onís', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 64, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.05 },
  { slug: 'cangas-del-narcea', name: 'Cangas del Narcea', icioRate: 0.03, climateZone: 'D1', avgAltitudeM: 376, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.08 },
  { slug: 'otro-asturias', name: 'Otro concejo de Asturias', icioRate: 0.035, climateZone: 'D1', avgAltitudeM: 250, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.04 }
];

```

> **Nota para zonas de alta montaña:** En el comparador energético (Módulo 4), añadir un checkbox opcional *"La vivienda está a más de 550 m de altitud (zona de montaña)"* que sobrescriba `climateZone` a `'E1'` independientemente de la altitud media de la capital del concejo.

## 3. Módulo 1: Calculadora de Presupuestos v2 (`budgetEngine.ts`)

Mejora la calculadora existente manteniendo los campos y partidas opcionales actuales de la empresa, pero incorporando variables reales de obra en Asturias, cálculo automático del **PEM**, **ICIO real por concejo**, **IVA correcto (10% vs 21%)**, desglose por partidas y plazo en semanas.

### 3.1 Inputs del Formulario (Flujo Multi-Step de 3 pasos)

* **Paso 1 — El Inmueble y Alcance:**

  * `reformType`: `'integral' | 'parcial_cocina_banos' | 'rehabilitacion_casa_piedra' | 'obra_nueva' | 'local_comercial'`

  * `concejoSlug`: string (selector conectado a `ASTURIAS_CONCEJOS`)

  * `areaM2`: number (rango validado: $15\text{–}1000\text{ m}^2$)

  * `propertyType`: `'piso_con_ascensor' | 'piso_sin_ascensor' | 'casa_pueblo' | 'chalet_independiente' | 'local'`

* **Paso 2 — Calidades, Patologías y Partidas Opcionales:**

  * `quality`: `'basica' | 'media' | 'alta_premium'`

  * `pathologies`: array opcional (`'humedades_capilaridad' | 'rehabilitacion_cubierta' | 'refuerzo_estructural'`)

  * `optionalPackages`: array con las partidas frecuentes existentes:

    * `proyecto_tecnico`: Proyecto arquitectónico, geotécnico y dirección técnica ($+12.000\text{ €} \text{ a } 19.500\text{ €}$, **sin IVA**, tributa siempre al $21\%$).

    * `aerotermia_recuperacion`: Climatización aerotérmica + recuperación de calor ($+11.000\text{ €} \text{ a } 17.500\text{ €}$, **sin IVA**).

    * `cierre_solera_porche`: Cierre de parcela, solera exterior y porche ($+9.500\text{ €} \text{ a } 18.000\text{ €}$, **sin IVA**).

* **Paso 3 — Perfil Fiscal (para estimación exacta de IVA):**

  * `clientType`: `'particular_vivienda_habitual' | 'inversor_alquiler_o_empresa'`

  * `buildingOlderThan2Years`: boolean (si aplica a reforma)

  * `contractorMaterialsUnder40Pct`: boolean (por defecto `true` con tooltip explicativo de la regla del $40\%$ de la AEAT; no aplica en obra nueva/rehabilitación estructural que va al $10\%$).

### 3.2 Tabla de Precios Base y Multiplicadores (`src/data/budgetPricing.ts`)

*(Precios de ejecución por contrata en Asturias, sin IVA, ajustables desde el archivo de configuración por la empresa)*:

| `reformType` | Base Mín ($\text{€/m}^2$) | Base Máx ($\text{€/m}^2$) | Plazo base (semanas) | Semanas extra cada $50\text{ m}^2$ | 
| ----- | ----- | ----- | ----- | ----- | 
| `parcial_cocina_banos` | 420 | 560 | 4 | +1.0 | 
| `integral` | 750 | 900 | 8 | +2.0 | 
| `rehabilitacion_casa_piedra` | 950 | 1.250 | 14 | +3.0 | 
| `obra_nueva` | 1.350 | 1.650 | 24 | +4.0 | 
| `local_comercial` | 550 | 780 | 6 | +1.5 | 

* **Multiplicador de Calidad (`qualityMult`):**

  * `basica`: `0.88`

  * `media`: `1.00`

  * `alta_premium`: `1.22`

* **Multiplicador de Inmueble y Logística de Obra (`propertyMult`):**

  * `piso_con_ascensor`: `1.00`

  * `piso_sin_ascensor`: `1.06` (sobrecoste acarreo y desescombro manual)

  * `casa_pueblo`: `1.08` (accesos estrechos, consolidación)

  * `chalet_independiente`: `1.03`

  * `local`: `0.98`

* **Recargos por Patologías en Asturias (sin IVA):**

  * `humedades_capilaridad`: $+[2.500\text{ €}, 5.500\text{ €}]$ (barrera de inyecciones/mortero macroporoso + drenaje perimetral).

  * `rehabilitacion_cubierta`: $+[120\text{ €}, 190\text{ €}] \times \text{Superficie Cubierta Estimada}$ (donde si no se especifica cubierta, usar $\text{areaM2} \times 0.75$ en vivienda de 1-2 plantas).

  * `refuerzo_estructural`: $+[4.500\text{ €}, 11.000\text{ €}]$.

### 3.3 Fórmulas Exactas de Cálculo

1. **Coste de Obra Base (sin IVA):**
   

   $$
   \text{ObraBase}_{\min/\max} = \text{areaM2} \times \text{PrecioBase}_{\min/\max} \times \text{qualityMult} \times \text{propertyMult} \times \text{concejo.logisticsFactor}
   $$

2. **Subtotal de Ejecución de Obra (sin IVA, sin honorarios técnicos):**
   

   $$
   \text{SubtotalObra}_{\min/\max} = \text{ObraBase}_{\min/\max} + \text{Patologías}_{\min/\max} + \text{OpcionalesObra}_{\min/\max}
   $$

   
   *(Donde `OpcionalesObra` incluye `aerotermia_recuperacion` y `cierre_solera_porche`, pero **NO** `proyecto_tecnico`).*

3. **Estimación del PEM (Presupuesto de Ejecución Material — Base Imponible del ICIO):**
   Según el Art. 102 del TRLRHL, el ICIO se liquida sobre el coste real y efectivo (PEM), excluyendo IVA, honorarios de proyecto y el $19\%$ estándar de Gastos Generales ($13\%$) y Beneficio Industrial ($6\%$):
   

   $$
   \text{PEM}_{\min/\max} = \frac{\text{SubtotalObra}_{\min/\max}}{1.19}
   $$

4. **Cálculo del ICIO Municipal:**
   

   $$
   \text{ICIO}_{\min/\max} = \text{round}\left(\text{PEM}_{\min/\max} \times \text{concejo.icioRate}\right)
   $$

5. **Regla de IVA (Art. 91 Ley 37/1992 del IVA — AEAT):**

   * **IVA Obra (`ivaObraRate`):**

     * Es `0.10` ($10\%$) si:

       * `reformType === 'obra_nueva'` o `reformType === 'rehabilitacion_casa_piedra'` (si `clientType === 'particular_vivienda_habitual'`), **O**

       * `reformType` es reforma de vivienda (`integral` o `parcial_cocina_banos`) **Y** `clientType === 'particular_vivienda_habitual'` **Y** `buildingOlderThan2Years === true` **Y** `contractorMaterialsUnder40Pct === true`.

     * En cualquier otro caso (local comercial, inversor/alquiler, vivienda $< 2$ años, o materiales $> 40\%$): es `0.21` ($21\%$).

   * **IVA Honorarios Técnicos (`ivaTechRate`):** Siempre `0.21` ($21\%$) sobre `proyecto_tecnico`.

6. **Totales Finales (Llave en mano estimado):**
   

   $$
   \text{IVA}_{\min/\max} = \left(\text{SubtotalObra}_{\min/\max} \times \text{ivaObraRate}\right) + \left(\text{Honorarios}_{\min/\max} \times 0.21\right)
   $$

   $$
   \text{TotalEstimado}_{\min/\max} = \text{SubtotalObra}_{\min/\max} + \text{Honorarios}_{\min/\max} + \text{IVA}_{\min/\max} + \text{ICIO}_{\min/\max}
   $$

   
   *(La tasa administrativa de licencia se muestra como partida informativa aparte usando `concejo.estimatedLicenseFeeRange`).*

7. **Desglose Orientativo por Partidas (para gráfico de barras):**
   Para `integral`: Albañilería y demoliciones ($30\%$), Instalaciones fontanería/electricidad/clima ($24\%$), Carpintería y ventanas ($18\%$), Revestimientos, suelos y pintura ($18\%$), Cocina/baños y sanitarios ($10\%$).

8. **Estrategia de Conversión (Lead Magnet sin fricción):**

   * Mostrar la horquilla total, el desglose visual, el ICIO del concejo y las semanas estimadas **directamente en pantalla** sin pedir registro previo.

   * Botón principal bajo el resultado: **"Descargar presupuesto detallado en PDF + Checklist de permisos en {concejo.name}"** $\rightarrow$ abre `LeadCaptureModal` pidiendo Nombre, Email y/o Teléfono (WhatsApp).

## 4. Módulo 2: Asistente de Licencias de Obra e ICIO en Asturias (`licenseEngine.ts`)

Herramienta diseñada para **SEO Programático** por concejo (`/licencia-obra-asturias/[concejo]`).

### 4.1 Base Legal (Principado de Asturias)

Basado en el **TROTU** (Decreto Legislativo 1/2004, de 22 de abril, artículos 228 y 228 bis, régimen de declaración responsable y licencias urbanísticas en Asturias).

### 4.2 Inputs

* `concejoSlug`: preseleccionado automáticamente si viene de ruta programática.

* `workCategory`:

  1. `estetica_interior`: Pintura, acuchillado de parqué, cambio de sanitarios o muebles de cocina sin tocar instalaciones generales ni tabiques.

  2. `reforma_sin_distribucion`: Cambio de suelos, alicatados, renovación de fontanería/electricidad o cambio de ventanas **sin variar huecos ni estética de fachada**.

  3. `reforma_con_tabiques`: Tirar o levantar tabiques (modificación de distribución interior) sin afectar estructura ni elementos comunes.

  4. `fachada_cubierta_estructura`: Reforma de tejado/cubierta con modificación estructural, aislamiento SATE en fachada, apertura de huecos o refuerzos estructurales.

  5. `cierre_parcela`: Cierre de finca no colindante con dominio público vs. colindante con carretera/dominio público.

  6. `obra_nueva_ampliacion`: Vivienda unifamiliar nueva, porche cerrado o ampliación de volumen/superficie edificada.

* `isProtectedBuilding`: boolean (*"¿Está el edificio catalogado, en casco histórico o afectado por Patrimonio Cultural?"*).

* `occupiesPublicWay`: boolean (*"¿Requiere andamio, grúa o contenedor en vía pública?"*).

* `estimatedBudgetNoVat`: number (Presupuesto de ejecución sin IVA).

### 4.3 Árbol de Decisión Determinista

```
export type PermitType =
  | 'DECLARACION_RESPONSABLE'
  | 'LICENCIA_OBRA_MENOR'
  | 'LICENCIA_OBRA_MAYOR';

export interface LicenseResult {
  permitType: PermitType;
  requiresArchitectProject: boolean;
  requiresSiteManagement: boolean; // Dirección de obra / ejecución
  estimatedResolutionDays: string;
  pemEstimated: number;
  icioAmount: number;
  icioRatePercent: number;
  estimatedFeeRange: [number, number];
  extraPermits: string[];
  requiredDocuments: string[];
  legalNote: string;
}

```

**Reglas de clasificación:**

1. Si `isProtectedBuilding === true` **O** `workCategory === 'obra_nueva_ampliacion'` **O** `workCategory === 'fachada_cubierta_estructura'`:

   * $\rightarrow$ `LICENCIA_OBRA_MAYOR`

   * `requiresArchitectProject = true`, `requiresSiteManagement = true`.

   * Plazo legal supletorio: *"Hasta 3 meses (art. 21.3 Ley 39/2015); en la práctica 2–5 meses según concejo"*.

2. Si `workCategory === 'reforma_con_tabiques'`:

   * $\rightarrow$ `LICENCIA_OBRA_MENOR` (con memoria técnica o certificado de técnico competente que acredite no afección estructural, según ordenanza municipal).

   * `requiresArchitectProject = false` (salvo alteración sustancial de habitabilidad/distribución que exija proyecto), `requiresSiteManagement = false`.

   * Plazo: *"15–45 días hábiles según concejo"*.

3. Si `workCategory` es `estetica_interior`, `reforma_sin_distribucion`, o `cierre_parcela` (sin colindancia con dominio público):

   * $\rightarrow$ `DECLARACION_RESPONSABLE` (Art. 228 bis TROTU).

   * `requiresArchitectProject = false`, `requiresSiteManagement = false`.

   * Plazo: *"Inicio inmediato desde el registro de entrada y pago de autoliquidación"*.

4. **Permisos adicionales automáticos (`extraPermits`):**

   * Si `occupiesPublicWay === true`: añadir *"Permiso y tasa de ocupación de vía pública (contenedor de escombros / andamio)"*.

   * Si `isProtectedBuilding === true`: añadir *"Informe favorable de la Consejería de Cultura / Patrimonio Cultural del Principado de Asturias"*.

   * Siempre en reformas con derribos: añadir *"Estudio y gestión de residuos de construcción y demolición (RCD) + fianza municipal si aplica"*.

5. **Cálculo de ICIO en el Simulador:**
   

   $$
   \text{PEM} = \frac{\text{estimatedBudgetNoVat}}{1.19}, \quad \text{ICIO} = \text{round}(\text{PEM} \times \text{concejo.icioRate})
   $$

   
   *(Añadir nota aclaratoria: el usuario puede activar un toggle "Mi cifra ya es PEM" para no dividir por* $1.19$*).*

## 5. Módulo 3: Calculadora de Deducciones IRPF por Eficiencia Energética (`irpfEngine.ts`)

### 5.1 Marco Legal Verificado (AEAT — Disposición Adicional 50ª LIRPF, Vigente 2026)

| Nivel / Actuación | Requisitos Técnicos (CEE previo y posterior) | % Deducción | Base Máx. Anual | Base Máx. Total | Ahorro Máx. | Plazo Obra y Certificado (Configurable) | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **`demanda_7`** (Vivienda individual) | Reducción $\ge 7\%$ demanda calefacción y refrigeración (ej. ventanas PVC/Aluminio RPT, aislamiento interior) | $20\%$ | $5.000\text{ €}$ | $5.000\text{ €}$ | $1.000\text{ €}$ | Hasta **31/12/2026** (CEE antes 01/01/2027) | 
| **`energia_30_o_AB`** (Vivienda individual) | Reducción $\ge 30\%$ consumo energía primaria no renovable **o** calificación energética **A o B** (ej. aerotermia, placas + envolvente) | $40\%$ | $7.500\text{ €}$ | $7.500\text{ €}$ | $3.000\text{ €}$ | Hasta **31/12/2026** (CEE antes 01/01/2027) | 
| **`rehabilitacion_edificio_60`** (Edificio completo o vivienda unifamiliar) | Reducción $\ge 30\%$ energía primaria no renovable **o** calificación **A o B** de todo el edificio/vivienda unifamiliar (ej. SATE + cubierta + aerotermia) | $60\%$ | $5.000\text{ €}/\text{año}$ | $15.000\text{ €}$ (en hasta 4 ejercicios) | $9.000\text{ €}$ | Hasta **31/12/2027** (CEE antes 01/01/2028) | 

> **IMPORTANTE (`src/data/taxRules.ts`):** Guardar las fechas límite (`2026-12-31` y `2027-12-31`) como constantes configurables. Mostrar un banner informativo recordando que los plazos están sujetos a posibles prórrogas por Real Decreto-ley.

### 5.2 Reglas de Validación y Fórmulas

* **Inputs:**

  * `investmentWithVat`: number (Importe pagado con IVA incluido: ejecución, equipos, honorarios técnicos y emisión de CEE).

  * `publicSubsidies`: number (Subvenciones recibidas o concedidas para la misma obra, ej. fondos Next Generation / Principado).

  * `deductionTier`: `'demanda_7' | 'energia_30_o_AB' | 'rehabilitacion_edificio_60'`

  * `paidByBankOrCard`: boolean (obligatorio `true`; **pagos en efectivo = 0 € de deducción**).

  * `includesFossilFuelBoiler`: boolean (los equipos de combustibles fósiles **no son deducibles**; mostrar alerta si se marca `true`).

* **Fórmulas Deterministas:**

  1. **Base Elegible Neta** (se descuentan subvenciones públicas):
     

     $$
     \text{BaseNeta} = \max\left(0,\; \text{investmentWithVat} - \text{publicSubsidies}\right)
     $$

  2. **Si `paidByBankOrCard === false`**: retornar deducción $= 0\text{ €}$ con aviso legal explicativo.

  3. **Base Deducible Aplicable:**
     

     $$
     \text{BaseAplicable} = \min\left(\text{BaseNeta},\; \text{maxTotalBase}[\text{deductionTier}]\right)
     $$

  4. **Deducción Total IRPF:**
     

     $$
     \text{DeducciónTotal} = \text{round}\left(\text{BaseAplicable} \times \text{rate}[\text{deductionTier}]\right)
     $$

  5. **Calendario de Deducción Anual (especialmente relevante para el tramo del** $60\%$**):**

     * En tramos $20\%$ y $40\%$: se aplica íntegramente en el ejercicio fiscal de expedición del CEE posterior.

     * En tramo $60\%$: la base anual tiene tope de $5.000\text{ €}$. El exceso no aplicado se traslada a los **4 ejercicios siguientes** con un máximo acumulado total de $15.000\text{ €}$ de base:

       * Para cada año $i \in \{1, 2, 3, 4\}$ mientras quede `remainingBase > 0`:
         

         $$
         \text{baseAño}_i = \min(\text{remainingBase},\; 5000), \quad \text{deducciónAño}_i = \text{baseAño}_i \times 0.60
         $$

  6. **Coste Neto Real de la Obra:**
     

     $$
     \text{CosteNetoReal} = \text{investmentWithVat} - \text{publicSubsidies} - \text{DeducciónTotal}
     $$

## 6. Módulo 4: Comparador de Aerotermia vs. Sistema Actual en Asturias (`aerotermiaEngine.ts`)

Herramienta diseñada como puente directo hacia la partida opcional de **Climatización aerotérmica + recuperación de calor (**$11.000\text{ €}\text{–}17.500\text{ €}$**)** de la calculadora principal.

### 6.1 Parámetros Energéticos Verificados (`src/data/energyRates.ts` — Referencia España 2026)

*(Todos los precios deben ser editables por el usuario en un desplegable "Ajustar precios de energía" para máxima transparencia).*

```
export const ENERGY_DEFAULTS_2026 = {
  electricityPriceEurKwh: 0.18, // Media doméstica 2026 con impuestos (€/kWh)
  systems: {
    gasoil_convencional: {
      label: 'Caldera de gasóleo C (convencional)',
      fuelPrice: 1.15,         // €/litro (media anual 2026; rango 0.85–1.41 €/L)
      kwhPerUnit: 10.14,       // Poder calorífico gasóleo C (kWh/litro)
      efficiency: 0.90,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.311,  // Factor emisión oficial IDAE (kg CO2/kWh)
    },
    gas_natural_condensacion: {
      label: 'Caldera de gas natural (condensación)',
      fuelPrice: 0.08,         // €/kWh con impuestos (referencia 2026)
      kwhPerUnit: 1,
      efficiency: 0.95,
      fixedAnnualCostEur: 75,  // Término fijo anual aproximado (RL.2)
      co2KgPerKwhFuel: 0.252,
    },
    gas_natural_estandar: {
      label: 'Caldera de gas natural (>15 años)',
      fuelPrice: 0.08,
      kwhPerUnit: 1,
      efficiency: 0.85,
      fixedAnnualCostEur: 75,
      co2KgPerKwhFuel: 0.252,
    },
    radiadores_electricos: {
      label: 'Radiadores / emisores eléctricos',
      fuelPrice: 0.18,
      kwhPerUnit: 1,
      efficiency: 1.00,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.200,  // Mix eléctrico España orientativo
    },
    pellets: {
      label: 'Caldera o estufa de pellets',
      fuelPrice: 0.080,        // ~5.67 €/saco 15kg @ 4.76 kWh/kg
      kwhPerUnit: 1,
      efficiency: 0.88,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.018,
    },
  },
  aerotermiaSCOP: {
    suelo_radiante:          { C1: 4.0, D1: 3.7, E1: 3.3 },
    radiadores_baja_temp:    { C1: 3.5, D1: 3.2, E1: 2.9 },
    radiadores_alta_temp:    { C1: 3.0, D1: 2.7, E1: 2.5 },
  },
  // Demanda térmica útil estimada (kWh/m²·año) si el usuario NO sabe su gasto anual
  demandKwhM2Year: {
    mal_aislada:  { C1: 85,  D1: 110, E1: 140 },
    aislamiento_medio: { C1: 55,  D1: 70,  E1: 90 },
    bien_aislada: { C1: 30,  D1: 40,  E1: 50 },
  },
  aerotermiaAvgInvestmentEur: 14250, // Punto medio de la horquilla 11.000 € - 17.500 €
};

```

### 6.2 Fórmulas Físicas y Financieras

1. **Determinación de la Demanda Térmica Útil Anual (**$Q_{\text{útil}}$**, en** $\text{kWh/año}$**):**

   * **Modo A (Usuario introduce su gasto actual en calefacción** $G_{\text{actual}}$ **€/año — recomendado):**
     

     $$
     \text{CosteEnergía}_{\text{actual}} = \max(0,\; G_{\text{actual}} - \text{fixedAnnualCostEur})
     $$

     $$
     \text{PrecioKwhBruto} = \frac{\text{fuelPrice}}{\text{kwhPerUnit}}
     $$

     $$
     Q_{\text{útil}} = \left(\frac{\text{CosteEnergía}_{\text{actual}}}{\text{PrecioKwhBruto}}\right) \times \text{efficiency}
     $$

   * **Modo B (Usuario introduce superficie `areaM2` y nivel de aislamiento):**
     

     $$
     Q_{\text{útil}} = \text{areaM2} \times \text{demandKwhM2Year}[\text{insulation}][\text{climateZone}]
     $$

     $$
     G_{\text{actual}} = \left(\frac{Q_{\text{útil}}}{\text{efficiency}} \times \text{PrecioKwhBruto}\right) + \text{fixedAnnualCostEur}
     $$

2. **Consumo y Coste Anual con Aerotermia:**
   

   $$
   \text{ConsumoEléctrico}_{\text{aero}} = \frac{Q_{\text{útil}}}{\text{SCOP}[\text{emitterType}][\text{climateZone}]}
   $$

   $$
   G_{\text{aero}} = \text{ConsumoEléctrico}_{\text{aero}} \times \text{electricityPriceEurKwh}
   $$

3. **Ahorro Anual y Porcentaje:**
   

   $$
   \text{AhorroAnual} = G_{\text{actual}} - G_{\text{aero}}
   $$

   $$
   \text{PorcentajeAhorro} = \frac{\text{AhorroAnual}}{G_{\text{actual}}} \times 100
   $$

4. **Plazo de Amortización (Payback):**

   * **Sin deducciones:** $\text{Payback}_{\text{bruto}} = \frac{\text{InversiónAerotermia}}{\text{AhorroAnual}}$ (si $\text{AhorroAnual} > 0$).

   * **Con deducción IRPF (**$40\%$ **individual o** $60\%$ **unifamiliar):** calcular invocando directamente `calculateIrpfDeduction()` del Módulo 3 sobre `InversiónAerotermia` y recalcular $\text{Payback}_{\text{neto}} = \frac{\text{CosteNetoReal}}{\text{AhorroAnual}}$.

5. **Emisiones de** $\text{CO}_2$ **evitadas (kg/año):**
   

   $$
   \text{CO2}_{\text{actual}} = \left(\frac{Q_{\text{útil}}}{\text{efficiency}}\right) \times \text{co2KgPerKwhFuel}, \quad \text{CO2}_{\text{aero}} = \text{ConsumoEléctrico}_{\text{aero}} \times 0.200
   $$

   $$
   \text{CO2}_{\text{evitado}} = \max(0,\; \text{CO2}_{\text{actual}} - \text{CO2}_{\text{aero}})
   $$

## 7. Enlazado Interno, SEO Programático y UX

### 7.1 Deep Linking entre Herramientas (`src/lib/calculators/urlState.ts`)

Al completar cualquier herramienta, renderizar tarjetas de **"Siguiente paso recomendado"** con parámetros precargados:

* Desde **Simulador de Licencias** $\rightarrow$ `/calculadora-presupuesto-reforma?concejo=oviedo&ref=licencias`

* Desde **Comparador de Aerotermia** $\rightarrow$ `/calculadora-presupuesto-reforma?concejo=oviedo&m2=120&opt=aerotermia_recuperacion`

* Desde **Calculadora de Presupuestos** (si el usuario marcó aerotermia o rehabilitación) $\rightarrow$ `/calculadora-deducciones-irpf-reforma?inversion=14250&tipo=energia_30_o_AB`

### 7.2 SEO Programático para Licencias e ICIO (`/licencia-obra-asturias/[concejo]`)

Generar páginas estáticas (`generateStaticParams`) para los 18 concejos verificados de `ASTURIAS_CONCEJOS`. Cada página debe incluir:

* **Title:** `Licencia de Obra e ICIO en {Concejo} (2026) | Calculadora Gratis`

* **H1:** `Calculadora de Licencia de Obra e ICIO en {Concejo} (2026)`

* **Meta Description:** `Calcula el ICIO en {Concejo} ({icioRate*100}% en 2026) y descubre en 30 segundos si tu reforma necesita Declaración Responsable, Obra Menor u Obra Mayor.`

* **Bloque editorial bajo la herramienta (500–700 palabras dinámicas):**

  * Tabla resumen con el tipo de ICIO vigente en `{Concejo}`, base imponible (PEM) y zona climática CTE (`C1/D1/E1`).

  * Explicación de cuándo aplica la Declaración Responsable en Asturias (art. 228 bis TROTU).

  * Bloque de **4 preguntas frecuentes (FAQ)** con datos locales y Schema `FAQPage`.

### 7.3 Datos Estructurados (JSON-LD Obligatorio)

Cada página de herramienta debe inyectar en `<head>`:

1. `WebApplication` (con `applicationCategory: "FinanceApplication"` o `"UtilitiesApplication"`, `operatingSystem: "All"`, `offers: { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }`).

2. `FAQPage` con las preguntas frecuentes visibles en la página.

3. `HomeAndConstructionBusiness` con `areaServed: "Principado de Asturias"`.

### 7.4 Disclaimers Legales Obligatorios (UI)

Incluir siempre al pie de los resultados un aviso discreto pero claro:

> *"Cálculo orientativo basado en normativa estatal y ordenanzas municipales verificadas en 2026. No constituye presupuesto contractual ni asesoramiento fiscal vinculante. Las tasas administrativas, bonificaciones municipales de ICIO y requisitos finales dependen de la revisión técnica del inmueble y de la normativa vigente en la fecha de solicitud."*

## 8. Batería de Tests Unitarios Obligatorios (`src/__tests__/calculators.test.ts`)

El agente de Antigravity debe implementar exactamente estos tests y asegurarse de que **todos pasen al 100%** antes de finalizar:

### Test 1 — Presupuesto Integral + Aerotermia + Proyecto Técnico en Siero (IVA mixto)

* **Input:**

  * `concejoSlug: 'siero'` (`icioRate: 0.038`, `logisticsFactor: 1.00`)

  * `reformType: 'integral'` (Base `750 - 900 €/m²`)

  * `areaM2: 100`, `quality: 'media'` (`1.00`), `propertyType: 'piso_con_ascensor'` (`1.00`)

  * `pathologies: []`

  * `optionalPackages: ['aerotermia_recuperacion', 'proyecto_tecnico']`

  * `clientType: 'particular_vivienda_habitual'`, `buildingOlderThan2Years: true`, `contractorMaterialsUnder40Pct: true`

* **Expected Output:**

  * `subtotalObraMin`: `86000` ($75.000 + 11.000$)

  * `subtotalObraMax`: `107500` ($90.000 + 17.500$)

  * `honorariosMin`: `12000`, `honorariosMax`: `19500`

  * `pemMin`: `72269` ($\text{round}(86000 / 1.19)$), `pemMax`: `90336` ($\text{round}(107500 / 1.19)$)

  * `icioMin`: `2746` ($\text{round}(72268.91 \times 0.038)$), `icioMax`: `3433` ($\text{round}(90336.13 \times 0.038)$)

  * `ivaObraRate`: `0.10` (`ivaObraMin: 8600`, `ivaObraMax: 10750`)

  * `ivaHonorariosMin`: `2520` ($12000 \times 0.21$), `ivaHonorariosMax`: `4095` ($19500 \times 0.21$)

  * `totalMin`: `111866`, `totalMax`: `145278`

### Test 2 — Regla IVA 21% en Local Comercial

* **Input:** Mismo concejo (`oviedo`), `reformType: 'local_comercial'`, `clientType: 'inversor_alquiler_o_empresa'`.

* **Expected Output:** `ivaObraRate === 0.21`.

### Test 3 — Simulador de Licencias (TROTU Asturias)

* **Caso 3A:** `concejoSlug: 'oviedo'`, `workCategory: 'reforma_sin_distribucion'`, `isProtectedBuilding: false`, `estimatedBudgetNoVat: 23800`.

  * **Expected:** `permitType: 'DECLARACION_RESPONSABLE'`, `requiresArchitectProject: false`, `pemEstimated: 20000`, `icioAmount: 800` ($4\%$).

* **Caso 3B:** Misma obra pero `isProtectedBuilding: true`.

  * **Expected:** `permitType: 'LICENCIA_OBRA_MAYOR'`, `requiresArchitectProject: true`, `extraPermits` incluye Patrimonio Cultural.

### Test 4 — Calculadora Deducciones IRPF (Tramos 40% y 60% + Regla Efectivo)

* **Caso 4A (40% con subvención):** `investmentWithVat: 14000`, `publicSubsidies: 3000`, `deductionTier: 'energia_30_o_AB'`, `paidByBankOrCard: true`.

  * **Expected:** `baseNeta: 11000`, `baseAplicable: 7500`, `deduccionTotal: 3000`, `costeNetoReal: 8000`.

* **Caso 4B (60% plurianual):** `investmentWithVat: 16000`, `publicSubsidies: 0`, `deductionTier: 'rehabilitacion_edificio_60'`, `paidByBankOrCard: true`.

  * **Expected:** `baseAplicable: 15000`, `deduccionTotal: 9000`, `costeNetoReal: 7000`, `yearlySchedule`: 3 años de `3000 €` cada uno (`[3000, 3000, 3000]`).

* **Caso 4C (Pago en efectivo):** `paidByBankOrCard: false`.

  * **Expected:** `deduccionTotal: 0`, alerta de invalidez activa.

### Test 5 — Comparador Aerotermia en Oviedo (Zona D1) vs Gasóleo C

* **Input:** `concejoSlug: 'oviedo'` (`D1`), `currentSystem: 'gasoil_convencional'`, `annualSpendEur: 2000`, `emitterType: 'suelo_radiante'` (`SCOP: 3.7`), `electricityPriceEurKwh: 0.18`, `investmentEur: 14250`.

* **Expected Output (tolerancia** $\pm 2\text{ €}$ **/** $\pm 0.1\text{ años}$**):**

  * `usefulDemandKwh`: `15871`

  * `aerotermiaKwh`: `4290`

  * `aerotermiaAnnualCostEur`: `772`

  * `annualSavingsEur`: `1228` (`savingsPercent: 61.4%`)

  * `paybackYearsGross`: `11.6`

  * `paybackYearsWithIrpf40`: `9.2` (descontando $3.000\text{ €}$ de IRPF)

## 9. Prompt de Arranque Recomendado para Antigravity

Copia y pega este prompt junto con el archivo anterior en tu sesión de Antigravity:

> "Lee el archivo `spec_herramientas_reformas_asturias.md`. Implementa la suite completa respetando la separación estricta entre `src/data/`, `src/lib/calculators/` y los componentes UI. Empieza creando los archivos de datos y motores de cálculo en TypeScript, escribe y ejecuta primero todos los tests de la Sección 8 hasta que pasen en verde al 100%, y después construye las interfaces interactivas con Tailwind CSS (diseño limpio, mobile-first, con tarjetas de resumen sticky en escritorio) y las páginas con JSON-LD y SEO programático por concejo."