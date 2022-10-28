import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignUpInput } from "./dto/inputs";

@Resolver()
export class AuthResolver {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthService,
  ) {}

  @Mutation(() => Boolean)
  async signUp(@Args("signUpInput") signUpInput: SignUpInput) {
    try {
      await this.authService.signUp(signUpInput);
      return true;
    } catch (e) {
      return e;
    }
  }
}
