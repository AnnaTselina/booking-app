import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { State } from "./state.entity";
import { Country } from "./country.entity";
import { IRentalUnitAddress } from "src/types";

@Entity("rental-unit-address")
@ObjectType({})
export class RentalUnitAddress implements IRentalUnitAddress {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({})
  @Field()
  city: string;

  @Column({})
  @Field()
  zip: string;

  @Column({})
  @Field()
  street: string;

  @Column({})
  @Field()
  apartment: string;

  @ManyToOne(() => State, (state) => state.rental_units_adresses)
  @Field(() => State, { nullable: true })
  state: State;

  @ManyToOne(() => Country, (country) => country.rental_units_adresses)
  @Field(() => Country, { nullable: true })
  country: Country;
}
