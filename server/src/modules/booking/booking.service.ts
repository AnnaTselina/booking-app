import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";
import { IUser } from "src/types";
import { BOOKING_STATUSES } from "src/utils/constants";
import { Between, In, LessThan, MoreThan, Not, Repository } from "typeorm";
import { Guest } from "../guest/entities/guest.entity";
import { RentalUnitImage } from "../rental-unit/entities/rental-unit-image.entity";
import { RentalUnit } from "../rental-unit/entities/rental-unit.entity";
import { User } from "../user/dto/entities/user.entity";
import { Booking } from "./entities/booking.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    start: Date,
    end: Date,
    guests: number,
    totalPrice: number,
    rentalUnit: RentalUnit,
    guest: Guest,
  ) {
    const newBooking = this.bookingRepository.create({
      num_guests: guests,
      start_date: start,
      end_date: end,
      total_price: totalPrice,
      rental_unit: rentalUnit,
      guest,
    });

    return await this.bookingRepository.save(newBooking);
  }

  async getRentalUnitAvailability(id: string) {
    return await this.bookingRepository
      .createQueryBuilder("booking")
      .where({ rental_unit: id })
      .select(["booking.start_date", "booking.end_date"])
      .getMany();
  }

  async getBookedRentalUnitsIds(checkIn: Date, checkOut: Date) {
    const result = await this.bookingRepository
      .createQueryBuilder("booking")
      .where({
        start_date: Between(checkIn, checkOut),
      })
      .andWhere({
        start_date: Not(checkOut),
      })
      .orWhere({
        end_date: Between(checkIn, checkOut),
      })
      .andWhere({
        end_date: Not(checkIn),
      })
      .orWhere({
        start_date: LessThan(checkIn),
        end_date: MoreThan(checkOut),
      })
      .orWhere({
        start_date: MoreThan(checkIn),
        end_date: LessThan(checkOut),
      })
      .innerJoinAndSelect("booking.rental_unit", "rental-unit")
      .getMany();

    return result.map((booking) => booking.rental_unit.id);
  }

  async checkIfRentalUnitAvailablable(
    rentalUnitId: string,
    checkIn: Date,
    checkOut: Date,
  ) {
    const result = await this.bookingRepository
      .createQueryBuilder("booking")
      .where({
        rental_unit: rentalUnitId,
      })
      .where({
        start_date: Between(checkIn, checkOut),
      })
      .andWhere({
        start_date: Not(checkOut),
      })
      .orWhere({
        end_date: Between(checkIn, checkOut),
      })
      .andWhere({
        end_date: Not(checkIn),
      })
      .orWhere({
        start_date: LessThan(checkIn),
        end_date: MoreThan(checkOut),
      })
      .orWhere({
        start_date: MoreThan(checkIn),
        end_date: LessThan(checkOut),
      })
      .innerJoinAndSelect("booking.rental_unit", "rental-unit")
      .getOne();

    return !result;
  }

  async getBookingsOfRentalUnits(rentalUnits: string[], status: string) {
    const query = this.bookingRepository
      .createQueryBuilder("booking")
      .where({ rental_unit: In(rentalUnits) })
      .innerJoin("booking.rental_unit", "rental-unit")
      .leftJoinAndMapMany(
        "rental-unit.images",
        RentalUnitImage,
        "rental-unit-image",
        "rental-unit-image.rentalUnitId = rental-unit.id",
      )
      .innerJoin("booking.guest", "guest")
      .leftJoinAndMapOne("guest.user", User, "user", "guest.userId = user.id");

    if (status) {
      query.where("booking.status = :status", { status });
    }

    query.select([
      "booking",
      "booking.rental_unit",
      "booking.guest",
      "rental-unit",
      "rental-unit-image",
      "guest",
      "user",
    ]);

    const result = await query.getMany();

    return result;
  }

  async getBooking(id: string) {
    return await this.bookingRepository.findOne({
      where: {
        id,
      },
    });
  }

  async acceptIncomingBooking(user: IUser, bookingId: string) {
    const ishost = user.is_host;
    if (!ishost) {
      throw new GraphQLError("User is not a host.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    const booking = await this.getBooking(bookingId);
    if (!booking) {
      throw new GraphQLError("Booking does not exist.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    if (booking.status === BOOKING_STATUSES.accept) {
      throw new GraphQLError("Booking is already accepted.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    booking.status = BOOKING_STATUSES.accept;

    const updatedBooking = await this.bookingRepository.save(booking);

    return updatedBooking;
  }
}
