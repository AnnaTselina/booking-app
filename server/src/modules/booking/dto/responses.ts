import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetRentalUnitAvailabilityResponse {
  @Field()
  start_date: string;

  @Field()
  end_date: string;
}
