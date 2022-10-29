import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
import { User } from "./dto/entities/user.entity";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(LoggedInGuard)
  getUser(@Context() context: { req: Express.Request }) {
    return context.req.user;
  }
}
