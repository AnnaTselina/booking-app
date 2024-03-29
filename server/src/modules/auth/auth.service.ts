import { Inject, Injectable, Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { UserService } from "../user/user.service";
import { codes } from "../../error-handling/format-error-graphql";
import {
  confirmEmailLink,
  redisConfirmationEmails,
  sendEmail,
} from "src/utils/send-email/send-confirmation-email";
import { compare } from "bcrypt";
import { GuestService } from "../guest/guest.service";

@Injectable()
export class AuthService {
  logger: Logger;

  constructor(
    @Inject("USER_SERVICE") private readonly userService: UserService,
    private guestService: GuestService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async signUp({ email, password }: { email: string; password: string }) {
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
      await this.guestService.addGuest(user);
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

  async confirmEmail(id: string) {
    const userId = await redisConfirmationEmails.get(id);

    if (!userId) {
      throw new GraphQLError("Confirmation id not found.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    const user = await this.userService.updateUser(userId, { confirmed: true });
    await this.guestService.addGuest(user);
    await redisConfirmationEmails.del(id);

    return true;
  }
}
