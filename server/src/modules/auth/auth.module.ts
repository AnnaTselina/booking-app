import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
