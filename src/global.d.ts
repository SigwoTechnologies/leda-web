declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_LEDA_API_URL: string;
      NEXT_PUBLIC_PINATA_GATEWAY_URL: string;
      NEXT_PUBLIC_NODE_ENV: 'dev' | 'prod' | 'local';
    }
  }
}

export {};
