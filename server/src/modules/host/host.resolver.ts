import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver, Args } from "@nestjs/graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
import { Booking } from "../booking/entities/booking.entity";
import { HostBookingsInput } from "./dto/entities/inputs";
import { HostService } from "./host.service";

@Resolver()
export class HostResolver {
  constructor(private readonly hostService: HostService) {}

  @Query(() => [Booking])
  @UseGuards(LoggedInGuard)
  async getHostBookings(
    @Context() context: { req: Express.Request },
    @Args("hostBookingsInput") hostBookingsInput: HostBookingsInput,
  ) {
    return this.hostService.getHostBookingsByUserId(
      context.req.user!.id,
      hostBookingsInput,
    );
  }
}
