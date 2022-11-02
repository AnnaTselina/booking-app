import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entity";
import { Repository } from "typeorm";
import { User } from "../user/dto/entities/user.entity";

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  async addGuest(user: User) {
    return await this.guestRepository.save({ user });
  }
}
