#!/usr/bin/env node
/**
 * Mockup Studio & Automated Portfolio Generator — Construcciones MBL
 *
 * Captures real high-DPI screenshots from production (or custom --url) via Playwright
 * and composes 4 architectural-grade 2560x1440 (16:9) portfolio plates in exports/mockups/.
 *
 * Usage:
 *   node scripts/generate-mockups.mjs [--url https://construccionesmbl.vercel.app]
 */

import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'exports', 'mockups');
const ASSETS_DIR = path.join(OUT_DIR, 'assets');
const RAW_DIR = path.join(ASSETS_DIR, 'raw');

// Parse CLI args (--url <url> or --url=<url>)
function parseBaseUrl() {
  const args = process.argv.slice(2);
  let url = 'https://construccionesmbl.vercel.app';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      url = args[i + 1];
      i++;
    } else if (args[i].startsWith('--url=')) {
      url = args[i].slice('--url='.length);
    }
  }
  return url.replace(/\/+$/, '');
}

function resolveChromiumExecutable() {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  }
  const candidates = [
    '/opt/ms-playwright/chromium-1255/chrome-linux64/chrome',
    '/opt/google/chrome/chrome',
    '/usr/bin/google-chrome',
  ];
  for (const candidate of candidates) {
    if (fsSync.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

const CLEANUP_CSS = `
  /* Hide scrollbars, cookie banners and intrusive floating action buttons */
  ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
  html, body { scrollbar-width: none !important; -ms-overflow-style: none !important; }
  #mbl-cookie-banner,
  .cookie-banner,
  .wa-float,
  [data-wa-float],
  #lead-capture-modal {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  /* Force final visible state of all entrance animations */
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
  [data-reveal],
  .reveal,
  .is-visible,
  .hero-main,
  .hero-bottom,
  .card,
  .zona-card,
  .story-row {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
`;

async function preparePage(page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem(
        'mbl_cookie_consent_v1',
        JSON.stringify({ analytics: false, timestamp: Date.now() })
      );
    } catch {
      // ignore storage errors
    }
  });
}

async function stabilizeAndClean(page) {
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.addStyleTag({ content: CLEANUP_CSS });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Trigger lazy images in viewport
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.setAttribute('loading', 'eager');
    });
  });
  await page.waitForTimeout(450);
}

/**
 * Phase 1: Capture real high-density screenshots from the live deployment
 */
async function captureLiveScreenshots(browser, baseUrl) {
  console.log(`\n[1/2] Capturing real high-DPI screenshots from ${baseUrl}...`);
  await fs.mkdir(RAW_DIR, { recursive: true });

  // -------------------------------------------------------------------------
  // A) DESKTOP CAPTURES (1440x900, deviceScaleFactor: 2 -> 2880x1800 px)
  // -------------------------------------------------------------------------
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'es-ES',
  });
  const dPage = await desktopContext.newPage();
  await preparePage(dPage);

  // 1. Desktop Home Hero
  console.log('  -> Desktop: Home Hero (/)');
  await dPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await stabilizeAndClean(dPage);
  await dPage.screenshot({
    path: path.join(RAW_DIR, 'desktop-home-hero.png'),
    fullPage: false,
  });

  // 2. Desktop Servicios Catalog (scrolled neatly to the 4x2 cards grid)
  console.log('  -> Desktop: Servicios (/servicios/)');
  await dPage.goto(`${baseUrl}/servicios/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await stabilizeAndClean(dPage);
  await dPage.evaluate(() => {
    const cardsHeading = document.querySelector('section.sec h2.sec-title');
    if (cardsHeading) {
      const y = cardsHeading.getBoundingClientRect().top + window.scrollY - 36;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  });
  await dPage.waitForTimeout(400);
  await dPage.screenshot({
    path: path.join(RAW_DIR, 'desktop-servicios-grid.png'),
    fullPage: false,
  });

  // 3. Desktop Proyectos Gallery (/proyectos/)
  console.log('  -> Desktop: Proyectos (/proyectos/)');
  await dPage.goto(`${baseUrl}/proyectos/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await stabilizeAndClean(dPage);
  await dPage.evaluate(() => {
    const tabs = document.querySelector('.tabs');
    if (tabs) {
      const y = tabs.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  });
  await dPage.waitForTimeout(400);
  await dPage.screenshot({
    path: path.join(RAW_DIR, 'desktop-proyectos.png'),
    fullPage: false,
  });

  // 4. Desktop Interactive Budget Calculator (/calculadora-presupuesto-reforma/) — ACTIVE STATE
  console.log('  -> Desktop: Calculadora de Presupuesto PEM + ICIO (/calculadora-presupuesto-reforma/) [Active State]');
  await dPage.goto(`${baseUrl}/calculadora-presupuesto-reforma/`, {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await stabilizeAndClean(dPage);

  // Interact with calculator controls to configure a realistic project in Gijón (115 m², Calidad Alta, extras)
  await dPage.selectOption('#b-concejo', 'gijon').catch(() => {});
  await dPage.selectOption('#b-property', 'piso_con_ascensor').catch(() => {});
  await dPage.evaluate(() => {
    const num = document.querySelector('#b-area-num');
    const range = document.querySelector('#b-area');
    if (num && range) {
      num.value = '115';
      range.value = '115';
      num.dispatchEvent(new Event('input', { bubbles: true }));
      num.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  // Switch to Step 2 to select High Quality and realistic extras
  await dPage.click('[data-step-tab="2"]').catch(() => {});
  await dPage.waitForTimeout(200);
  await dPage.click('input[name="quality"][value="alta"]').catch(() => {});
  await dPage.click('input[name="pathologies"][value="humedades_capilaridad"]').catch(() => {});
  await dPage.click('input[name="optionalPackages"][value="ventana_pvc_aislamiento"]').catch(() => {});
  await dPage.click('input[name="optionalPackages"][value="cocina_equipada"]').catch(() => {});
  await dPage.waitForTimeout(250);

  // Align viewport so the entire interactive 2-column tool (Step 2 + Live Breakdown Dark Panel) fills the frame
  await dPage.evaluate(() => {
    const tool = document.querySelector('[data-budget-tool]');
    if (tool) {
      const y = tool.getBoundingClientRect().top + window.scrollY - 28;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  });
  await dPage.waitForTimeout(350);
  await dPage.screenshot({
    path: path.join(RAW_DIR, 'desktop-calculator-active.png'),
    fullPage: false,
  });

  // Also capture isolated dark summary breakdown card for technical zoom / detail card
  const asideSummary = dPage.locator('[data-budget-tool] > aside');
  if ((await asideSummary.count()) > 0) {
    await asideSummary.screenshot({
      path: path.join(RAW_DIR, 'detail-calculator-summary.png'),
    });
  }

  // Also capture Step 1 active view of the calculator for variety if needed
  await dPage.click('[data-step-tab="1"]').catch(() => {});
  await dPage.waitForTimeout(250);
  await dPage.evaluate(() => {
    const sec = document.querySelector('section.sec');
    if (sec) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
  await dPage.waitForTimeout(250);
  await dPage.screenshot({
    path: path.join(RAW_DIR, 'desktop-calculator-page-top.png'),
    fullPage: false,
  });

  await desktopContext.close();

  // -------------------------------------------------------------------------
  // B) MOBILE CAPTURES (390x844, deviceScaleFactor: 3 -> 1170x2532 px)
  // -------------------------------------------------------------------------
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    locale: 'es-ES',
  });
  const mPage = await mobileContext.newPage();
  await preparePage(mPage);

  // 1. Mobile Home Hero
  console.log('  -> Mobile: Home Hero (/)');
  await mPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await stabilizeAndClean(mPage);
  await mPage.screenshot({
    path: path.join(RAW_DIR, 'mobile-home.png'),
    fullPage: false,
  });

  // 2. Mobile Servicios (scrolled so sticky solid header or clean section padding is visible below Dynamic Island)
  console.log('  -> Mobile: Servicios (/servicios/)');
  await mPage.goto(`${baseUrl}/servicios/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await stabilizeAndClean(mPage);
  await mPage.evaluate(() => {
    const firstCard = document.querySelector('.cards');
    if (firstCard) {
      const y = firstCard.getBoundingClientRect().top + window.scrollY - 108;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  });
  await mPage.waitForTimeout(350);
  await mPage.screenshot({
    path: path.join(RAW_DIR, 'mobile-servicios.png'),
    fullPage: false,
  });

  // 3. Mobile Simulador / Calculadora in active state (/calcula-el-precio-de-tu-reforma-en-asturias/)
  console.log('  -> Mobile: Simulador en estado activo (/calcula-el-precio-de-tu-reforma-en-asturias/)');
  await mPage.goto(`${baseUrl}/calcula-el-precio-de-tu-reforma-en-asturias/`, {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await stabilizeAndClean(mPage);
  await mPage.selectOption('#sim-tipo', 'reforma-integral').catch(() => {});
  await mPage.selectOption('#sim-zona', 'Gijón').catch(() => {});
  await mPage.selectOption('#sim-calidad', 'premium').catch(() => {});
  await mPage.evaluate(() => {
    const input = document.querySelector('#sim-m2');
    const range = document.querySelector('#sim-m2-range');
    if (input && range) {
      input.value = '95';
      range.value = '95';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const checks = document.querySelectorAll('[data-extra-check]');
    if (checks[0]) {
      checks[0].checked = true;
      checks[0].dispatchEvent(new Event('change', { bubbles: true }));
    }
    const resBox = document.querySelector('aside.toc-box');
    if (resBox) {
      const y = resBox.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  });
  await mPage.waitForTimeout(350);
  await mPage.screenshot({
    path: path.join(RAW_DIR, 'mobile-calculator-result.png'),
    fullPage: false,
  });

  await mobileContext.close();
}

/**
 * Helper to build local @font-face declarations using repository @fontsource WOFF2 files
 */
function buildFontFaceCss() {
  const bebasWoff2 = pathToFileURL(
    path.join(ROOT_DIR, 'node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2')
  ).href;
  const inter400 = pathToFileURL(
    path.join(ROOT_DIR, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2')
  ).href;
  const inter500 = pathToFileURL(
    path.join(ROOT_DIR, 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2')
  ).href;
  const inter600 = pathToFileURL(
    path.join(ROOT_DIR, 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2')
  ).href;
  const inter700 = pathToFileURL(
    path.join(ROOT_DIR, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2')
  ).href;

  return `
    @font-face {
      font-family: 'Bebas Neue';
      font-style: normal;
      font-weight: 400;
      src: url('${bebasWoff2}') format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      src: url('${inter400}') format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      src: url('${inter500}') format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      src: url('${inter600}') format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      src: url('${inter700}') format('woff2');
    }
  `;
}

/**
 * Shared CSS for architectural studio presentation plates (2560x1440)
 */
function buildStudioCss(urls) {
  return `
    ${buildFontFaceCss()}

    :root {
      --black: #0F1D14;
      --ink: #111A14;
      --primary: #164624;
      --secondary: #3E6B47;
      --warm: #86D195;
      --bg: #EEF3EE;
      --bg-tint: #F3F7F4;
      --muted: #516158;
      --line: #D6DDD8;
      --border-dark: #243A2C;
      --white: #FFFFFF;
      --f-display: 'Bebas Neue', sans-serif;
      --f-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 2560px;
      height: 1440px;
      overflow: hidden;
      font-family: var(--f-body);
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }

    .canvas {
      position: relative;
      width: 2560px;
      height: 1440px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
    }

    .canvas--light {
      background-image: url('${urls.bgLight}');
    }

    .canvas--dark {
      background-image: url('${urls.bgDark}');
    }

    /* Subtle architectural directional vignette & lighting layer */
    .canvas--light::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(140% 100% at 18% 12%, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0) 58%),
        linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(15, 29, 20, 0.08) 100%);
      pointer-events: none;
    }

    .canvas--dark::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(120% 95% at 22% 14%, rgba(255, 255, 255, 0.06) 0%, rgba(0, 0, 0, 0) 55%),
        linear-gradient(145deg, rgba(15, 29, 20, 0.24) 0%, rgba(6, 12, 8, 0.56) 100%);
      pointer-events: none;
    }

    /* Minimalist Desktop Browser Window (16:10 content ratio matching 1440x900) */
    .mac-window {
      position: relative;
      background: #0F1D14;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .mac-window--on-light {
      border: 1px solid rgba(15, 29, 20, 0.18);
      box-shadow:
        0 2px 4px rgba(15, 29, 20, 0.05),
        0 18px 38px -8px rgba(15, 29, 20, 0.16),
        0 52px 104px -20px rgba(15, 29, 20, 0.28),
        0 0 0 1px rgba(255, 255, 255, 0.65) inset;
    }

    .mac-window--on-dark {
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.35),
        0 28px 60px -12px rgba(0, 0, 0, 0.58),
        0 72px 140px -24px rgba(0, 0, 0, 0.82),
        0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    }

    .mac-bar {
      height: 36px;
      background: #122117;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 12px;
      flex-shrink: 0;
    }

    .mac-bar--light {
      background: #F4F7F4;
      border-bottom: 1px solid rgba(15, 29, 20, 0.09);
    }

    .mac-dots {
      display: flex;
      gap: 7px;
      align-items: center;
    }

    .mac-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.22);
    }

    .mac-bar--light .mac-dot {
      background: rgba(15, 29, 20, 0.2);
    }

    .mac-url {
      margin: 0 auto;
      padding: 4px 16px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: rgba(255, 255, 255, 0.62);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }

    .mac-bar--light .mac-url {
      color: #516158;
      background: #E7ECE8;
      border: 1px solid rgba(15, 29, 20, 0.07);
    }

    .mac-viewport {
      position: relative;
      width: 100%;
      flex: 1;
      overflow: hidden;
      background: #FFFFFF;
    }

    .mac-viewport img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      image-rendering: -webkit-optimize-contrast;
    }

    /* Minimalist Architectural iPhone Frame (390:844 viewport aspect ratio = 1 : 2.1641) */
    .iphone {
      position: relative;
      background: #0D1710;
      border-radius: 48px;
      padding: 11px;
      display: flex;
      flex-direction: column;
    }

    .iphone--on-light {
      border: 1px solid rgba(255, 255, 255, 0.28);
      box-shadow:
        0 0 0 1px rgba(15, 29, 20, 0.35),
        0 14px 30px -6px rgba(15, 29, 20, 0.24),
        0 44px 92px -16px rgba(15, 29, 20, 0.38),
        0 75px 130px -30px rgba(15, 29, 20, 0.32),
        0 0 0 2px rgba(255, 255, 255, 0.08) inset;
    }

    .iphone--on-dark {
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.65),
        0 20px 44px -10px rgba(0, 0, 0, 0.6),
        0 56px 110px -20px rgba(0, 0, 0, 0.82),
        0 0 0 2px rgba(255, 255, 255, 0.07) inset;
    }

    .iphone-screen {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 38px;
      overflow: hidden;
      background: #FFFFFF;
    }

    .iphone-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    .iphone-island {
      position: absolute;
      top: 9px;
      left: 50%;
      transform: translateX(-50%);
      width: 72px;
      height: 18px;
      border-radius: 999px;
      background: #09100B;
      z-index: 4;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    }
  `;
}

/**
 * HTML Templates for each of the 4 Portfolio Plates (2560x1440)
 */
function buildPlate01HeroHtml(urls) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    ${buildStudioCss(urls)}
    .hero-stage {
      position: absolute;
      inset: 0;
    }
    .hero-desktop {
      position: absolute;
      left: 310px;
      top: 196px;
      width: 1584px;
      height: 1026px;
      z-index: 2;
    }
    .hero-mobile {
      position: absolute;
      left: 1852px;
      top: 392px;
      width: 392px;
      height: 850px;
      z-index: 4;
    }
  </style>
</head>
<body>
  <div class="canvas canvas--light">
    <div class="hero-stage">
      <div class="mac-window mac-window--on-light hero-desktop">
        <div class="mac-bar">
          <div class="mac-dots">
            <span class="mac-dot"></span>
            <span class="mac-dot"></span>
            <span class="mac-dot"></span>
          </div>
          <div class="mac-url">construccionesmbl.com</div>
        </div>
        <div class="mac-viewport">
          <img src="${urls.desktopHomeHero}" alt="" />
        </div>
      </div>

      <div class="iphone iphone--on-light hero-mobile">
        <div class="iphone-screen">
          <div class="iphone-island"></div>
          <img src="${urls.mobileHome}" alt="" />
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildPlate02BentoHtml(urls) {
  // Asymmetric 4-module Bento Grid on dark slate texture
  // Outer padding: 180px top/bottom (12.5%), 310px left/right (12.1%)
  // Total bento area: 1940px wide x 1080px high
  // Column widths: 1024px (Main 16:10 desktop view), 446px (Technical breakdown card matching 0.6341 ratio), 414px (Mobile iPhone)
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    ${buildStudioCss(urls)}

    .bento-wrap {
      position: absolute;
      top: 180px;
      left: 310px;
      width: 1940px;
      height: 1080px;
      display: grid;
      grid-template-columns: 1024px 446px 414px;
      grid-template-rows: 676px 376px;
      gap: 28px;
      z-index: 2;
    }

    .bento-cell {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      background: #111F16;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow:
        0 18px 40px -12px rgba(0, 0, 0, 0.6),
        0 48px 96px -24px rgba(0, 0, 0, 0.78),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    }

    /* Module 1: Main Desktop View (Servicios / Proyectos) — top-left (1024 x 676 -> 36px bar + 1024x640 exact 1.6 ratio) */
    .mod-main {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      display: flex;
      flex-direction: column;
      background: #0F1D14;
    }

    /* Module 2: Technical Feature Zoom (Active Budget Breakdown) — col 2, row 1 (446 x 676) */
    .mod-tech {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      background: #0F1D14;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mod-tech-inner {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(134, 209, 149, 0.24);
      background: #0F1D14;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .mod-tech-inner img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      display: block;
    }

    /* Module 3: Clean Vertical Smartphone Module — col 3, row 1..3 (414 x 1080) */
    .mod-mobile {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      background: linear-gradient(165deg, rgba(22, 70, 36, 0.28) 0%, rgba(15, 29, 20, 0.88) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px;
    }

    .mod-mobile .iphone {
      width: 354px;
      height: 766px;
      border-radius: 44px;
      padding: 10px;
    }

    .mod-mobile .iphone-screen {
      border-radius: 35px;
    }

    /* Module 4: Design System Spec Card — col 1..3, row 2 (1498 x 376) */
    .mod-ds {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
      background: linear-gradient(135deg, #112117 0%, #0C1710 100%);
      padding: 32px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .ds-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 16px;
    }

    .ds-tag {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #86D195;
    }

    .ds-meta {
      font-size: 12.5px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: #C2CEC6;
    }

    .ds-body {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: 44px;
      align-items: center;
      padding-top: 4px;
    }

    .swatches {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 14px;
    }

    .swatch {
      border-radius: 16px;
      padding: 14px 14px 12px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 186px;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.45);
    }

    .swatch-name {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.85;
    }

    .swatch-hex {
      font-family: var(--f-body);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    .ds-typo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 186px;
      padding: 18px 24px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .typo-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
    }

    .typo-row + .typo-row {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 14px;
    }

    .typo-sample-display {
      font-family: var(--f-display);
      font-size: 44px;
      line-height: 0.95;
      color: #FFFFFF;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .typo-sample-body {
      font-family: var(--f-body);
      font-size: 22px;
      font-weight: 600;
      line-height: 1.2;
      color: #EEF3EE;
      letter-spacing: -0.01em;
    }

    .typo-spec {
      text-align: right;
    }

    .typo-spec strong {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #86D195;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .typo-spec span {
      font-size: 11.5px;
      color: #C2CEC6;
    }
  </style>
</head>
<body>
  <div class="canvas canvas--dark">
    <div class="bento-wrap">
      <!-- 1. Main Desktop Module: Interior Services Grid -->
      <div class="bento-cell mod-main">
        <div class="mac-bar mac-bar--light">
          <div class="mac-dots">
            <span class="mac-dot"></span>
            <span class="mac-dot"></span>
            <span class="mac-dot"></span>
          </div>
          <div class="mac-url">construccionesmbl.com/servicios/</div>
        </div>
        <div class="mac-viewport">
          <img src="${urls.desktopServiciosGrid}" alt="" />
        </div>
      </div>

      <!-- 2. Technical Module: Active Calculator Live Breakdown -->
      <div class="bento-cell mod-tech">
        <div class="mod-tech-inner">
          <img src="${urls.detailCalculatorSummary}" alt="" />
        </div>
      </div>

      <!-- 3. Mobile Module: Clean Vertical Smartphone View -->
      <div class="bento-cell mod-mobile">
        <div class="iphone iphone--on-dark">
          <div class="iphone-screen">
            <div class="iphone-island"></div>
            <img src="${urls.mobileServicios}" alt="" />
          </div>
        </div>
      </div>

      <!-- 4. Design System Card -->
      <div class="bento-cell mod-ds">
        <div class="ds-header">
          <span class="ds-tag">Construcciones MBL · Diseño &amp; Desarrollo Web</span>
          <span class="ds-meta">Sistema Visual Editorial · Tokens CSS &amp; Tipografía</span>
        </div>

        <div class="ds-body">
          <div class="swatches">
            <div class="swatch" style="background:#0F1D14;color:#FFFFFF">
              <span class="swatch-name">Bosque Ink</span>
              <span class="swatch-hex">#0F1D14</span>
            </div>
            <div class="swatch" style="background:#164624;color:#FFFFFF">
              <span class="swatch-name">Verde MBL</span>
              <span class="swatch-hex">#164624</span>
            </div>
            <div class="swatch" style="background:#3E6B47;color:#FFFFFF">
              <span class="swatch-name">Hoja Salvia</span>
              <span class="swatch-hex">#3E6B47</span>
            </div>
            <div class="swatch" style="background:#86D195;color:#0F1D14">
              <span class="swatch-name">Acento Warm</span>
              <span class="swatch-hex">#86D195</span>
            </div>
            <div class="swatch" style="background:#EEF3EE;color:#0F1D14">
              <span class="swatch-name">Salvia Bg</span>
              <span class="swatch-hex">#EEF3EE</span>
            </div>
            <div class="swatch" style="background:#FFFFFF;color:#111A14">
              <span class="swatch-name">Blanco Puro</span>
              <span class="swatch-hex">#FFFFFF</span>
            </div>
          </div>

          <div class="ds-typo">
            <div class="typo-row">
              <span class="typo-sample-display">Bebas Neue</span>
              <div class="typo-spec">
                <strong>Display · Titulares</strong>
                <span>400 Regular · Uppercase</span>
              </div>
            </div>
            <div class="typo-row">
              <span class="typo-sample-body">Inter Variable</span>
              <div class="typo-spec">
                <strong>Body &amp; UI Controls</strong>
                <span>400 / 500 / 600 / 700</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildPlate03FeatureFocusHtml(urls) {
  // Feature Focus on bg-slate-dark.png:
  // Centered desktop window (1680 x 1086 -> 36px bar + 1680x1050 viewport = exact 1440:900 1.6 ratio)
  // Left/Right margin: (2560 - 1680) / 2 = 440px (17.2% negative space each side)
  // Top/Bottom margin: (1440 - 1086) / 2 = 177px (12.3% negative space top/bottom)
  // Complete interactive BudgetCalculator (Step 2 controls + Live Breakdown Dark Panel) with zero clipping or redundant duplicate overlay.
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    ${buildStudioCss(urls)}

    .focus-desktop {
      position: absolute;
      left: 440px;
      top: 177px;
      width: 1680px;
      height: 1086px;
      z-index: 2;
    }
  </style>
</head>
<body>
  <div class="canvas canvas--dark">
    <div class="mac-window mac-window--on-dark focus-desktop">
      <div class="mac-bar mac-bar--light">
        <div class="mac-dots">
          <span class="mac-dot"></span>
          <span class="mac-dot"></span>
          <span class="mac-dot"></span>
        </div>
        <div class="mac-url">construccionesmbl.com/calculadora-presupuesto-reforma/</div>
      </div>
      <div class="mac-viewport">
        <img src="${urls.desktopCalculatorActive}" alt="" />
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildPlate04ResponsiveTrioHtml(urls) {
  // 3 iPhones aligned and subtly staggered in height on bg-concrete-light.png
  // Each iPhone: 432px wide x 928px tall (inner screen 410 x 906 -> exact 390:844 ratio)
  // Horizontal gap: 112px -> total width = 432*3 + 112*2 = 1520px -> left/right margin = 520px (20.3% negative space)
  // Vertical stagger:
  //   Phone 1 (Home): top 296px
  //   Phone 2 (Servicios): top 216px
  //   Phone 3 (Simulador Activo): top 296px
  // Top/bottom margins: min 216px (15.0% negative space)
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    ${buildStudioCss(urls)}

    .trio-stage {
      position: absolute;
      inset: 0;
    }

    .trio-phone {
      position: absolute;
      width: 432px;
      height: 928px;
    }

    .trio-phone--1 {
      left: 520px;
      top: 296px;
    }

    .trio-phone--2 {
      left: 1064px;
      top: 216px;
      z-index: 3;
    }

    .trio-phone--3 {
      left: 1608px;
      top: 296px;
    }
  </style>
</head>
<body>
  <div class="canvas canvas--light">
    <div class="trio-stage">
      <div class="iphone iphone--on-light trio-phone trio-phone--1">
        <div class="iphone-screen">
          <div class="iphone-island"></div>
          <img src="${urls.mobileHome}" alt="" />
        </div>
      </div>

      <div class="iphone iphone--on-light trio-phone trio-phone--2">
        <div class="iphone-screen">
          <div class="iphone-island"></div>
          <img src="${urls.mobileServicios}" alt="" />
        </div>
      </div>

      <div class="iphone iphone--on-light trio-phone trio-phone--3">
        <div class="iphone-screen">
          <div class="iphone-island"></div>
          <img src="${urls.mobileCalculatorResult}" alt="" />
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Phase 2: Render the 4 HTML/CSS plates to 2560x1440 PNGs
 */
async function renderPortfolioPlates(browser) {
  console.log('\n[2/2] Composing and exporting 4 portfolio plates (2560x1440, 16:9)...');

  const urls = {
    bgLight: pathToFileURL(path.join(ASSETS_DIR, 'bg-concrete-light.png')).href,
    bgDark: pathToFileURL(path.join(ASSETS_DIR, 'bg-slate-dark.png')).href,
    desktopHomeHero: pathToFileURL(path.join(RAW_DIR, 'desktop-home-hero.png')).href,
    desktopServiciosGrid: pathToFileURL(path.join(RAW_DIR, 'desktop-servicios-grid.png')).href,
    desktopProyectos: pathToFileURL(path.join(RAW_DIR, 'desktop-proyectos.png')).href,
    desktopCalculatorActive: pathToFileURL(path.join(RAW_DIR, 'desktop-calculator-active.png')).href,
    detailCalculatorSummary: pathToFileURL(path.join(RAW_DIR, 'detail-calculator-summary.png')).href,
    mobileHome: pathToFileURL(path.join(RAW_DIR, 'mobile-home.png')).href,
    mobileServicios: pathToFileURL(path.join(RAW_DIR, 'mobile-servicios.png')).href,
    mobileCalculatorResult: pathToFileURL(path.join(RAW_DIR, 'mobile-calculator-result.png')).href,
  };

  const plates = [
    {
      name: '01-portfolio-hero.png',
      html: buildPlate01HeroHtml(urls),
    },
    {
      name: '02-portfolio-bento.png',
      html: buildPlate02BentoHtml(urls),
    },
    {
      name: '03-portfolio-feature-focus.png',
      html: buildPlate03FeatureFocusHtml(urls),
    },
    {
      name: '04-portfolio-responsive-trio.png',
      html: buildPlate04ResponsiveTrioHtml(urls),
    },
  ];

  const studioContext = await browser.newContext({
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 1,
  });

  const page = await studioContext.newPage();

  for (const plate of plates) {
    const tempHtmlPath = path.join(RAW_DIR, `${plate.name}.html`);
    await fs.writeFile(tempHtmlPath, plate.html, 'utf8');

    await page.goto(pathToFileURL(tempHtmlPath).href, { waitUntil: 'load' });
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              })
        )
      );
    });
    await page.waitForTimeout(250);

    const outPath = path.join(OUT_DIR, plate.name);
    await page.screenshot({
      path: outPath,
      fullPage: false,
    });
    console.log(`  -> Exported: exports/mockups/${plate.name}`);
  }

  await studioContext.close();
}

async function main() {
  const baseUrl = parseBaseUrl();
  const executablePath = resolveChromiumExecutable();

  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });

  try {
    await captureLiveScreenshots(browser, baseUrl);
    await renderPortfolioPlates(browser);
    console.log('\nAll 4 portfolio plates generated in exports/mockups/.');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('Error generating mockups:', err);
  process.exit(1);
});
