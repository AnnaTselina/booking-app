import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";
import { Repository } from "typeorm";
import { BookingService } from "../booking/booking.service";
import { RentalUnit } from "../rental-unit/entities/rental-unit.entity";
import { User } from "../user/dto/entities/user.entity";
import { UserService } from "../user/user.service";
import { HostRentalUnits } from "./dto/entities/host-rental-units.entity";
import { Host } from "./dto/entities/host.entity";

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private hostRepository: Repository<Host>,

    @InjectRepository(HostRentalUnits)
    private hostRentalUnitsRepository: Repository<HostRentalUnits>,

    @Inject("USER_SERVICE") private readonly userService: UserService,
    private readonly bookingService: BookingService,
  ) {}

  async getHostByUserId(userId: string) {
    const host = await this.hostRepository
      .createQueryBuilder("host")
      .where({ user: userId })
      .getOne();
    return host || null;
  }

  async addNewHost(user: User) {
    const host = this.hostRepository.create({ user });
    const result = await this.hostRepository.save(host);
    return result;
  }

  async assignRentalUnitToHost(
    userInfo: { id: string; email: string },
    rentalUnit: RentalUnit,
  ) {
    const user = await this.userService.findUserById(userInfo.id);

    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 403,
        },
      });
    }

    let host = await this.getHostByUserId(user.id);

    if (!host) {
      host = await this.addNewHost(user);
      await this.userService.updateUser(userInfo.id, { is_host: true });
    }

    const hostRentalUnit = this.hostRentalUnitsRepository.create({
      host,
      rental_unit: rentalUnit,
    });

    await this.hostRentalUnitsRepository.save(hostRentalUnit);
  }

  async getHostRentalUnits(hostId: string) {
    return await this.hostRentalUnitsRepository
      .createQueryBuilder("host-rental-units")
      .innerJoin("host-rental-units.host", "host")
      .innerJoin("host-rental-units.rental_unit", "rental-unit")
      .where({ host: hostId })
      .select([
        "host-rental-units",
        "host-rental-units.host",
        "host",
        "host-rental-units.rental_unit",
        "rental-unit",
      ])
      .getMany();
  }

  async getHostBookingsByUserId(userId: string) {
    const host = await this.getHostByUserId(userId);

    const hostRentalUnits = await this.getHostRentalUnits(host!.id);

    const rentalUnitsIds = hostRentalUnits.map(
      (hostRentalUnit) => hostRentalUnit.rental_unit?.id,
    );

    const bookings = await this.bookingService.getBookingsOfRentalUnits(
      rentalUnitsIds,
    );

    return bookings;
  }
}
