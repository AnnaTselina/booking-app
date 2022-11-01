import { Injectable, Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { UserService } from "../user/user.service";
import { codes } from "../../error-handling/format-error-graphql";
import {
  confirmEmailLink,
  sendEmail,
} from "src/utils/send-email/send-confirmation-email";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  logger: Logger;

  constructor(private userService: UserService) {
    this.logger = new Logger(AuthService.name);
  }

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

    const user = await this.userService.createUser({ email, password });

    const messageId = await sendEmail(email, await confirmEmailLink(user.id));

    this.logger.log(`Confirmation email send ${messageId}`);

    return true;
  }

  async checkIfUserExistsOrCreateNewUser(userDetails: {
    email: string;
    name?: string;
    password?: string;
  }) {
    let user = await this.userService.findUserByEmail(userDetails.email);

    if (!user) {
      user = await this.userService.createUser({
        ...userDetails,
        confirmed: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...rest } = user;

      return rest;
    }

    return user;
  }

  async validateExistingUser(userDetails: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(userDetails.email);

    if (!user) {
      return null;
    }

    const passwordMatch = await compare(
      userDetails.password,
      user.password_hash,
    );

    if (!passwordMatch) {
      throw new GraphQLError("Passwords not matching", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    if (!user.confirmed) {
      throw new GraphQLError("User not confirmed", {
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
