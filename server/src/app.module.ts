import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloDriver } from "@nestjs/apollo";
import modules from "./modules/modules";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, "..", ".env"),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      exclude: [`${process.env["GRAPHQL_PATH"]}`],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "./schema.gql"),
      cors: {
        credentials: true,
        origin: true,
      },
      context: ({ req, res }: { req: Request; res: Response }) => {
        return { req, res };
      },
      playground: {
        settings: {
          "editor.theme": "dark",
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env["DB"],
      port: process.env["DB_PORT"],
      host: process.env["DB_HOST"],
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DATABASE_NAME"],
      synchronize: true,
      entities: [`${__dirname}/modules/**/entities/*.entity{.ts,.js}`],
      subscribers: [`${__dirname}/subscribers/*.subscriber{.ts,.js}`],
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
