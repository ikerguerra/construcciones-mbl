/**
 * Plugin Rehype en compilación (0 KB JS en cliente) para enriquecer tablas Markdown/MDX:
 * - Añade data-cols="<N>" al <table>
 * - Convierte la primera celda de cada fila en <th scope="row">
 * - Inyecta data-label="<encabezado>" en cada celda para su presentación en tarjetas responsive
 */

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
      cells.forEach((cell, idx) => {
        cell.properties = cell.properties || {};
        if (idx === 0) {
          cell.tagName = 'th';
          cell.properties.scope = 'row';
        }
        if (headers[idx]) {
          cell.properties['data-label'] = headers[idx];
        }
      });
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
