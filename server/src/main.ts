import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { TypeormStore } from "connect-typeorm/out";
import { SessionEntity } from "./utils/session/session";
import { DataSource } from "typeorm";
import { graphqlUploadExpress } from "graphql-upload";

const mode = process.env["MODE"] || "dev";
const host = process.env["HOST"] || "localhost";
const devClientPort = process.env["DEV_CLIENT_PORT"] || 3000;
const serverPort = process.env["SERVER_PORT"] || 8000;
const sessionSecret = process.env["SESSION_TOKEN_SECRET"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);

  if (mode === "dev") {
    app.enableCors({ origin: `http://${host}:${devClientPort}` });
  }
  app.use(graphqlUploadExpress());
  app.useGlobalPipes(new ValidationPipe());

  if (sessionSecret) {
    app.use(
      session({
        secret: sessionSecret,
        saveUninitialized: false,
        resave: false,
        cookie: {
          maxAge: 60000 * 60, //1 hour
        },
        store: new TypeormStore({ cleanupLimit: 2 }).connect(sessionRepository),
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
  }

  await app.listen(serverPort);
}
bootstrap();
