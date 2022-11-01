import { Inject } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Booking } from "../booking/entities/booking.entity";
import { GetRentalUnitsInput, ReserveRentalUnitInput } from "./dto/inputs";
import { RentalUnit } from "./entities/rental-unit.entity";
import { RentalUnitService } from "./rental-unit.service";

@Resolver()
export class RentalUnitResolver {
  constructor(
    @Inject("RENTAL_UNIT_SERVICE")
    private readonly rentalUnitService: RentalUnitService,
  ) {}

  @Query(() => [RentalUnit])
  async getRentalUnits(
    @Args("getRentalUnitsInput") getRentalUnitsInput: GetRentalUnitsInput,
  ) {
    const result = await this.rentalUnitService.getRentalUnits(
      getRentalUnitsInput.destination,
      getRentalUnitsInput.checkin,
      getRentalUnitsInput.checkout,
    );

    return result;
  }

  @Query(() => RentalUnit, { nullable: true })
  async getRentalUnit(
    @Args("id")
    id: string,
  ) {
    const result = await this.rentalUnitService.getRentalUnit(id);

    return result;
  }

  @Mutation(() => Booking)
  async reserveRentalUnit(
    @Args("reserveRentalUnitInput")
    reserveRentalUnitInput: ReserveRentalUnitInput,
  ) {
    try {
      return await this.rentalUnitService.reserveRentalUnit(
        reserveRentalUnitInput,
      );
    } catch (e) {
      return e;
    }
  }
}
