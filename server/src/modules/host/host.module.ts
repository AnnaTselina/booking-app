import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingModule } from "../booking/booking.module";
import { UserModule } from "../user/user.module";
import { HostRentalUnits } from "./dto/entities/host-rental-units.entity";
import { Host } from "./dto/entities/host.entity";
import { HostResolver } from "./host.resolver";
import { HostService } from "./host.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Host, HostRentalUnits]),
    UserModule,
    BookingModule,
  ],
  providers: [HostService, HostResolver],
  exports: [HostService],
})
export class HostModule {}
