/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/modules/user/dto/entities/user.entity";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(payload: string, done: Function) {
    const user = await this.userService.findUserById(payload);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...rest } = user;
      return done(null, rest);
    } else {
      return done(null, null);
    }
  }
}
