import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
import { Booking } from "../booking/entities/booking.entity";
import { HostService } from "./host.service";

@Resolver()
export class HostResolver {
  constructor(private readonly hostService: HostService) {}

  @Query(() => [Booking])
  @UseGuards(LoggedInGuard)
  async getHostBookings(@Context() context: { req: Express.Request }) {
    return this.hostService.getHostBookingsByUserId(context.req.user!.id);
  }
}
