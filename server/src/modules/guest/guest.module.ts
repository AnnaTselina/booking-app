import { Module } from "@nestjs/common";
import { GuestService } from "./guest.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestModule {}
