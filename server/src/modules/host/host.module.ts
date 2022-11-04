import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { HostRentalUnits } from "./dto/entities/host-rental-units.entity";
import { Host } from "./dto/entities/host.entity";
import { HostService } from "./host.service";

@Module({
  imports: [TypeOrmModule.forFeature([Host, HostRentalUnits]), UserModule],
  providers: [HostService],
  exports: [HostService],
})
export class HostModule {}
