import { Field, ObjectType } from "@nestjs/graphql";
import { IState } from "../../../types";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Country } from "./country.entity";
import { RentalUnitAddress } from "./rental-unit-address.entity";

@Entity("state")
@ObjectType({})
export class State implements IState {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @ManyToOne(() => Country, (country) => country.states)
  @Field(() => Country)
  country: Country;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @OneToMany(
    () => RentalUnitAddress,
    (rentalUnitAddress) => rentalUnitAddress.state,
  )
  @Field(() => [RentalUnitAddress])
  rental_units_adresses: RentalUnitAddress[];
}
