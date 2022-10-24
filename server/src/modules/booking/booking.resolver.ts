import { Args, Query, Resolver } from "@nestjs/graphql";
import { BookingService } from "./booking.service";
import { GetRentalUnitAvailabilityResponse } from "./dto/responses";

@Resolver()
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [GetRentalUnitAvailabilityResponse])
  async getRentalUnitAvailability(
    @Args("id")
    id: string,
  ) {
    const result = await this.bookingService.getRentalUnitAvailability(id);

    return result;
  }
}
