/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_SHOW_PROMO_DUCHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
