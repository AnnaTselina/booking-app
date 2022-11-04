import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  //  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/modules/user/dto/entities/user.entity";
// import { HostRentalUnits } from "../entities/host-rental-units.entity";

@Entity("host")
@ObjectType({})
export class Host {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field()
  user: User;

  /*@OneToMany(() => HostRentalUnits, (hostRentalUnit) => hostRentalUnit.host)
    @Field(() => [HostRentalUnits], { nullable: true })
    rental_units?: HostRentalUnits[];*/
}
