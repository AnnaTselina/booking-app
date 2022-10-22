import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { GraphQLDateTime } from "graphql-scalars";
import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsNotEmpty,
  IsPositive,
  Min,
} from "class-validator";

@ValidatorConstraint({ name: "isBefore", async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = args.object as any;
    return propertyValue < obj[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be before ${args.constraints[0]}`;
  }
}

@InputType({})
export class ReserveRentalUnitInput {
  @Field()
  @IsNotEmpty()
  id_rental_unit: string;

  @Field(() => Int)
  @IsNotEmpty()
  num_guests: number;

  @Field(() => GraphQLDateTime)
  @IsNotEmpty()
  @Validate(IsBeforeConstraint, ["end_date"])
  start_date: Date;

  @Field(() => Float)
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  total_price: number;

  @Field(() => GraphQLDateTime)
  @IsNotEmpty()
  end_date: Date;
}
@InputType({})
export class GetRentalUnitsInput {
  @Field(() => String, { nullable: true })
  destination?: string;

  @Field(() => String, { nullable: true })
  checkin?: string;

  @Field(() => String, { nullable: true })
  checkout?: string;
}
