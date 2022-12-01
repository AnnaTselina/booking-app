import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
import { BookingService } from "./booking.service";
import { RentalUnitAvailabilityInput } from "./dto/inputs";
import { GetRentalUnitAvailabilityResponse } from "./dto/responses";
import { Booking } from "./entities/booking.entity";

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

  @Query(() => Boolean)
  async checkIfRentalUnitAvailable(
    @Args("rentalUnitAvailabilityInput")
    rentalUnitAvailabilityInput: RentalUnitAvailabilityInput,
  ) {
    const result = await this.bookingService.checkIfRentalUnitAvailablable(
      rentalUnitAvailabilityInput.id_rental_unit,
      rentalUnitAvailabilityInput.start_date,
      rentalUnitAvailabilityInput.end_date,
    );

    return result;
  }

  @Mutation(() => Booking)
  @UseGuards(LoggedInGuard)
  async acceptIncomingBooking(
    @Args("bookingId") id: string,
    @Context() context: { req: Express.Request },
  ) {
    return await this.bookingService.acceptIncomingBooking(
      context.req.user!,
      id,
    );
  }
}
