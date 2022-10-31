import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../../auth.service";

@Injectable()
export class GoogleStartegy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env["AUTH_GOOGLE_CLIENT_ID"],
      clientSecret: process.env["AUTH_GOOGLE_CLIENT_SECRET"],
      callbackURL: `http://${process.env["HOST"]}:${process.env["SERVER_PORT"]}/auth/google/redirect`,
      scope: ["profile", "email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile.emails) {
      return null;
    }

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });

    return user || null;
  }
}
