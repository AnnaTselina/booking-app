import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStartegy extends PassportStrategy(Strategy) {
  constructor() {
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
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
  }
}
