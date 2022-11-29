import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Validate } from "class-validator";
import { GraphQLDateTime } from "graphql-scalars";
import { IsBeforeConstraint } from "src/modules/rental-unit/dto/inputs";

@InputType({})
export class RentalUnitAvailabilityInput {
  @Field()
  @IsNotEmpty()
  id_rental_unit: string;

  @Field(() => GraphQLDateTime)
  @IsNotEmpty()
  @Validate(IsBeforeConstraint, ["end_date"])
  start_date: Date;

  @Field(() => GraphQLDateTime)
  @IsNotEmpty()
  end_date: Date;
}
