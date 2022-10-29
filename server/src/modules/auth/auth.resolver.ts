import { Inject } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
// import { LoggedInGuard } from "src/guards/logged-in.guard";
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
