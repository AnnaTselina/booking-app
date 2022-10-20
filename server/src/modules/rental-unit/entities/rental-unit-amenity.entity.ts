import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { RentalUnit } from "./rental-unit.entity";
import { Amenity } from "./amenity.entity";
import { IRentalUnitAmenity } from "../../../types";

@Entity("rental-unit-amenity")
@ObjectType({})
export class RentalUnitAmenity implements IRentalUnitAmenity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @ManyToOne(() => RentalUnit, (rentalUnit) => rentalUnit.amenities)
  @Field(() => RentalUnit)
  rental_unit: RentalUnit;

  @ManyToOne(() => Amenity, (amenity) => amenity.rental_unit_amenities)
  @Field(() => Amenity)
  amenity: Amenity;
}
