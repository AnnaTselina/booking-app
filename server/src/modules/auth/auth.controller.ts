import { Controller, Get } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  googleLogin() {
    return "google login";
  }

  @Get("google/redirect")
  googleRedirect() {
    return "google redirect";
  }
}
