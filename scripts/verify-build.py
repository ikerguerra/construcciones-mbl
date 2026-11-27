#!/usr/bin/env python3
"""
Suite automatizada de verificación del build estático (dist/) de Construcciones MBL:
1. Cobertura 100 % de las 392 URLs de los 4 sitemaps de WordPress + rutas heredadas adicionales
   (/author/3fwu9/, /category/uncategorized/, artículo 23º en /uncategorized/ y /reformas-de-banos/,
   /reformas-de-ba%C3%B1os-en-asturias y /wp-sitemap.xml).
2. Verificación de que public/_redirects contiene únicamente códigos 301 válidos para
   Cloudflare Pages (sin 410 ni cadenas de múltiples saltos) y que functions/tag/[[path]].ts
   cubre /tag/* con HTTP 410.
3. Auditoría SEO/GEO/AEO de todos los ficheros HTML en dist/:
   - Exactamente 1 <h1> por página.
   - <title> único (35–65 caracteres en páginas indexables).
   - <meta name="description"> única (120–165 caracteres en páginas indexables).
   - <link rel="canonical"> absoluto con barra final /.
   - JSON-LD (@graph) sintácticamente válido con GeneralContractor y coherencia de
     aggregateRating entre portada, JSON-LD y dist/llms.txt.
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
VERCEL_CONFIG = ROOT / "vercel.json"
VERCEL_LEAD_FUNC = ROOT / "api" / "lead.ts"
VERCEL_TAG_FUNC = ROOT / "api" / "tag.ts"

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
    # Los sitemaps originales de WordPress residen en docs/90-anexos/sitemaps/ (o en raíz por compatibilidad)
    sitemap_dir = ROOT / "docs" / "90-anexos" / "sitemaps"
    sitemap_files = sorted(glob.glob(str(sitemap_dir / "wp-sitemap-*.xml")))
    if not sitemap_files:
        sitemap_files = sorted(glob.glob(str(ROOT / "wp-sitemap-*.xml")))
    if len(sitemap_files) != 4:
        errors.append(f"Se esperaban 4 sitemaps en {sitemap_dir}, encontrados: {len(sitemap_files)}")

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
        "https://construccionesmbl.com/reformas-de-ba%C3%B1os-en-asturias",
        "https://construccionesmbl.com/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
        "https://construccionesmbl.com/wp-sitemap.xml",
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

    required_literal_rules = [
        ("/reformas-de-ba%c3%b1os-en-asturias", "/reformas-de-banos-en-asturias/"),
        ("/reformas-de-ba%C3%B1os-en-asturias", "/reformas-de-banos-en-asturias/"),
        ("/reformas-de-baños-en-asturias", "/reformas-de-banos-en-asturias/"),
        ("/wp-sitemap.xml", "/sitemap-index.xml"),
        ("/calculadora-presupuesto-reforma", "/calcula-el-precio-de-tu-reforma-en-asturias/"),
        ("/calculadora-presupuesto-reforma/", "/calcula-el-precio-de-tu-reforma-en-asturias/"),
    ]
    for req_src, req_dst in required_literal_rules:
        if rules.get(req_src) != (req_dst, 301):
            errors.append(f"Falta regla obligatoria en _redirects: {req_src} -> {req_dst} 301")

    if path_exists_in_dist("/calculadora-presupuesto-reforma/"):
        errors.append("dist/calculadora-presupuesto-reforma/ no debe existir tras consolidar PA-023 (debe servir 301)")

    # Verificar también que todos los destinos de _redirects existen en dist/ y no forman cadenas
    for src, (dst, _code) in rules.items():
        if "*" in src:
            continue
        if dst in rules:
            errors.append(f"Cadena en _redirects: {src} -> {dst}")
        if not path_exists_in_dist(dst):
            errors.append(f"Regla _redirects apunta a destino inexistente en dist/: {src} -> {dst}")

    print(
        f"[Migración {len(all_legacy_urls)} URLs] Total verificadas: {len(all_legacy_urls)} "
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
    org_ratings_seen: set[tuple[str, str]] = set()

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
                else:
                    for node in parsed["@graph"]:
                        if isinstance(node, dict) and node.get("@type") == "GeneralContractor":
                            agg = node.get("aggregateRating") or {}
                            rv = str(agg.get("ratingValue", "")).strip()
                            rc = str(agg.get("reviewCount", "")).strip()
                            if rv and rc:
                                org_ratings_seen.add((rv, rc))
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

    # 7. Peso de dist/index.html < 70 KB y coherencia de reseñas (CA-PROY-002)
    home_file = DIST / "index.html"
    if home_file.is_file():
        home_txt = home_file.read_text(encoding="utf-8")
        home_kb = home_file.stat().st_size / 1024
        print(f"[Rendimiento] dist/index.html = {home_kb:.1f} KB (límite < 70 KB)")
        if home_kb >= 70:
            errors.append(f"dist/index.html supera 70 KB ({home_kb:.1f} KB)")

        if len(org_ratings_seen) != 1:
            errors.append(
                f"Inconsistencia en aggregateRating JSON-LD entre páginas: {sorted(org_ratings_seen)}"
            )
        else:
            rating_val, review_count = next(iter(org_ratings_seen))
            home_plain = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html.unescape(home_txt)))
            expected_home_snippets = [
                f"{rating_val} / 5 en Google · {review_count} reseñas verificadas",
                f"Ver las {review_count} reseñas en Google",
                f"{review_count} opiniones reales",
            ]
            for snippet in expected_home_snippets:
                if snippet not in home_plain:
                    errors.append(
                        f"[index.html] Desajuste con aggregateRating ({rating_val}/{review_count}): falta '{snippet}'"
                    )
            llms_file = DIST / "llms.txt"
            if llms_file.is_file():
                llms_txt = llms_file.read_text(encoding="utf-8")
                expected_llms = f"{rating_val}/5 ({review_count} reseñas)"
                if expected_llms not in llms_txt:
                    errors.append(
                        f"[llms.txt] Desajuste con aggregateRating ({rating_val}/{review_count}): falta '{expected_llms}'"
                    )

    # 8. /mensaje-enviado/ con noindex y fuera del sitemap
    msg_file = DIST / "mensaje-enviado" / "index.html"
    if not msg_file.is_file():
        errors.append("No existe dist/mensaje-enviado/index.html")
    else:
        if "noindex" not in msg_file.read_text(encoding="utf-8").lower():
            errors.append("dist/mensaje-enviado/index.html no tiene meta noindex")

    sitemap_index = DIST / "sitemap-index.xml"
    if not sitemap_index.is_file():
        errors.append("No se generó dist/sitemap-index.xml")

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


def verify_vercel_compat() -> list[str]:
    errors: list[str] = []
    if not VERCEL_LEAD_FUNC.is_file():
        errors.append("Falta api/lead.ts para compatibilidad con Vercel Functions")
    if not VERCEL_TAG_FUNC.is_file() or "status: 410" not in VERCEL_TAG_FUNC.read_text(encoding="utf-8"):
        errors.append("Falta api/tag.ts con status: 410 para cubrir /tag/* en Vercel")
    if not VERCEL_CONFIG.is_file():
        errors.append("Falta vercel.json en raíz para compatibilidad dual de redirecciones y cabeceras")
        return errors

    try:
        vcfg = json.loads(VERCEL_CONFIG.read_text(encoding="utf-8"))
    except Exception as exc:
        return [f"vercel.json no es JSON válido: {exc}"]

    if vcfg.get("trailingSlash") is True:
        errors.append("vercel.json no debe fijar trailingSlash=true (rompe POST /api/lead y 301 en 1 salto)")

    v_redirects: dict[str, tuple[str, int]] = {}
    for entry in vcfg.get("redirects", []):
        src = entry.get("source", "")
        dst = entry.get("destination", "")
        code = entry.get("statusCode")
        if src:
            v_redirects[src] = (dst, code)
        if code != 301:
            errors.append(f"vercel.json redirect '{src}' tiene statusCode {code} en lugar de 301")

    for raw in PUBLIC_REDIRECTS.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) != 3:
            continue
        cf_src, cf_dst, cf_code_str = parts
        cf_code = int(cf_code_str.rstrip("!"))
        v_src = "/author/:path*" if cf_src == "/author/*" else cf_src
        if v_redirects.get(v_src) != (cf_dst, cf_code):
            errors.append(
                f"Desajuste entre _redirects y vercel.json para '{cf_src}': esperado ({cf_dst}, {cf_code}), encontrado {v_redirects.get(v_src)}"
            )

    for v_src, (v_dst, _code) in v_redirects.items():
        if ":" in v_src or "*" in v_src:
            continue
        if v_dst in v_redirects:
            errors.append(f"Cadena en vercel.json redirects: {v_src} -> {v_dst}")
        if not path_exists_in_dist(v_dst):
            errors.append(f"vercel.json redirect apunta a destino inexistente en dist/: {v_src} -> {v_dst}")

    rewrites = vcfg.get("rewrites", [])
    for tag_src in ("/tag/:path*", "/tag/:path*/"):
        if {"source": tag_src, "destination": "/api/tag"} not in rewrites:
            errors.append(f"vercel.json rewrites debe mapear '{tag_src}' -> '/api/tag'")

    api_dir = ROOT / "api"
    if api_dir.is_dir():
        for api_file in sorted(api_dir.glob("*.ts")):
            api_src = api_file.read_text(encoding="utf-8")
            for imp in re.findall(r"""from\s+['"](\.[^'"]+)['"]""", api_src):
                if not imp.endswith(".js"):
                    errors.append(f"{api_file.relative_to(ROOT)} debe usar extension '.js' en import ESM relativo: {imp}")

    header_sources = {h.get("source"): {x.get("key") for x in h.get("headers", [])} for h in vcfg.get("headers", [])}
    required_sec_headers = {"Strict-Transport-Security", "X-Content-Type-Options", "Content-Security-Policy"}
    if not required_sec_headers.issubset(header_sources.get("/(.*)", set())):
        errors.append("vercel.json headers['/(.*)'] no replica todas las cabeceras de seguridad")
    if "Cache-Control" not in header_sources.get("/_astro/(.*)", set()):
        errors.append("vercel.json headers['/_astro/(.*)'] debe fijar Cache-Control immutable")

    print(f"[Compatibilidad Vercel] {len(v_redirects)} reglas 301 sincronizadas, rewrite /tag/* -> 410 y cabeceras verificadas.")
    return errors


def main() -> int:
    if not DIST.is_dir():
        print("ERROR: No existe el directorio dist/. Ejecuta 'npm run build' antes.")
        return 1

    rules, redir_errors = parse_redirects(PUBLIC_REDIRECTS)
    mig_errors = verify_sitemaps_and_redirects(rules)
    vercel_errors = verify_vercel_compat()
    html_errors = audit_html_files()

    all_errors = redir_errors + mig_errors + vercel_errors + html_errors
    if all_errors:
        print(f"\nFALLO DE VERIFICACIÓN ({len(all_errors)} errores):")
        for e in all_errors:
            print("  -", e)
        return 1

    print("\nVERIFICACIÓN COMPLETA SUPERADA CON 0 ERRORES.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
