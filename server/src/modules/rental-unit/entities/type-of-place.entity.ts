import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { ITypeOfPlace } from "../../../types";
import { RentalUnit } from "./rental-unit.entity";

@Entity("type-of-place")
@ObjectType({})
export class TypeOfPlace implements ITypeOfPlace {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({})
  @Field()
  name: string;

  @OneToMany(() => RentalUnit, (rentalUnit) => rentalUnit.type_of_place)
  @Field(() => [RentalUnit], { nullable: true })
  rental_units?: RentalUnit[];
}
