import { Module } from "@nestjs/common";
import { RentalUnitService } from "./rental-unit.service";
import { RentalUnitResolver } from "./rental-unit.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { BookingModule } from "../booking/booking.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RentalUnit, RentalUnitImage]),
    BookingModule,
  ],
  providers: [RentalUnitResolver, RentalUnitService],
})
export class RentalUnitModule {}
