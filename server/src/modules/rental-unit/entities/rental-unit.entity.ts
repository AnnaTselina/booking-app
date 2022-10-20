import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { IRentalUnit } from "../../../types";
import { RentalUnitImage } from "./rental-unit-image.entity";
import { TypeOfPlace } from "./type-of-place.entity";
import { RentalUnitAmenity } from "./rental-unit-amenity.entity";
import { RentalUnitAddress } from "./rental-unit-address.entity";
import { Booking } from "src/modules/booking/entities/booking.entity";

@Entity("rental-unit")
@ObjectType({})
export class RentalUnit implements IRentalUnit {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({})
  @Field(() => Int)
  max_guests: number;

  @Column({})
  @Field(() => Int)
  num_bedrooms: number;

  @Column({})
  @Field(() => Int)
  num_beds: number;

  @Column({})
  @Field(() => Int)
  num_bathrooms: number;

  @Column({})
  @Field()
  title: string;

  @Column({})
  @Field()
  description: string;

  @Column({ type: "float" })
  @Field(() => Float)
  price: number;

  @Column({ nullable: true, default: null, type: "float" })
  @Field(() => Float, { nullable: true })
  total_rating: number;

  @ManyToOne(() => TypeOfPlace, (typeOfPlace) => typeOfPlace.rental_units)
  @Field(() => TypeOfPlace)
  type_of_place: TypeOfPlace;

  @OneToMany(
    () => RentalUnitAmenity,
    (rentalUnitAmenity) => rentalUnitAmenity.rental_unit,
  )
  @Field(() => [RentalUnitAmenity], { nullable: true })
  amenities: RentalUnitAmenity[];

  @OneToMany(
    () => RentalUnitImage,
    (rentalUnitImage) => rentalUnitImage.rental_unit,
  )
  @Field(() => [RentalUnitImage], { nullable: true })
  images: RentalUnitImage[];

  @OneToOne(() => RentalUnitAddress)
  @JoinColumn()
  @Field()
  address: RentalUnitAddress;

  @OneToMany(() => Booking, (booking) => booking.rental_unit)
  @Field(() => [Booking])
  bookings: [Booking];
}
