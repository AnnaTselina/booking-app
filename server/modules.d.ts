declare namespace NodeJS {
  interface ProcessEnv {
    DB: "postgres";
    DB_PORT: number;
  }
}

declare global {
  namespace Express {
    interface Session {
      user?: User;
    }
  }
}
