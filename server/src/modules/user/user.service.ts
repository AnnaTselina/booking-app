import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./dto/entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser({
    email,
    password,
    name,
  }: {
    email: string;
    password?: string;
    name?: string;
  }) {
    const newUser = this.userRepository.create({
      email,
    });

    if (password) {
      newUser.password_hash = password;
    }

    if (name) {
      newUser.name = name;
    }

    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
