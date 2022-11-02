import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { In, Not, Repository } from "typeorm";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { Country } from "./entities/country.entity";
import { State } from "./entities/state.entity";
import { Amenity } from "./entities/amenity.entity";
import { ReserveRentalUnitInput } from "./dto/inputs";
import { BookingService } from "../booking/booking.service";
import { GuestService } from "../guest/guest.service";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";

@Injectable()
export class RentalUnitService {
  constructor(
    @InjectRepository(RentalUnit)
    private rentalUnitRepository: Repository<RentalUnit>,

    @InjectRepository(RentalUnitImage)
    private rentalUnitImageRepository: Repository<RentalUnitImage>,

    private bookingService: BookingService,
    private guestService: GuestService,
  ) {}

  async getRentalUnits(
    destination?: string,
    checkIn?: string,
    checkOut?: string,
  ) {
    let bookedRentalUnitsIds: string[] = [];

    if (checkIn && checkOut) {
      bookedRentalUnitsIds = await this.bookingService.getBookedRentalUnitsIds(
        new Date(checkIn),
        new Date(checkOut),
      );
    }

    const query = this.rentalUnitRepository.createQueryBuilder("rental-unit");

    query
      .innerJoin("rental-unit.images", "rental-unit-image")
      .innerJoin("rental-unit.type_of_place", "type-of-place")
      .innerJoin("rental-unit.address", "rental-unit-address")
      .leftJoin("rental-unit.bookings", "booking")
      .leftJoinAndMapOne(
        "rental-unit-address.country",
        Country,
        "country",
        "rental-unit-address.countryId = country.id",
      );

    if (destination) {
      query
        .where("LOWER(rental-unit-address.city) = :city", {
          city: destination.toLowerCase(),
        })
        .orWhere("LOWER(country.name) = :country", {
          country: destination.toLowerCase(),
        });
    }

    if (bookedRentalUnitsIds.length) {
      query.where({ id: Not(In(bookedRentalUnitsIds)) });
    }

    query.select([
      "rental-unit",
      "rental-unit-image",
      "type-of-place",
      "rental-unit-address",
      "country",
      "booking",
    ]);

    const result = await query.getMany();

    return result;
  }

  async getRentalUnit(id: string) {
    const result = await this.rentalUnitRepository
      .createQueryBuilder("rental-unit")
      .where({ id })
      .innerJoin("rental-unit.images", "rental-unit-image")
      .innerJoin("rental-unit.type_of_place", "type-of-place")
      .innerJoin("rental-unit.address", "rental-unit-address")
      .innerJoin("rental-unit.amenities", "rental-unit-amenity")
      .leftJoinAndMapOne(
        "rental-unit-address.country",
        Country,
        "country",
        "rental-unit-address.countryId = country.id",
      )
      .leftJoinAndMapOne(
        "rental-unit-address.state",
        State,
        "state",
        "rental-unit-address.stateId = state.id",
      )
      .leftJoinAndMapOne(
        "rental-unit-amenity.amenity",
        Amenity,
        "amenity",
        "rental-unit-amenity.amenityId = amenity.id",
      )
      .select([
        "rental-unit",
        "type-of-place",
        "rental-unit-image",
        "rental-unit-address",
        "rental-unit-address.country",
        "country",
        "state",
        "rental-unit-amenity",
        "amenity",
      ])
      .getOne();

    return result;
  }

  async reserveRentalUnit(
    reserveRentalUnitInput: ReserveRentalUnitInput,
    userId: string,
  ) {
    const rentalUnit = await this.getRentalUnit(
      reserveRentalUnitInput.id_rental_unit,
    );
    const guest = await this.guestService.getGuestByUserId(userId);

    if (!guest) {
      throw new GraphQLError("Can't find guest.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    if (!rentalUnit) {
      throw new GraphQLError(
        `No rental unit with id = ${reserveRentalUnitInput.id_rental_unit}`,
        {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 400,
          },
        },
      );
    }
    if (
      reserveRentalUnitInput.num_guests > rentalUnit.max_guests ||
      reserveRentalUnitInput.num_guests < 1
    ) {
      throw new GraphQLError(
        "Number of guests exceeds maximum for rental unit.",
        {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 400,
          },
        },
      );
    }

    const result = await this.bookingService.createBooking(
      reserveRentalUnitInput.start_date,
      reserveRentalUnitInput.end_date,
      reserveRentalUnitInput.num_guests,
      reserveRentalUnitInput.total_price,
      rentalUnit,
      guest,
    );

    return result;
  }
}
