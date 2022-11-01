import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
import { User } from "./dto/entities/user.entity";

@Resolver()
export class UserResolver {
  @Query(() => User)
  @UseGuards(LoggedInGuard)
  getUser(@Context() context: { req: Express.Request }) {
    return context.req.user;
  }
}
