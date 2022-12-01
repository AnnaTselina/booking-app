import { IUser } from "src/types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: "postgres";
      DB_PORT: number;
    }
  }

  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
