import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./dto/entities/user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    {
      provide: "USER_SERVICE",
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: "USER_SERVICE",
      useClass: UserService,
    },
  ],
})
export class UserModule {}
