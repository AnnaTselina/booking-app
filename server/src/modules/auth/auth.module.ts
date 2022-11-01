import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { GoogleStartegy } from "./strategies/google/google.strategy";
import { SessionSerializer } from "./strategies/google/serialize";
import { LocalStrategy } from "./strategies/local/local.strategy";

@Module({
  imports: [UserModule],
  providers: [
    AuthResolver,
    GoogleStartegy,
    LocalStrategy,
    SessionSerializer,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
