import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { IAmenity } from "../../../types";
import { RentalUnitAmenity } from "./rental-unit-amenity.entity";

@Entity("amenity")
@ObjectType({})
export class Amenity implements IAmenity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(
    () => RentalUnitAmenity,
    (rentalUnitAmenity) => rentalUnitAmenity.amenity,
  )
  @Field(() => [RentalUnitAmenity], { nullable: true })
  rental_unit_amenities?: RentalUnitAmenity[];
}
