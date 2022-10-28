import { Controller, Get, Redirect, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./strategies/google/guard";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return "google login";
  }

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  @Redirect("/", 303)
  googleRedirect() {
    return "google redirect";
  }

  @Get("status")
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: "Authenticated" };
    } else {
      return { msg: "Not Authenticated" };
    }
  }
}
