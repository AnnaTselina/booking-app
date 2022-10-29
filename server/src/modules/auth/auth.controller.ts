/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Redirect, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./strategies/google/guard";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  @Redirect("/", 303)
  googleRedirect() {}
}
