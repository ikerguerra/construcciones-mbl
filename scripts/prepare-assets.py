#!/usr/bin/env python3
"""
Prepara todos los activos visuales locales para Construcciones MBL:
1. Logotipos SVG recortados (claro/oscuro/icono) en src/assets/brand/
2. Favicons, logo raster Schema.org y og-default.jpg en public/
3. Fotos propias de assets-cliente/MBL/ corregidas por EXIF y optimizadas a WebP (max 1920 px)
4. Obras reales y fotos destacadas del blog extraídas de construccionesmbl.com
"""

from __future__ import annotations

import json
import os
import re
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
CLIENT_DIR = ROOT / "assets-cliente" / "MBL"
BRAND_DIR = ROOT / "src" / "assets" / "brand"
IMG_DIR = ROOT / "src" / "assets" / "images"
PUBLIC_DIR = ROOT / "public"

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; MBL-Migration/1.0)"}


def ensure_dirs() -> None:
    for d in [
        BRAND_DIR,
        IMG_DIR / "servicios",
        IMG_DIR / "proyectos",
        IMG_DIR / "localidades",
        IMG_DIR / "blog",
        PUBLIC_DIR,
    ]:
        d.mkdir(parents=True, exist_ok=True)


def prepare_brand_svgs_and_icons() -> None:
    # 1. LogoMBL (marca oscura) -> viewBox exacto alrededor del icono (sin espacio blanco sobrante)
    mark_dark = (CLIENT_DIR / "LogoMBL.svg").read_text(encoding="utf-8")
    mark_dark_clean = re.sub(
        r'<svg[^>]*>',
        '<svg viewBox="150 38 725 520" fill="none" xmlns="http://www.w3.org/2000/svg">',
        mark_dark,
        count=1,
    )
    (BRAND_DIR / "logo-mbl-mark.svg").write_text(mark_dark_clean, encoding="utf-8", newline="\n")

    # 2. LogoMBL-Light (marca blanca sobre hero oscuro / footer)
    mark_light = (CLIENT_DIR / "LogoMBL-Light.svg").read_text(encoding="utf-8")
    mark_light_clean = re.sub(
        r'<svg[^>]*>',
        '<svg viewBox="150 38 725 520" fill="none" xmlns="http://www.w3.org/2000/svg">',
        mark_light,
        count=1,
    )
    (BRAND_DIR / "logo-mbl-mark-light.svg").write_text(mark_light_clean, encoding="utf-8", newline="\n")

    # 3. Logotipo completo oscuro (ConstruccionesMBL.svg)
    full_dark = (CLIENT_DIR / "ConstruccionesMBL.svg").read_text(encoding="utf-8")
    full_dark_clean = re.sub(
        r'<svg[^>]*>',
        '<svg viewBox="-2 -2 950 596" fill="none" xmlns="http://www.w3.org/2000/svg">',
        full_dark,
        count=1,
    )
    (BRAND_DIR / "logo-mbl-full.svg").write_text(full_dark_clean, encoding="utf-8", newline="\n")

    # 4. Logotipo completo claro para footer oscuro
    full_light = (
        full_dark_clean
        .replace('fill="#013810"', 'fill="#FFFFFF"')
        .replace('fill="#4A7648"', 'fill="#86B38C"')
    )
    (BRAND_DIR / "logo-mbl-full-light.svg").write_text(full_light, encoding="utf-8", newline="\n")

    # 5. Favicon SVG cuadrado centrado sobre fondo blanco redondeado (visible en modo claro y oscuro)
    paths_only = "\n".join(re.findall(r"<path[^>]+/>", mark_dark))
    favicon_svg = (
        '<svg width="512" height="512" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
        '  <rect width="800" height="800" rx="180" fill="#FFFFFF"/>\n'
        '  <g transform="translate(-112, 102)">\n'
        f"    {paths_only}\n"
        "  </g>\n"
        "</svg>\n"
    )
    (PUBLIC_DIR / "favicon.svg").write_text(favicon_svg, encoding="utf-8", newline="\n")

    # 6. Raster assets requeridos por Schema.org (Organization.logo) y Apple Touch Icon
    src_logo = Image.open(CLIENT_DIR / "Group 1.png").convert("RGBA")
    canvas_w, canvas_h = 1024, 680
    bg_white = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
    scaled = ImageOps.contain(src_logo, (880, 560), Image.Resampling.LANCZOS)
    bg_white.paste(scaled, ((canvas_w - scaled.width) // 2, (canvas_h - scaled.height) // 2), scaled)
    bg_white.save(PUBLIC_DIR / "logo-mbl-schema.png", format="PNG", optimize=True)

    # Apple touch icon 180x180
    src_mark = Image.open(CLIENT_DIR / "Section 2.png").convert("RGBA")
    # Crop out the top-left "Section 2" Figma label inside Section 2.png (top 40px left 120px)
    mark_crop = src_mark.crop((145, 35, 895, 575))
    apple_bg = Image.new("RGB", (180, 180), (255, 255, 255))
    mark_fit = ImageOps.contain(mark_crop, (148, 148), Image.Resampling.LANCZOS)
    apple_bg.paste(mark_fit, ((180 - mark_fit.width) // 2, (180 - mark_fit.height) // 2), mark_fit)
    apple_bg.save(PUBLIC_DIR / "apple-touch-icon.png", format="PNG", optimize=True)

    # Open Graph default (1200x630) a partir de hero-reformas-integrales.jpg
    og_src = ImageOps.exif_transpose(Image.open(CLIENT_DIR / "hero-reformas-integrales.jpg")).convert("RGB")
    og_fit = ImageOps.fit(og_src, (1200, 630), Image.Resampling.LANCZOS)
    og_fit.save(PUBLIC_DIR / "og-default.jpg", format="JPEG", quality=85, optimize=True)
    print("Brand SVGs, favicon, logo-mbl-schema.png, apple-touch-icon.png y og-default.jpg generados.")


def optimize_client_photos() -> None:
    mapping = {
        "hero-reformas-integrales.jpg": IMG_DIR / "servicios" / "hero-reformas-integrales-asturias.webp",
        "hero-servicios.jpg": IMG_DIR / "servicios" / "hero-servicios-construcciones-mbl.webp",
        "hero-reformas-banos.jpg": IMG_DIR / "servicios" / "hero-reformas-banos-asturias.webp",
        "hero-reformas-locales-comerciales.jpg": IMG_DIR / "servicios" / "hero-reformas-locales-comerciales.webp",
        "bajo comercial.jpg": IMG_DIR / "proyectos" / "proyecto-local-comercial-gijon-1.webp",
        "bajos comercial.jpg": IMG_DIR / "proyectos" / "proyecto-local-comercial-gijon-2.webp",
        "reformas-locales-comerciales.jpg": IMG_DIR / "proyectos" / "proyecto-local-comercial-interior.webp",
        "baños.jpg": IMG_DIR / "proyectos" / "proyecto-bano-moderno-asturias.webp",
        "alicatado de baño (2).jpg": IMG_DIR / "proyectos" / "proyecto-alicatado-bano-1.webp",
        "alicatado de baño.jpg": IMG_DIR / "proyectos" / "proyecto-alicatado-bano-2.webp",
    }
    for src_name, dest_path in mapping.items():
        src_path = CLIENT_DIR / src_name
        im = ImageOps.exif_transpose(Image.open(src_path)).convert("RGB")
        if max(im.size) > 1920:
            im.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
        im.save(dest_path, format="WEBP", quality=84, method=6)
        size_kb = dest_path.stat().st_size / 1024
        print(f"  [Cliente] {src_name} -> {dest_path.relative_to(ROOT)} ({im.size[0]}x{im.size[1]}, {size_kb:.0f} KB)")


def download_to_webp(url: str, dest: Path, max_dim: int = 1600) -> None:
    if dest.exists() and dest.stat().st_size > 1000:
        return
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as r:
        data = r.read()
    tmp = dest.with_suffix(".tmp")
    tmp.write_bytes(data)
    try:
        im = ImageOps.exif_transpose(Image.open(tmp)).convert("RGB")
        if max(im.size) > max_dim:
            im.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        im.save(dest, format="WEBP", quality=84, method=6)
        print(f"  [WP] {dest.relative_to(ROOT)} ({im.size[0]}x{im.size[1]}, {dest.stat().st_size / 1024:.0f} KB)")
    finally:
        if tmp.exists():
            tmp.unlink()


def download_wp_assets() -> None:
    # Activos clave para servicios, portada, localidades y proyectos reales de MBL
    wp_curated = {
        IMG_DIR / "servicios" / "hero-home-construcciones-mbl.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/reformas-y-construcciones-en-Asturias.webp",
        IMG_DIR / "servicios" / "servicio-cocinas-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/Cuanto-Cuesta-Reformar-una-Cocina-en-Asturias-2025.webp",
        IMG_DIR / "servicios" / "servicio-construccion-viviendas.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/Cuanto-Cuesta-Construir-una-Casa-en-Asturias.webp",
        IMG_DIR / "servicios" / "servicio-reformas-parciales.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/hacer-reforma-en-asturias.webp",
        IMG_DIR / "servicios" / "servicio-plato-ducha-48h.webp": "https://construccionesmbl.com/wp-content/uploads/2026/02/Cambio-de-Banera-por-Plato-de-Ducha-en-Asturias-2026.webp",
        IMG_DIR / "servicios" / "servicio-vivienda-eficiente.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/casa-eficiente-en-asturias.webp",
        IMG_DIR / "localidades" / "local-gijon-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/playa-gijon.webp",
        IMG_DIR / "localidades" / "local-oviedo-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/Reforma-Integral-en-Asturias.webp",
        IMG_DIR / "localidades" / "local-aviles-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/Rehabilitacion-de-Fachadas-y-Tejados-en-Asturias-2026.webp",
        IMG_DIR / "proyectos" / "obra-reforma-integral-1.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/reforma-integral-mbl.webp",
        IMG_DIR / "proyectos" / "obra-reforma-integral-2.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/reforma-integral-mbl-2.webp",
        IMG_DIR / "proyectos" / "obra-reforma-integral-3.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/reforma-integral-mbl-3.webp",
        IMG_DIR / "proyectos" / "obra-cocina-mbl-1.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/cocina-mbl-1.webp",
        IMG_DIR / "proyectos" / "obra-cocina-mbl-2.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/cocina-mbl-2.webp",
        IMG_DIR / "proyectos" / "obra-cocina-hall.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/cocina-hall.webp",
        IMG_DIR / "proyectos" / "obra-bano-mbl-wide.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/mbl-bano2.webp",
        IMG_DIR / "proyectos" / "obra-bano-mbl-14.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/bano-mbl-14.webp",
        IMG_DIR / "proyectos" / "obra-bano-mbl-16.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/bano-mbl-16.webp",
        IMG_DIR / "proyectos" / "obra-ducha-mampara.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/ducha-mampara.webp",
    }
    for dest, url in wp_curated.items():
        download_to_webp(url, dest, max_dim=1800)

    # Blog featured images (para los 22+1 posts)
    blog_images = {
        "suelo-vinilico-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/06/Suelo-Vinilico-en-Asturias-Ventajas-Tipos-y-por-que-Debes-Confiar-en-un-Profesional.webp",
        "tarima-o-suelo-vinilico.webp": "https://construccionesmbl.com/wp-content/uploads/2026/06/Tarima-Flotante-o-Suelo-Vinilico-Guia-Definitiva-para-Elegir-el-Mejor-Suelo-para-tu-Casa-en-Asturias.webp",
        "reforma-seguro-hogar-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/05/Como-Afecta-una-Reforma-al-Seguro-del-Hogar-en-Asturias-Lo-que-Debes-Saber-Guia-2026.webp",
        "como-elegir-suelo-reforma.webp": "https://construccionesmbl.com/wp-content/uploads/2026/05/Como-Elegir-Suelo-para-tu-Reforma-en-Asturias-Tipos-Durabilidad-y-Precio.webp",
        "casas-prefabricadas-minicasas-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/04/minicasa-asturias.webp",
        "convivir-con-obras-casa.webp": "https://construccionesmbl.com/wp-content/uploads/2026/03/obras-en-casa.webp",
        "mantenimiento-plato-ducha.webp": "https://construccionesmbl.com/wp-content/uploads/2026/03/mantenimiento-plato-de-ducha.jpg",
        "como-elegir-ventanas-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/02/cambio-ventanas.webp",
        "reformas-locales-comerciales-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/02/reforma-local-comercial.webp",
        "cambio-banera-plato-ducha.webp": "https://construccionesmbl.com/wp-content/uploads/2026/02/Cambio-de-Banera-por-Plato-de-Ducha-en-Asturias-2026.webp",
        "rehabilitacion-fachadas-tejados.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/Rehabilitacion-de-Fachadas-y-Tejados-en-Asturias-2026.webp",
        "cuando-merece-pena-reforma-integral.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/Reforma-Integral-en-Asturias.webp",
        "aislamiento-termico-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/aislamiento-termico.webp",
        "vivienda-sostenible-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/casa-eficiente-en-asturias.webp",
        "ayudas-subvenciones-reformas-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/ayudas.webp",
        "reformas-integrales-gijon.webp": "https://construccionesmbl.com/wp-content/uploads/2026/01/playa-gijon.webp",
        "cuanto-cuesta-construir-casa-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/Cuanto-Cuesta-Construir-una-Casa-en-Asturias.webp",
        "reformar-casa-antigua-asturias.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/Como-Reformar-una-Casa-Antigua-en-Asturias-Paso-a-Paso.webp",
        "errores-evitar-reforma-integral.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/reformas-en-asturias.webp",
        "casos-exito-hogares-sostenibles.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/ventajas-reforma-integral-en-asturias.webp",
        "cuanto-cuesta-reformar-cocina.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/Cuanto-Cuesta-Reformar-una-Cocina-en-Asturias-2025.webp",
        "materiales-sostenibles-banos.webp": "https://construccionesmbl.com/wp-content/uploads/2025/11/5-Materiales-Sostenibles-que-estan-Revolucionando-la-Reforma-de-Banos.webp",
        "humedades-condensacion-banos-cocinas.webp": "https://construccionesmbl.com/wp-content/uploads/2025/12/bano-mbl-15.webp",
    }
    for fname, url in blog_images.items():
        download_to_webp(url, IMG_DIR / "blog" / fname, max_dim=1400)


if __name__ == "__main__":
    ensure_dirs()
    prepare_brand_svgs_and_icons()
    optimize_client_photos()
    download_wp_assets()
    print("Preparación completa de activos finalizada.")
