import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { GoogleStartegy } from "./strategies/google/google.strategy";
import { SessionSerializer } from "./strategies/serialize";
import { LocalStrategy } from "./strategies/local/local.strategy";
import { GuestModule } from "../guest/guest.module";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    GuestModule,
  ],
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
