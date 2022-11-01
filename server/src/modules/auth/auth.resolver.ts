import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "../user/dto/entities/user.entity";
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
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => Boolean)
  async confirmUser(
    @Args("id")
    id: string,
  ) {
    return await this.authService.confirmEmail(id);
  }

  //Local stategy authentication
  @UseGuards(LocalAuthGuard)
  @Mutation(() => User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() context: { req: Express.Request },
  ) {
    return context.req.user;
  }

  //Google strategy authentication
  @Mutation(() => Boolean)
  logout(@Context() context: { req: Express.Request }) {
    context.req.session.destroy((err) => {
      if (err) {
        return err;
      }
    });
    return true;
  }
}
