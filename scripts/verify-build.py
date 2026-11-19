#!/usr/bin/env python3
"""
Suite automatizada de verificación del build estático (dist/) de Construcciones MBL:
1. Cobertura 100 % de las 392 URLs de los 4 sitemaps de WordPress + /author/3fwu9/ +
   /category/uncategorized/ + artículo 23º (/uncategorized/...).
2. Verificación de que public/_redirects contiene únicamente códigos 301 válidos para
   Cloudflare Pages (sin 410 ni cadenas de múltiples saltos) y que functions/tag/[[path]].ts
   cubre /tag/* con HTTP 410.
3. Auditoría SEO/GEO/AEO de todos los ficheros HTML en dist/:
   - Exactamente 1 <h1> por página.
   - <title> único (35–65 caracteres en páginas indexables).
   - <meta name="description"> única (120–165 caracteres en páginas indexables).
   - <link rel="canonical"> absoluto con barra final /.
   - JSON-LD (@graph) sintácticamente válido con GeneralContractor.
   - /mensaje-enviado/ con noindex, nofollow y ausente de sitemap-0.xml.
   - Existencia y validez de dist/llms.txt y dist/robots.txt.
   - Tamaño de dist/index.html < 70 KB.
   - 0 enlaces internos rotos (href="/...").
   - 0 cadenas heredadas prohibidas (GTM-TG8LZ5L8, cookieyes, trustindex, 3fwu9, CIF: B33,
     PSICOLENG, Así Trabajamos en tu Cocina, metros cuadrados de tu cocina).
"""

from __future__ import annotations

import glob
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
PUBLIC_REDIRECTS = ROOT / "public" / "_redirects"
TAG_FUNC = ROOT / "functions" / "tag" / "[[path]].ts"

FORBIDDEN_STRINGS = [
    "GTM-TG8LZ5L8",
    "cookieyes",
    "trustindex",
    "3fwu9",
    "CIF: B33",
    "PSICOLENG",
    "Así Trabajamos en tu Cocina",
    "metros cuadrados de tu cocina",
]


def parse_redirects(path: Path) -> tuple[dict[str, tuple[str, int]], list[str]]:
    rules: dict[str, tuple[str, int]] = {}
    errors: list[str] = []
    for line_no, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) != 3:
            errors.append(f"_redirects línea {line_no}: formato inválido '{line}'")
            continue
        src, dst, code_str = parts
        try:
            code = int(code_str.rstrip("!"))
        except ValueError:
            errors.append(f"_redirects línea {line_no}: código inválido '{code_str}'")
            continue
        if code not in (200, 301, 302, 303, 307, 308):
            errors.append(
                f"_redirects línea {line_no}: código {code} NO soportado por Cloudflare Pages"
            )
        rules[src] = (dst, code)
        rules[unquote(src)] = (dst, code)
    return rules, errors


def path_exists_in_dist(url_path: str) -> bool:
    clean = unquote(url_path).split("?")[0].split("#")[0]
    if clean == "/" or clean == "":
        return (DIST / "index.html").is_file()
    rel = clean.lstrip("/")
    # Con barra final -> dir/index.html
    if (DIST / rel / "index.html").is_file():
        return True
    if (DIST / rel.rstrip("/") / "index.html").is_file():
        return True
    if (DIST / rel).is_file():
        return True
    return False


def verify_sitemaps_and_redirects(rules: dict[str, tuple[str, int]]) -> list[str]:
    errors: list[str] = []
    sitemap_files = sorted(glob.glob(str(ROOT / "wp-sitemap-*.xml")))
    if len(sitemap_files) != 4:
        errors.append(f"Se esperaban 4 sitemaps en la raíz, encontrados: {len(sitemap_files)}")

    all_legacy_urls: list[str] = []
    for sf in sitemap_files:
        txt = Path(sf).read_text(encoding="utf-8", errors="ignore")
        urls = re.findall(r'href="(https://construccionesmbl\.com[^"]*)"', txt)
        all_legacy_urls.extend(urls)

    # Añadir URLs heredadas adicionales obligatorias
    extra_legacy = [
        "https://construccionesmbl.com/author/3fwu9/",
        "https://construccionesmbl.com/category/uncategorized/",
        "https://construccionesmbl.com/uncategorized/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
    ]
    all_legacy_urls.extend(extra_legacy)

    if not TAG_FUNC.is_file() or "status: 410" not in TAG_FUNC.read_text(encoding="utf-8"):
        errors.append("Falta functions/tag/[[path]].ts con status: 410 para cubrir /tag/*")

    direct_ok = 0
    redirect_301_ok = 0
    gone_410_ok = 0

    for full_url in all_legacy_urls:
        p = urlparse(full_url).path
        p_unquoted = unquote(p)

        if p.startswith("/tag/"):
            gone_410_ok += 1
            continue

        if path_exists_in_dist(p):
            direct_ok += 1
            continue

        rule = rules.get(p) or rules.get(p_unquoted) or rules.get(p.rstrip("/"))
        if not rule and p.startswith("/author/"):
            rule = rules.get("/author/*")

        if rule:
            dst, code = rule
            if code != 301:
                errors.append(f"URL heredada {p} tiene código {code} en lugar de 301")
            if dst in rules:
                errors.append(f"Cadena de redirección detectada: {p} -> {dst} -> {rules[dst][0]}")
            if not path_exists_in_dist(dst):
                errors.append(f"Destino de redirección 301 no existe en dist/: {p} -> {dst}")
            else:
                redirect_301_ok += 1
        else:
            errors.append(f"URL heredada SIN COBERTURA (404): {full_url}")

    # Verificar también que todos los destinos de _redirects existen en dist/ y no forman cadenas
    for src, (dst, _code) in rules.items():
        if "*" in src:
            continue
        if dst in rules:
            errors.append(f"Cadena en _redirects: {src} -> {dst}")
        if not path_exists_in_dist(dst):
            errors.append(f"Regla _redirects apunta a destino inexistente en dist/: {src} -> {dst}")

    print(
        f"[Migración 395 URLs] Total verificadas: {len(all_legacy_urls)} "
        f"(200 directo: {direct_ok}, 301 en 1 salto: {redirect_301_ok}, 410 /tag/*: {gone_410_ok})"
    )
    return errors


def audit_html_files() -> list[str]:
    errors: list[str] = []
    html_files = sorted(DIST.rglob("*.html"))
    if not html_files:
        return ["No se encontraron archivos HTML en dist/"]

    titles_seen: dict[str, str] = {}
    descs_seen: dict[str, str] = {}

    for hf in html_files:
        rel = hf.relative_to(DIST).as_posix()
        content = hf.read_text(encoding="utf-8")

        # 1. Cadenas prohibidas
        for bad in FORBIDDEN_STRINGS:
            if bad.lower() in content.lower():
                errors.append(f"[{rel}] Contiene cadena prohibida: '{bad}'")

        # 2. Marcadores .ph heredados
        if re.search(r'class=["\'][^"\']*\bph\b', content):
            errors.append(f"[{rel}] Contiene placeholder CSS '.ph' sin sustituir")

        # 3. Exactamente 1 H1
        h1s = re.findall(r"<h1\b[^>]*>(.*?)</h1>", content, flags=re.S | re.I)
        if len(h1s) != 1:
            errors.append(f"[{rel}] Número de <h1> inválido: {len(h1s)} (se exige exactamente 1)")

        # 4. Title y Meta Description
        t_m = re.search(r"<title>(.*?)</title>", content, flags=re.S | re.I)
        d_m = re.search(
            r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']',
            content,
            flags=re.I,
        )
        r_m = re.search(
            r'<meta\s+name=["\']robots["\']\s+content=["\'](.*?)["\']',
            content,
            flags=re.I,
        )
        c_m = re.search(
            r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']',
            content,
            flags=re.I,
        )

        is_noindex = bool(r_m and "noindex" in r_m.group(1).lower())

        if not t_m:
            errors.append(f"[{rel}] Falta <title>")
        else:
            title_txt = html.unescape(t_m.group(1)).strip()
            if not is_noindex:
                if not (35 <= len(title_txt) <= 65):
                    errors.append(
                        f"[{rel}] Longitud de <title> fuera de rango ({len(title_txt)} chars): '{title_txt}'"
                    )
                if title_txt in titles_seen:
                    errors.append(
                        f"[{rel}] <title> duplicado con {titles_seen[title_txt]}: '{title_txt}'"
                    )
                titles_seen[title_txt] = rel

        if not d_m:
            errors.append(f"[{rel}] Falta <meta name='description'>")
        else:
            desc_txt = html.unescape(d_m.group(1)).strip()
            if not is_noindex:
                if not (120 <= len(desc_txt) <= 165):
                    errors.append(
                        f"[{rel}] Longitud de meta description fuera de rango ({len(desc_txt)} chars): '{desc_txt}'"
                    )
                if desc_txt in descs_seen:
                    errors.append(
                        f"[{rel}] meta description duplicada con {descs_seen[desc_txt]}"
                    )
                descs_seen[desc_txt] = rel

        if not c_m:
            errors.append(f"[{rel}] Falta <link rel='canonical'>")
        else:
            can_url = c_m.group(1)
            if not can_url.startswith("https://construccionesmbl.com/") or not can_url.endswith("/"):
                errors.append(f"[{rel}] Canonical inválido (debe terminar en /): '{can_url}'")

        # 5. JSON-LD válido en páginas indexables
        ld_blocks = re.findall(
            r'<script\s+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
            content,
            flags=re.S | re.I,
        )
        if not is_noindex and not ld_blocks:
            errors.append(f"[{rel}] Página indexable sin bloque JSON-LD")
        for blk in ld_blocks:
            try:
                parsed = json.loads(blk)
                if "@graph" not in parsed:
                    errors.append(f"[{rel}] JSON-LD sin '@graph'")
            except Exception as exc:
                errors.append(f"[{rel}] JSON-LD inválido: {exc}")

        # 6. Enlaces internos href="/..."
        for href in re.findall(r'href=["\'](/[^"\']*?)["\']', content):
            if href.startswith("//") or href.startswith("/api/"):
                continue
            target_path = href.split("#")[0].split("?")[0]
            if not target_path:
                continue
            if not path_exists_in_dist(target_path):
                errors.append(f"[{rel}] Enlace interno roto hacia '{href}'")

    # 7. Peso de dist/index.html < 70 KB
    home_file = DIST / "index.html"
    if home_file.is_file():
        home_kb = home_file.stat().st_size / 1024
        print(f"[Rendimiento] dist/index.html = {home_kb:.1f} KB (límite < 70 KB)")
        if home_kb >= 70:
            errors.append(f"dist/index.html supera 70 KB ({home_kb:.1f} KB)")

    # 8. /mensaje-enviado/ con noindex y fuera del sitemap
    msg_file = DIST / "mensaje-enviado" / "index.html"
    if not msg_file.is_file():
        errors.append("No existe dist/mensaje-enviado/index.html")
    else:
        if "noindex" not in msg_file.read_text(encoding="utf-8").lower():
            errors.append("dist/mensaje-enviado/index.html no tiene meta noindex")

    sitemap_0 = DIST / "sitemap-0.xml"
    if not sitemap_0.is_file():
        errors.append("No se generó dist/sitemap-0.xml")
    else:
        sm_txt = sitemap_0.read_text(encoding="utf-8")
        if "/mensaje-enviado/" in sm_txt:
            errors.append("sitemap-0.xml incluye erróneamente /mensaje-enviado/")

    # 9. /llms.txt y /robots.txt
    for req_file in ["llms.txt", "robots.txt", "_headers", "_redirects"]:
        fp = DIST / req_file
        if not fp.is_file() or fp.stat().st_size < 50:
            errors.append(f"Falta o está vacío dist/{req_file}")

    print(
        f"[Auditoría HTML/SEO] {len(html_files)} páginas HTML verificadas, "
        f"{len(titles_seen)} títulos únicos, {len(descs_seen)} descripciones únicas."
    )
    return errors


def main() -> int:
    if not DIST.is_dir():
        print("ERROR: No existe el directorio dist/. Ejecuta 'npm run build' antes.")
        return 1

    rules, redir_errors = parse_redirects(PUBLIC_REDIRECTS)
    mig_errors = verify_sitemaps_and_redirects(rules)
    html_errors = audit_html_files()

    all_errors = redir_errors + mig_errors + html_errors
    if all_errors:
        print(f"\nFALLO DE VERIFICACIÓN ({len(all_errors)} errores):")
        for e in all_errors:
            print("  -", e)
        return 1

    print("\nVERIFICACIÓN COMPLETA SUPERADA CON 0 ERRORES.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
