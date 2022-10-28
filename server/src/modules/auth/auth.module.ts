import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { GoogleStartegy } from "./strategies/google/google.strategy";

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService, GoogleStartegy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
