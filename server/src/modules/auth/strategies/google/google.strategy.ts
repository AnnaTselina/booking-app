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
      clientID:
        "486066992284-0jmmr0s2on7od6qo7uf9jpiusi6ta2me.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/redirect",
      scope: ["profile", "email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log("----------validating user");
    console.log(profile);

    if (!profile.emails) {
      return null;
    }

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });

    console.log("----------- End of validating user (google strategy)");
    console.log(user);

    //TODO: POSSIBLY REMOVE PASSWORD_HASH FROM USER FIELDS

    return user || null;
  }
}
