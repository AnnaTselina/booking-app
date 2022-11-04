import { Module } from "@nestjs/common";
import { RentalUnitService } from "./rental-unit.service";
import { RentalUnitResolver } from "./rental-unit.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { BookingModule } from "../booking/booking.module";
import { GuestModule } from "../guest/guest.module";
import { TypeOfPlace } from "./entities/type-of-place.entity";
import { Amenity } from "./entities/amenity.entity";
import { Country } from "./entities/country.entity";
import { RentalUnitAmenity } from "./entities/rental-unit-amenity.entity";
import { RentalUnitAddress } from "./entities/rental-unit-address.entity";
import { State } from "./entities/state.entity";
import { HostModule } from "../host/host.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RentalUnit,
      RentalUnitImage,
      TypeOfPlace,
      Amenity,
      Country,
      RentalUnitAmenity,
      RentalUnitAddress,
      State,
    ]),
    BookingModule,
    GuestModule,
    HostModule,
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
