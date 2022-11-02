import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/modules/user/dto/entities/user.entity";
import { Booking } from "src/modules/booking/entities/booking.entity";

@Entity("guest")
@ObjectType({})
export class Guest {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field()
  user: User;

  @OneToMany(() => Booking, (booking) => booking.guest)
  @Field(() => [Booking])
  bookings: [Booking];
}
