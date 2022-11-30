import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { IUser } from "src/types";

@Entity("user")
@ObjectType({})
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ default: false })
  @Field(() => Boolean)
  confirmed: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  is_host: boolean;
}
