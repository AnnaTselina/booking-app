import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";

const mode = process.env["MODE"] || "dev";
const host = process.env["HOST"] || "localhost";
const devClientPort = process.env["DEV_CLIENT_PORT"] || 3000;
const serverPort = process.env["SERVER_PORT"] || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (mode === "dev") {
    app.enableCors({ origin: `http://${host}:${devClientPort}` });
  }
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: "7aebefb71d3892f17323c6c6af3a7c877",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(serverPort);
}
bootstrap();
