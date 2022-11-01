import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { GraphQLError } from "graphql";
import { Strategy } from "passport-local";
import { codes } from "src/error-handling/format-error-graphql";
import { AuthService } from "../../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateExistingUser({
      email: username,
      password,
    });

    if (!user) {
      throw new GraphQLError("User does not exist", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    return user;
  }
}
