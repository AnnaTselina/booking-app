import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Matches } from "class-validator";
import { EMAIL_REGEX, PASSWORD_REGEX } from "src/utils/constants";

@InputType({})
export class SignUpInput {
  @Field({})
  @IsNotEmpty()
  @Matches(EMAIL_REGEX, {
    message: "Property 'email' must contain valid email",
  })
  email: string;

  @Field({})
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      "Password must be at least 8 characters long, contain at least one lowercase and one uppercase letter, contain at least one special character.",
  })
  password: string;
}

@InputType({})
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
