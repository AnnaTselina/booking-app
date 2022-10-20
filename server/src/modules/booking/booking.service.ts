import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    rentalUnit: RentalUnit,
  ) {
    const newBooking = this.bookingRepository.create({
      num_guests: guests,
      start_date: start,
      end_date: end,
      rental_unit: rentalUnit,
    });

    return await this.bookingRepository.save(newBooking);
  }
}
