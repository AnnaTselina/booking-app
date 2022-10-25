import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@Entity("user")
@ObjectType({})
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({})
  password_hash: string;

  @Column({ default: false })
  @Field(() => Boolean)
  confirmed: boolean;
}
