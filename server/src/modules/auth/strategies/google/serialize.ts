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
    // console.log("Serializer User");
    done(null, user.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deserializeUser(payload: any, done: Function) {
    console.log("Deserialize User");
    const user = await this.userService.findUserById(payload);
    //console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
