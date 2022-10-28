import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./strategies/google/guard";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return "google login";
  }

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleRedirect() {
    return "google redirect";
  }
}
