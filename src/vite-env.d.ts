/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLACES_KEY: string;
  readonly VITE_POSTHOG_KEY: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_PWA_INJECT_MANIFEST: string;
  readonly VITE_BUILD_TIME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}