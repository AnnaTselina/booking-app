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

  async validateUser(details: { email: string; name: string }) {
    // console.log("------------Auth service validate user");
    // console.log(details);

    const user = await this.userService.findUserByEmail(details.email);

    // console.log("-------------Trying to find if user is in database.........");
    // console.log(user);

    if (user) return user;

    // console.log("User not found");

    const newUser = await this.userService.createUser(details);

    // console.log(`Created new user: ${newUser}`);

    return newUser;
  }
}
