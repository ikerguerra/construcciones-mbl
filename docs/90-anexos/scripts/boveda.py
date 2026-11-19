#!/usr/bin/env python3
"""Validador, generador de índices y listador de requisitos para la bóveda SRS de Construcciones MBL."""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path
from typing import Any

VAULT_ROOT = Path(__file__).resolve().parents[2]
EXCLUDED_DIRS = {"99-plantillas", "generados"}
EXCLUDED_PREFIXES = ("99-plantillas/", "90-anexos/generados/")
REQUIRED_FIELDS = ("id", "tipo", "titulo", "estado", "creado", "actualizado")
TYPED_BASENAME_TYPES = {"obj", "actor", "nec", "cu", "rf", "rnf", "ie", "ca", "adr", "pa"}
PRIORITY_ORDER = {"bloqueante": 0, "alta": 1, "media": 2, "baja": 3}

WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")
CODE_FENCE_RE = re.compile(r"```[\s\S]*?```")
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
AUTO_BLOCK_TEMPLATE = r"(<!-- AUTO:{name} -->)[\s\S]*?(<!-- /AUTO:{name} -->)"


def is_excluded(rel_path: Path) -> bool:
    posix = rel_path.as_posix()
    return any(posix.startswith(prefix) for prefix in EXCLUDED_PREFIXES)


def strip_quotes(val: str) -> str:
    val = val.strip()
    if len(val) >= 2 and ((val[0] == '"' and val[-1] == '"') or (val[0] == "'" and val[-1] == "'")):
        return val[1:-1]
    return val


def parse_inline_list(raw: str) -> list[str]:
    inner = raw.strip()[1:-1].strip()
    if not inner:
        return []
    items: list[str] = []
    cur = []
    quote: str | None = None
    for ch in inner:
        if quote:
            cur.append(ch)
            if ch == quote:
                quote = None
        else:
            if ch in ('"', "'"):
                quote = ch
                cur.append(ch)
            elif ch == ",":
                item = strip_quotes("".join(cur))
                if item:
                    items.append(item)
                cur = []
            else:
                cur.append(ch)
    tail = strip_quotes("".join(cur))
    if tail:
        items.append(tail)
    return items


def parse_frontmatter(text: str) -> tuple[dict[str, Any], str, bool]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text, False
    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_idx = idx
            break
    if end_idx is None:
        return {}, text, False

    fm_lines = lines[1:end_idx]
    body = "\n".join(lines[end_idx + 1 :])
    data: dict[str, Any] = {}
    current_list_key: str | None = None

    for raw_line in fm_lines:
        stripped = raw_line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.startswith("- ") and current_list_key is not None:
            item = strip_quotes(stripped[2:].strip())
            if isinstance(data[current_list_key], list):
                data[current_list_key].append(item)
            continue
        current_list_key = None
        if ":" in raw_line:
            key, rest = raw_line.split(":", 1)
            key = key.strip()
            val = rest.strip()
            if val == "":
                data[key] = []
                current_list_key = key
            elif val.startswith("[") and val.endswith("]"):
                data[key] = parse_inline_list(val)
            else:
                data[key] = strip_quotes(val)
    return data, body, True


def extract_links_from_value(val: Any) -> list[str]:
    results: list[str] = []
    items = val if isinstance(val, list) else ([val] if isinstance(val, str) and val else [])
    for item in items:
        matches = WIKILINK_RE.findall(str(item))
        if matches:
            for m in matches:
                target = m.split("|", 1)[0].split("#", 1)[0].strip()
                if target:
                    results.append(target)
        else:
            cleaned = str(item).strip()
            if cleaned:
                results.append(cleaned)
    return results


def extract_body_wikilinks(body: str) -> list[str]:
    clean = CODE_FENCE_RE.sub("", body)
    clean = INLINE_CODE_RE.sub("", clean)
    targets: list[str] = []
    for m in WIKILINK_RE.findall(clean):
        target = m.split("|", 1)[0].split("#", 1)[0].strip()
        if target:
            targets.append(target)
    return targets


def load_notes() -> list[dict[str, Any]]:
    notes: list[dict[str, Any]] = []
    for path in sorted(VAULT_ROOT.rglob("*.md")):
        rel = path.relative_to(VAULT_ROOT)
        if is_excluded(rel):
            continue
        text = path.read_text(encoding="utf-8")
        fm, body, has_fm = parse_frontmatter(text)
        notes.append(
            {
                "path": path,
                "rel": rel,
                "stem": path.stem,
                "fm": fm,
                "body": body,
                "has_fm": has_fm,
                "raw": text,
            }
        )
    return notes


def resolve_asset_target(target: str) -> bool:
    candidates = [
        VAULT_ROOT / target,
        VAULT_ROOT / "90-anexos" / target,
    ]
    if any(c.exists() for c in candidates):
        return True
    name = Path(target).name
    for p in (VAULT_ROOT / "90-anexos").rglob("*"):
        if p.is_file() and p.name == name:
            return True
    return False


def replace_auto_block(file_path: Path, block_name: str, new_content: str) -> None:
    text = file_path.read_text(encoding="utf-8")
    pattern = re.compile(AUTO_BLOCK_TEMPLATE.format(name=re.escape(block_name)))
    if not pattern.search(text):
        raise RuntimeError(f"No se encontró el bloque <!-- AUTO:{block_name} --> en {file_path}")
    replacement = f"<!-- AUTO:{block_name} -->\n{new_content.strip()}\n<!-- /AUTO:{block_name} -->"
    updated = pattern.sub(lambda _: replacement, text, count=1)
    file_path.write_text(updated, encoding="utf-8", newline="\n")


def read_latest_version() -> tuple[str, str]:
    hist = VAULT_ROOT / "00-inicio" / "Historial de cambios.md"
    if not hist.exists():
        return "0.1.0", dt.date.today().isoformat()
    latest_ver = "0.1.0"
    latest_date = dt.date.today().isoformat()
    for line in hist.read_text(encoding="utf-8").splitlines():
        s = line.strip()
        if not s.startswith("|"):
            continue
        cols = [c.strip() for c in s.strip("|").split("|")]
        if len(cols) >= 2 and re.match(r"^\d+\.\d+\.\d+", cols[0]):
            latest_ver = cols[0]
            latest_date = cols[1]
    return latest_ver, latest_date


def extract_req_statement(body: str) -> str:
    for line in body.splitlines():
        s = line.strip()
        if s.startswith("El sistema debe"):
            return s
    for line in body.splitlines():
        s = line.strip()
        if s and not s.startswith("#") and not s.startswith(">") and not s.startswith("|") and not s.startswith("-"):
            return s
    return "Sin enunciado definido."


def build_indices() -> None:
    notes = load_notes()
    by_id: dict[str, dict[str, Any]] = {}
    for n in notes:
        nid = str(n["fm"].get("id", "")).strip()
        if nid:
            by_id[nid] = n

    objs = sorted([n for n in notes if n["fm"].get("tipo") == "obj"], key=lambda x: str(x["fm"].get("id")))
    acts = sorted([n for n in notes if n["fm"].get("tipo") == "actor"], key=lambda x: str(x["fm"].get("id")))
    necs = sorted([n for n in notes if n["fm"].get("tipo") == "nec"], key=lambda x: str(x["fm"].get("id")))
    cus = sorted([n for n in notes if n["fm"].get("tipo") == "cu"], key=lambda x: str(x["fm"].get("id")))
    rfs = sorted([n for n in notes if n["fm"].get("tipo") == "rf"], key=lambda x: str(x["fm"].get("id")))
    rnfs = sorted([n for n in notes if n["fm"].get("tipo") == "rnf"], key=lambda x: str(x["fm"].get("id")))
    reqs = rfs + rnfs
    ies = sorted([n for n in notes if n["fm"].get("tipo") == "ie"], key=lambda x: str(x["fm"].get("id")))
    ents = sorted([n for n in notes if n["fm"].get("tipo") == "entidad"], key=lambda x: str(x["fm"].get("id")))
    cas = sorted([n for n in notes if n["fm"].get("tipo") == "ca"], key=lambda x: str(x["fm"].get("id")))
    adrs = sorted([n for n in notes if n["fm"].get("tipo") == "adr"], key=lambda x: str(x["fm"].get("id")))
    pas = sorted(
        [n for n in notes if n["fm"].get("tipo") == "pa"],
        key=lambda x: (PRIORITY_ORDER.get(str(x["fm"].get("prioridad", "baja")), 9), str(x["fm"].get("id"))),
    )

    pa_open = [n for n in pas if str(n["fm"].get("estado", "")).lower() == "abierta"]
    pa_closed = [n for n in pas if str(n["fm"].get("estado", "")).lower() != "abierta"]
    pa_by_prio = {
        p: sum(1 for n in pa_open if str(n["fm"].get("prioridad", "")).lower() == p)
        for p in ("bloqueante", "alta", "media", "baja")
    }

    ver, ver_date = read_latest_version()
    today = dt.date.today().isoformat()

    # 1. Estado.md -> AUTO:cifras
    cifras_md = "\n".join(
        [
            f"- **Versión del SRS**: `{ver}` (último hito: `{ver_date}` · generación de índices: `{today}`)",
            f"- **Preguntas abiertas**: {len(pa_open)} abiertas ({pa_by_prio['bloqueante']} bloqueantes, {pa_by_prio['alta']} altas, {pa_by_prio['media']} medias, {pa_by_prio['baja']} bajas) · {len(pa_closed)} resueltas/cerradas",
            "",
            "| Tipo de artefacto | Cantidad |",
            "|---|---|",
            f"| Objetivos (`OBJ-*`) | {len(objs)} |",
            f"| Actores (`ACT-*`) | {len(acts)} |",
            f"| Necesidades (`NEC-*`) | {len(necs)} |",
            f"| Casos de uso (`CU-*`) | {len(cus)} |",
            f"| Requisitos funcionales (`RF-*`) | {len(rfs)} |",
            f"| Requisitos no funcionales (`RNF-*`) | {len(rnfs)} |",
            f"| Interfaces externas (`IE-*`) | {len(ies)} |",
            f"| Entidades del modelo de datos | {len(ents)} |",
            f"| Criterios de aceptación (`CA-*`) | {len(cas)} |",
            f"| Decisiones de arquitectura (`ADR-*`) | {len(adrs)} |",
            f"| Preguntas abiertas (`PA-*`) | {len(pas)} |",
        ]
    )
    replace_auto_block(VAULT_ROOT / "00-inicio" / "Estado.md", "cifras", cifras_md)

    # Mapeos inversos para matriz
    obj_to_necs: dict[str, list[str]] = {str(o["fm"]["id"]): [] for o in objs}
    nec_to_reqs: dict[str, list[str]] = {str(n["fm"]["id"]): [] for n in necs}
    req_to_cas: dict[str, list[str]] = {str(r["fm"]["id"]): [] for r in reqs}
    req_to_adrs: dict[str, list[str]] = {str(r["fm"]["id"]): [] for r in reqs}
    req_to_pas: dict[str, list[str]] = {str(r["fm"]["id"]): [] for r in reqs}

    for n in necs:
        nid = str(n["fm"]["id"])
        for oid in extract_links_from_value(n["fm"].get("objetivos")):
            obj_to_necs.setdefault(oid, []).append(nid)

    for r in reqs:
        rid = str(r["fm"]["id"])
        for nid in extract_links_from_value(r["fm"].get("necesidades")):
            nec_to_reqs.setdefault(nid, []).append(rid)

    for c in cas:
        cid = str(c["fm"]["id"])
        for rid in extract_links_from_value(c["fm"].get("verifica")):
            if rid in req_to_cas:
                req_to_cas[rid].append(cid)

    for a in adrs:
        aid = str(a["fm"]["id"])
        for tid in extract_links_from_value(a["fm"].get("afecta")):
            if tid in req_to_adrs:
                req_to_adrs[tid].append(aid)

    for p in pa_open:
        pid = str(p["fm"]["id"])
        for tid in extract_links_from_value(p["fm"].get("afecta")):
            if tid in req_to_pas:
                req_to_pas[tid].append(pid)

    # 2. Matriz de trazabilidad.md -> AUTO:matriz
    t1_lines = [
        "### Cobertura desde objetivos",
        "",
        "| Objetivo | Necesidades vinculadas | Requisitos derivados |",
        "|---|---|---|",
    ]
    for o in objs:
        oid = str(o["fm"]["id"])
        necs_for_obj = sorted(set(obj_to_necs.get(oid, [])))
        reqs_for_obj = sorted(
            {rid for nid in necs_for_obj for rid in nec_to_reqs.get(nid, [])}
        )
        nec_str = ", ".join(f"[[{nid}]]" for nid in necs_for_obj) or "—"
        req_str = ", ".join(f"[[{rid}]]" for rid in reqs_for_obj) or "—"
        t1_lines.append(f"| [[{oid}]] — {o['fm'].get('titulo', '')} | {nec_str} | {req_str} |")

    covered_reqs = sum(1 for r in reqs if req_to_cas.get(str(r["fm"]["id"])))
    cov_pct = (covered_reqs / len(reqs) * 100.0) if reqs else 0.0

    t2_lines = [
        "",
        "### Cobertura de requisitos",
        "",
        f"Cobertura verificable por criterios de aceptación (`CA-*`): **{covered_reqs}/{len(reqs)} ({cov_pct:.1f}%)**.",
        "",
        "| Requisito | Título | Prioridad | Necesidades | Criterios de aceptación | ADRs | PAs abiertas |",
        "|---|---|---|---|---|---|---|",
    ]
    for r in reqs:
        rid = str(r["fm"]["id"])
        prio = str(r["fm"].get("prioridad", "—"))
        necs_l = ", ".join(f"[[{x}]]" for x in extract_links_from_value(r["fm"].get("necesidades"))) or "—"
        cas_l = ", ".join(f"[[{x}]]" for x in sorted(req_to_cas.get(rid, []))) or "—"
        adrs_l = ", ".join(f"[[{x}]]" for x in sorted(req_to_adrs.get(rid, []))) or "—"
        pas_l = ", ".join(f"[[{x}]]" for x in sorted(req_to_pas.get(rid, []))) or "—"
        t2_lines.append(
            f"| [[{rid}]] | {r['fm'].get('titulo', '')} | {prio} | {necs_l} | {cas_l} | {adrs_l} | {pas_l} |"
        )

    replace_auto_block(
        VAULT_ROOT / "11-trazabilidad" / "Matriz de trazabilidad.md",
        "matriz",
        "\n".join(t1_lines + t2_lines),
    )

    # 3. Decisiones pendientes.md -> AUTO:lista-adr
    adr_lines = [
        "| ID | Título | Estado | Artefactos afectados |",
        "|---|---|---|---|",
    ]
    for a in adrs:
        aid = str(a["fm"]["id"])
        afecta = ", ".join(f"[[{x}]]" for x in extract_links_from_value(a["fm"].get("afecta"))) or "—"
        adr_lines.append(
            f"| [[{aid}]] | {a['fm'].get('titulo', '')} | `{a['fm'].get('estado', '')}` | {afecta} |"
        )
    replace_auto_block(
        VAULT_ROOT / "12-decisiones" / "Decisiones pendientes.md",
        "lista-adr",
        "\n".join(adr_lines),
    )

    # 4. Indice de preguntas abiertas.md -> AUTO:lista-pa
    pa_lines = [
        f"Total registradas: **{len(pas)}** ({len(pa_open)} abiertas: {pa_by_prio['bloqueante']} bloqueantes, {pa_by_prio['alta']} altas, {pa_by_prio['media']} medias, {pa_by_prio['baja']} bajas).",
        "",
        "| ID | Prioridad | Categoría | Título | Estado | Artefactos afectados |",
        "|---|---|---|---|---|---|",
    ]
    for p in pas:
        pid = str(p["fm"]["id"])
        afecta = ", ".join(f"[[{x}]]" for x in extract_links_from_value(p["fm"].get("afecta"))) or "—"
        pa_lines.append(
            f"| [[{pid}]] | **{p['fm'].get('prioridad', '')}** | {p['fm'].get('categoria', '—')} | {p['fm'].get('titulo', '')} | `{p['fm'].get('estado', '')}` | {afecta} |"
        )
    replace_auto_block(
        VAULT_ROOT / "13-preguntas-abiertas" / "Indice de preguntas abiertas.md",
        "lista-pa",
        "\n".join(pa_lines),
    )

    print(
        f"Índices actualizados: {len(objs)} OBJ, {len(acts)} ACT, {len(necs)} NEC, {len(cus)} CU, "
        f"{len(rfs)} RF, {len(rnfs)} RNF, {len(ies)} IE, {len(ents)} Entidades, {len(cas)} CA, "
        f"{len(adrs)} ADR, {len(pa_open)} PA abiertas ({len(pa_closed)} cerradas)."
    )


def validate_vault() -> int:
    notes = load_notes()
    errors: list[str] = []
    warnings: list[str] = []

    stems: dict[str, Path] = {}
    ids: dict[str, dict[str, Any]] = {}

    # All valid markdown basenames in docs/ excluding generated/
    valid_md_stems: set[str] = set()
    for p in VAULT_ROOT.rglob("*.md"):
        rel = p.relative_to(VAULT_ROOT)
        if rel.as_posix().startswith("90-anexos/generados/"):
            continue
        valid_md_stems.add(p.stem)

    for n in notes:
        rel_str = n["rel"].as_posix()
        stem = n["stem"]
        if stem in stems:
            errors.append(f"Nombre de archivo duplicado en bóveda: '{stem}.md' ({stems[stem].as_posix()} y {rel_str})")
        else:
            stems[stem] = n["rel"]

        if not n["has_fm"]:
            errors.append(f"Falta frontmatter YAML en {rel_str}")
            continue

        fm = n["fm"]
        for req_f in REQUIRED_FIELDS:
            if req_f not in fm or str(fm[req_f]).strip() == "":
                errors.append(f"Campo obligatorio '{req_f}' ausente o vacío en {rel_str}")

        nid = str(fm.get("id", "")).strip()
        tipo = str(fm.get("tipo", "")).strip()
        if nid:
            if nid in ids:
                errors.append(f"ID duplicado '{nid}' en {rel_str} (ya definido en {ids[nid]['rel'].as_posix()})")
            else:
                ids[nid] = n
            if tipo in TYPED_BASENAME_TYPES and stem != nid:
                errors.append(f"El nombre de archivo '{stem}.md' no coincide con id '{nid}' en {rel_str}")

    # Second pass: wikilinks + unidirectional traceability
    req_covered_by_ca: set[str] = set()
    reqs_all: list[str] = []
    pa_open_counts = {"bloqueante": 0, "alta": 0, "media": 0, "baja": 0}
    hyp_notes: list[str] = []

    for n in notes:
        rel_str = n["rel"].as_posix()
        fm = n["fm"]
        tipo = str(fm.get("tipo", "")).strip()
        nid = str(fm.get("id", "")).strip()

        # Check body wikilinks and frontmatter wikilinks
        all_targets = extract_body_wikilinks(n["body"])
        for k, v in fm.items():
            vals = v if isinstance(v, list) else [v]
            for item in vals:
                for m in WIKILINK_RE.findall(str(item)):
                    t = m.split("|", 1)[0].split("#", 1)[0].strip()
                    if t:
                        all_targets.append(t)

        for target in all_targets:
            if any(target.lower().endswith(ext) for ext in (".html", ".xml", ".py", ".css", ".png", ".jpg", ".webp", ".svg")):
                if not resolve_asset_target(target):
                    errors.append(f"Enlace a anexo inexistente [[{target}]] en {rel_str}")
            else:
                target_stem = Path(target).stem if "/" in target else target
                if target_stem not in valid_md_stems:
                    errors.append(f"Wikilink roto [[{target}]] en {rel_str}")

        # Traceability checks
        if tipo == "obj":
            for forbidden in ("necesidades", "requisitos"):
                if forbidden in fm:
                    errors.append(f"Referencia inversa prohibida '{forbidden}' en {rel_str}")

        elif tipo == "nec":
            objs_l = extract_links_from_value(fm.get("objetivos"))
            acts_l = extract_links_from_value(fm.get("actores"))
            if not objs_l:
                errors.append(f"{rel_str} debe tener 'objetivos' no vacío")
            for x in objs_l:
                if not x.startswith("OBJ-") or x not in ids:
                    errors.append(f"Objetivo inválido '{x}' en {rel_str}")
            if not acts_l:
                errors.append(f"{rel_str} debe tener 'actores' no vacío")
            for x in acts_l:
                if not x.startswith("ACT-") or x not in ids:
                    errors.append(f"Actor inválido '{x}' en {rel_str}")
            for forbidden in ("requisitos", "casos_uso"):
                if forbidden in fm:
                    errors.append(f"Referencia inversa prohibida '{forbidden}' en {rel_str}")

        elif tipo == "cu":
            acts_l = extract_links_from_value(fm.get("actores"))
            necs_l = extract_links_from_value(fm.get("necesidades"))
            if not acts_l:
                errors.append(f"{rel_str} debe tener 'actores' no vacío")
            for x in acts_l:
                if not x.startswith("ACT-") or x not in ids:
                    errors.append(f"Actor inválido '{x}' en {rel_str}")
            if not necs_l:
                errors.append(f"{rel_str} debe tener 'necesidades' no vacío")
            for x in necs_l:
                if not x.startswith("NEC-") or x not in ids:
                    errors.append(f"Necesidad inválida '{x}' en {rel_str}")

        elif tipo in ("rf", "rnf"):
            reqs_all.append(nid)
            necs_l = extract_links_from_value(fm.get("necesidades"))
            if not necs_l:
                errors.append(f"Requisito huérfano sin 'necesidades' en {rel_str}")
            for x in necs_l:
                if not x.startswith("NEC-") or x not in ids:
                    errors.append(f"Necesidad inválida '{x}' en {rel_str}")
            if tipo == "rf" and "casos_uso" in fm:
                for x in extract_links_from_value(fm.get("casos_uso")):
                    if not x.startswith("CU-") or x not in ids:
                        errors.append(f"Caso de uso inválido '{x}' en {rel_str}")
            for forbidden in ("criterios", "objetivos"):
                if forbidden in fm:
                    errors.append(f"Referencia inversa prohibida '{forbidden}' en {rel_str}")

        elif tipo == "ca":
            ver_l = extract_links_from_value(fm.get("verifica"))
            if not ver_l:
                errors.append(f"{rel_str} debe tener 'verifica' no vacío")
            for x in ver_l:
                if not (x.startswith("RF-") or x.startswith("RNF-")) or x not in ids:
                    errors.append(f"Requisito verificado inválido '{x}' en {rel_str}")
                else:
                    req_covered_by_ca.add(x)

        elif tipo == "ie":
            req_l = extract_links_from_value(fm.get("requisitos"))
            if not req_l:
                errors.append(f"{rel_str} debe tener 'requisitos' no vacío")
            for x in req_l:
                if not (x.startswith("RF-") or x.startswith("RNF-")) or x not in ids:
                    errors.append(f"Requisito inválido '{x}' en {rel_str}")

        elif tipo == "adr":
            af_l = extract_links_from_value(fm.get("afecta"))
            if not af_l:
                errors.append(f"{rel_str} debe tener 'afecta' no vacío")

        elif tipo == "pa":
            af_l = extract_links_from_value(fm.get("afecta"))
            prio = str(fm.get("prioridad", "")).lower()
            if not af_l:
                errors.append(f"{rel_str} debe tener 'afecta' no vacío")
            if prio not in PRIORITY_ORDER:
                errors.append(f"Prioridad inválida '{prio}' en {rel_str}")
            elif str(fm.get("estado", "")).lower() == "abierta":
                pa_open_counts[prio] += 1

        if "[!warning] Hipótesis" in CODE_FENCE_RE.sub("", n["body"]):
            hyp_notes.append(rel_str)

    uncovered = sorted(set(reqs_all) - req_covered_by_ca)
    for r in uncovered:
        warnings.append(f"Requisito sin criterio de aceptación (CA): {r}")
    if hyp_notes:
        warnings.append(f"Notas con hipótesis provisionales ({len(hyp_notes)}): {', '.join(hyp_notes)}")
    total_open_pa = sum(pa_open_counts.values())
    if total_open_pa:
        warnings.append(
            "Preguntas abiertas pendientes "
            f"({total_open_pa}): {pa_open_counts['bloqueante']} bloqueantes, "
            f"{pa_open_counts['alta']} altas, {pa_open_counts['media']} medias, {pa_open_counts['baja']} bajas"
        )

    print(f"Validación completada sobre {len(notes)} notas en docs/.")
    print(f"Errores: {len(errors)} | Avisos: {len(warnings)}")
    for w in warnings:
        print(f"  [AVISO] {w}")
    for e in errors:
        print(f"  [ERROR] {e}")

    return 1 if errors else 0


def list_requirements() -> None:
    notes = load_notes()
    rfs = sorted([n for n in notes if n["fm"].get("tipo") == "rf"], key=lambda x: str(x["fm"].get("id")))
    rnfs = sorted([n for n in notes if n["fm"].get("tipo") == "rnf"], key=lambda x: str(x["fm"].get("id")))

    out_dir = VAULT_ROOT / "90-anexos" / "generados"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "Listado de requisitos.md"

    ver, _ = read_latest_version()
    lines = [
        "# Listado de requisitos — Construcciones MBL",
        "",
        f"> Generado automáticamente desde el SRS v{ver} ({dt.date.today().isoformat()}). Total: **{len(rfs)} RF** y **{len(rnfs)} RNF** ({len(rfs) + len(rnfs)} requisitos).",
        "",
        "## Requisitos Funcionales (RF)",
        "",
        "| ID | Título | Prioridad | Estado | Enunciado |",
        "|---|---|---|---|---|",
    ]
    for r in rfs:
        stmt = extract_req_statement(r["body"]).replace("|", "\\|")
        lines.append(
            f"| `{r['fm']['id']}` | {r['fm']['titulo']} | {r['fm'].get('prioridad', '—')} | {r['fm']['estado']} | {stmt} |"
        )

    lines.extend(
        [
            "",
            "## Requisitos No Funcionales (RNF)",
            "",
            "| ID | Título | Prioridad | Estado | Enunciado |",
            "|---|---|---|---|---|",
        ]
    )
    for r in rnfs:
        stmt = extract_req_statement(r["body"]).replace("|", "\\|")
        lines.append(
            f"| `{r['fm']['id']}` | {r['fm']['titulo']} | {r['fm'].get('prioridad', '—')} | {r['fm']['estado']} | {stmt} |"
        )

    out_file.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"Generado {out_file.relative_to(VAULT_ROOT.parent)} ({len(rfs)} RF, {len(rnfs)} RNF).")


def main() -> int:
    parser = argparse.ArgumentParser(description="Utilidad de gestión de la bóveda SRS de Construcciones MBL")
    parser.add_argument("comando", choices=["indices", "validar", "listar"], help="Acción a ejecutar")
    args = parser.parse_args()

    if args.comando == "indices":
        build_indices()
        return 0
    if args.comando == "validar":
        return validate_vault()
    if args.comando == "listar":
        list_requirements()
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
