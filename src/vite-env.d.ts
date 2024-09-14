/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_ID: string;
    readonly VITE_ENCRIPT_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}