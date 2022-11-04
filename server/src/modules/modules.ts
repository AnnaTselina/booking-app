import { RentalUnitModule } from "./rental-unit/rental-unit.module";
import { BookingModule } from "./booking/booking.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { HostModule } from "./host/host.module";

export default [
  RentalUnitModule,
  BookingModule,
  UserModule,
  AuthModule,
  HostModule,
];
