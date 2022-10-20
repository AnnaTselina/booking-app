import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLDateTime } from "graphql-scalars";
import { RentalUnit } from "src/modules/rental-unit/entities/rental-unit.entity";

@Entity("booking")
@ObjectType({})
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field(() => Int)
  num_guests: number;

  @Column()
  @Field(() => GraphQLDateTime)
  start_date: Date;

  @Column()
  @Field(() => GraphQLDateTime)
  end_date: Date;

  @Column({ default: "request" })
  @Field()
  status: string;

  @ManyToOne(() => RentalUnit, (rentalUnit) => rentalUnit.bookings)
  @Field(() => RentalUnit)
  rental_unit: RentalUnit;
}
