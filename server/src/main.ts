import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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

  await app.listen(serverPort);
}
bootstrap();
