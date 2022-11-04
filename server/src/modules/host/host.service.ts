import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { Host } from "./dto/entities/host.entity";

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private hostRepository: Repository<Host>,

    @Inject("USER_SERVICE") private readonly userService: UserService,
  ) {}
}
