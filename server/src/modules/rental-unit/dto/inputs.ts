import { Field, Float, InputType, Int } from "@nestjs/graphql";
import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsNotEmpty,
  IsPositive,
  Min,
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
} from "class-validator";
import { GraphQLDateTime } from "graphql-scalars";
import { GraphQLUpload, FileUpload } from "graphql-upload";

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

@InputType({})
export class AddRentalUnitInput {
  @Field({})
  @IsNotEmpty()
  type_of_place_id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  max_guests: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  num_bedrooms: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  num_beds: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  num_bathrooms: number;

  @Field({})
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  title: string;

  @Field({})
  @IsNotEmpty()
  @IsString()
  @MinLength(150)
  @MaxLength(300)
  description: string;

  @Field({})
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  price: number;

  @Field(() => [String])
  @IsArray()
  amenities_ids: string[];

  @Field({})
  @IsNotEmpty()
  @IsString()
  id_country: string;

  @Field({})
  @IsString()
  id_state: string;

  @Field({})
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field({})
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field({})
  @IsNotEmpty()
  @IsString()
  zip: string;

  @Field({})
  @IsNotEmpty()
  @IsString()
  apartment: string;

  @Field(() => [GraphQLUpload])
  @IsNotEmpty()
  @IsArray()
  images: FileUpload[];
}
