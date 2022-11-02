import { Inject, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";
import { LoggedInGuard } from "src/guards/logged-in.guard";
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
  @UseGuards(LoggedInGuard)
  async reserveRentalUnit(
    @Args("reserveRentalUnitInput")
    reserveRentalUnitInput: ReserveRentalUnitInput,
    @Context() context: { req: Express.Request },
  ) {
    try {
      if (!context.req.user) {
        return new GraphQLError("Forbidden resource.", {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 403,
          },
        });
      }
      return await this.rentalUnitService.reserveRentalUnit(
        reserveRentalUnitInput,
        context.req.user.id,
      );
    } catch (e) {
      return e;
    }
  }
}
