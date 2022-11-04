import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Host } from "./dto/entities/host.entity";
import { HostService } from "./host.service";

@Module({
  imports: [TypeOrmModule.forFeature([Host]), UserModule],
  providers: [HostService],
  exports: [HostService],
})
export class HostModule {}
