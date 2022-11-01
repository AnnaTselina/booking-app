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
    confirmed,
  }: {
    email: string;
    password?: string;
    name?: string;
    confirmed?: boolean;
  }) {
    const newUser = this.userRepository.create({
      email,
      confirmed,
    });

    if (password) {
      newUser.password_hash = password;
    } else {
      newUser.confirmed = true;
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

  async updateUser(userId: string, updateData: IUpdateUserPayload) {
    const result = await this.userRepository
      .createQueryBuilder()
      .update("user")
      .set(updateData)
      .where("id = :userId", { userId })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}

interface IUpdateUserPayload {
  confirmed?: boolean;
  is_host?: boolean;
}
