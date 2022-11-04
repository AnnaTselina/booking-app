import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { Host } from "./host.entity";
import { RentalUnit } from "src/modules/rental-unit/entities/rental-unit.entity";

@Entity("host-rental-units")
@ObjectType({})
export class HostRentalUnits {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @ManyToOne(() => Host, (host) => host.rental_units)
  @Field(() => Host, { nullable: true })
  host: Host;

  @OneToOne(() => RentalUnit)
  @JoinColumn()
  @Field()
  rental_unit: RentalUnit;
}
