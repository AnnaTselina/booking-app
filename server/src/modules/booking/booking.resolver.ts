import { Args, Query, Resolver } from "@nestjs/graphql";
import { BookingService } from "./booking.service";
import { RentalUnitAvailabilityInput } from "./dto/inputs";
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
}
