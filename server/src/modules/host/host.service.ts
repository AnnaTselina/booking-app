import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";
import { Repository } from "typeorm";
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
  ) {}

  async getHostByUserId(user: User) {
    const host = await this.hostRepository.findOneBy({ user });
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

    let host = await this.getHostByUserId(user);

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
}
