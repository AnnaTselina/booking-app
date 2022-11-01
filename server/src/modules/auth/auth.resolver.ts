import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput, SignUpInput } from "./dto/inputs";
import { LocalAuthGuard } from "./strategies/local/guard";

@Resolver()
export class AuthResolver {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthService,
  ) {}
  //Local stategy authentication
  @Mutation(() => Boolean)
  async signUp(@Args("signUpInput") signUpInput: SignUpInput) {
    try {
      await this.authService.signUp(signUpInput);
      return true;
    } catch (e) {
      return e;
    }
  }

  //Local stategy authentication
  @UseGuards(LocalAuthGuard)
  @Mutation(() => Boolean)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Args("loginInput") loginInput: LoginInput) {
    return true;
  }

  //Google strategy authentication
  @Mutation(() => Boolean)
  logout(@Context() context: { req: Express.Request }) {
    try {
      context.req.session.destroy((err) => {
        if (err) {
          return err;
        }
      });
      return true;
    } catch (e) {
      return e;
    }
  }
}
