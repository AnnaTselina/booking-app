import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { RentalUnit } from "./rental-unit.entity";
import { IRentalUnitImage } from "../../../types";

@Entity("rental-unit-image")
@ObjectType({})
export class RentalUnitImage implements IRentalUnitImage {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({})
  @Field({})
  image_path: string;

  @ManyToOne(() => RentalUnit, (rentalUnit) => rentalUnit.images)
  @Field(() => RentalUnit)
  rental_unit: RentalUnit;
}
