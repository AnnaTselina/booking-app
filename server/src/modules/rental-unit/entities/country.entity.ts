import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { ICountry } from "../../../types";
import { State } from "./state.entity";
import { RentalUnitAddress } from "./rental-unit-address.entity";

@Entity("country")
@ObjectType({})
export class Country implements ICountry {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column({})
  @Field()
  name: string;

  @Column({ default: false })
  @Field()
  has_states: boolean;

  @OneToMany(() => State, (state) => state.country)
  @Field(() => [State], { nullable: true })
  states?: State[];

  @OneToMany(
    () => RentalUnitAddress,
    (rentalUnitAddress) => rentalUnitAddress.country,
  )
  @Field(() => [RentalUnitAddress])
  rental_units_adresses: RentalUnitAddress[];
}
