import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { UserService } from "../user/user.service";
import { codes } from "../../error-handling/format-error-graphql";

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private userService: UserService) {}

  async signUp({ email, password }: { email: string; password: string }) {
    //check if user with provided email exists
    const checkIfExists = await this.userService.findUserByEmail(email);

    if (checkIfExists) {
      throw new GraphQLError("User with provided email already exists.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    await this.userService.createUser({ email, password });

    return true;
  }
}
