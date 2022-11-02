import { Module } from "@nestjs/common";
import { RentalUnitService } from "./rental-unit.service";
import { RentalUnitResolver } from "./rental-unit.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { BookingModule } from "../booking/booking.module";
import { GuestModule } from "../guest/guest.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RentalUnit, RentalUnitImage]),
    BookingModule,
    GuestModule,
  ],
  providers: [
    RentalUnitResolver,
    {
      provide: "RENTAL_UNIT_SERVICE",
      useClass: RentalUnitService,
    },
  ],
})
export class RentalUnitModule {}
