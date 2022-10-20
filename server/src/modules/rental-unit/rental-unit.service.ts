import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { Repository } from "typeorm";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { Country } from "./entities/country.entity";
import { State } from "./entities/state.entity";
import { Amenity } from "./entities/amenity.entity";
import { ReserveRentalUnitInput } from "./dto/inputs";
import { BookingService } from "../booking/booking.service";

@Injectable()
export class RentalUnitService {
  constructor(
    @InjectRepository(RentalUnit)
    private rentalUnitRepository: Repository<RentalUnit>,

    @InjectRepository(RentalUnitImage)
    private rentalUnitImageRepository: Repository<RentalUnitImage>,

    private bookingService: BookingService,
  ) {}

  async getRentalUnits(
    destination?: string,
    checkIn?: string,
    checkOut?: string,
  ) {
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

    if (checkIn && checkOut) {
      query
        .where("booking.rentalUnitId IS NULL")
        .orWhere("booking.start_date >= :checkOut", {
          checkOut: `${checkOut} 00:00:00`,
        })
        .orWhere("booking.end_date <= :checkIn", {
          checkIn: `${checkIn} 00:00:00`,
        });
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

  async reserveRentalUnit(reserveRentalUnitInput: ReserveRentalUnitInput) {
    const rentalUnit = await this.getRentalUnit(
      reserveRentalUnitInput.id_rental_unit,
    );
    if (!rentalUnit) {
      throw new Error(
        `No rental unit with id = ${reserveRentalUnitInput.id_rental_unit}`,
      );
    }
    if (
      reserveRentalUnitInput.num_guests > rentalUnit.max_guests ||
      reserveRentalUnitInput.num_guests < 1
    ) {
      throw new Error("Number of guests exceeds maximum for rental unit.");
    }

    const result = await this.bookingService.createBooking(
      reserveRentalUnitInput.start_date,
      reserveRentalUnitInput.end_date,
      reserveRentalUnitInput.num_guests,
      rentalUnit,
    );

    return result;
  }
}
