/**
 * Plugin Rehype en compilación (0 KB JS en cliente) para enriquecer tablas Markdown/MDX:
 * - Añade data-cols="<N>" al <table>
 * - Convierte la primera celda de cada fila en <th scope="row">
 * - Inyecta data-label="<encabezado>", data-role="price" y data-span="full" para tarjetas UX
 */

const PRICE_HEADER_RE =
  /precio|rango|inversión|inversion|coste|tarifa|ahorro|presupuesto|icio/i;
const FULL_HEADER_RE =
  /incluye|finalidad|detalle|descripción|descripcion|documentación|documentacion|observaciones|qué|que|trámite|tramite|recomendación|recomendacion|ventaja|solución|solucion/i;

function extractText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join('');
  }
  return '';
}

function getElements(node, tagName) {
  if (!node || !Array.isArray(node.children)) return [];
  return node.children.filter((c) => c.type === 'element' && (!tagName || c.tagName === tagName));
}

function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'table') {
    const thead = getElements(node, 'thead')[0];
    const headerRow = thead ? getElements(thead, 'tr')[0] : null;
    const headerCells = headerRow
      ? headerRow.children.filter(
          (c) => c.type === 'element' && (c.tagName === 'th' || c.tagName === 'td'),
        )
      : [];
    const headers = headerCells.map((cell) => extractText(cell).replace(/\s+/g, ' ').trim());

    if (headers.length > 0) {
      node.properties = node.properties || {};
      node.properties['data-cols'] = String(headers.length);
    }

    const tbody = getElements(node, 'tbody')[0];
    const rows = tbody ? getElements(tbody, 'tr') : [];
    for (const row of rows) {
      const cells = row.children.filter(
        (c) => c.type === 'element' && (c.tagName === 'th' || c.tagName === 'td'),
      );
      const compactIndices = [];
      cells.forEach((cell, idx) => {
        cell.properties = cell.properties || {};
        const hdr = headers[idx] ?? '';
        const text = extractText(cell).replace(/\s+/g, ' ').trim();
        if (idx === 0) {
          cell.tagName = 'th';
          cell.properties.scope = 'row';
        } else {
          const isPrice = PRICE_HEADER_RE.test(hdr);
          const isFull =
            cells.length <= 2 ||
            isPrice ||
            text.length > 36 ||
            FULL_HEADER_RE.test(hdr);
          if (isPrice) {
            cell.properties['data-role'] = 'price';
          }
          if (isFull) {
            cell.properties['data-span'] = 'full';
          } else {
            compactIndices.push(idx);
          }
        }
        if (hdr) {
          cell.properties['data-label'] = hdr;
        }
      });

      // Evitar huecos huérfanos en la rejilla interna de 2 columnas
      if (compactIndices.length % 2 === 1) {
        const lastCompactIdx = compactIndices[compactIndices.length - 1];
        cells[lastCompactIdx].properties['data-span'] = 'full';
      }
    }
    return;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child);
    }
  }
}

export default function rehypeTableCards() {
  return (tree) => {
    walk(tree);
  };
}
