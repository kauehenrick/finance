/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}