declare namespace NodeJS {
  interface ProcessEnv {
    DB: "postgres";
    DB_PORT: number;
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}
