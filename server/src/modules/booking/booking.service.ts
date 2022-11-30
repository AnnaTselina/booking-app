import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, In, LessThan, MoreThan, Not, Repository } from "typeorm";
import { Guest } from "../guest/entities/guest.entity";
import { RentalUnit } from "../rental-unit/entities/rental-unit.entity";
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

  async getBookingsOfRentalUnits(rentalUnits: string[]) {
    return await this.bookingRepository.find({
      where: {
        rental_unit: In(rentalUnits),
      },
    });
  }
}
