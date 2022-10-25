import { Injectable } from "@nestjs/common";
import CustomGraphqlError from "src/error-handling/custom-error";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private userService: UserService) {}

  async signUp({ email, password }: { email: string; password: string }) {
    //check if user with provided email exists
    const checkIfExists = await this.userService.findUserByEmail(email);

    if (checkIfExists) {
      throw new CustomGraphqlError(
        "User with provided email already exists",
        400,
      );
    }

    await this.userService.createUser({ email, password });

    return true;
  }
}
