import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { GraphQLDateTime } from "graphql-scalars";
import { RentalUnit } from "src/modules/rental-unit/entities/rental-unit.entity";
import { Guest } from "src/modules/guest/entities/guest.entity";
import { IBooking } from "src/types";

@Entity("booking")
@ObjectType({})
export class Booking implements IBooking {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field(() => Int)
  num_guests: number;

  @Column({ type: "date" })
  @Field(() => GraphQLDateTime)
  start_date: Date;

  @Column({ type: "date" })
  @Field(() => GraphQLDateTime)
  end_date: Date;

  @Column({ default: "request" })
  @Field()
  status: string;

  @Column({ type: "float" })
  @Field(() => Float)
  total_price: number;

  @ManyToOne(() => RentalUnit, (rentalUnit) => rentalUnit.bookings)
  @Field(() => RentalUnit)
  rental_unit: RentalUnit;

  @ManyToOne(() => Guest, (guest) => guest.bookings)
  @Field(() => Guest)
  guest: Guest;
}
