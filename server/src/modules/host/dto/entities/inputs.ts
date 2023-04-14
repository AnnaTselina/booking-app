import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsOptional } from "class-validator";
import { BOOKING_STATUSES } from "../../../../utils/constants";

@InputType({})
export class HostBookingsInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(Object.values(BOOKING_STATUSES))
  status: string;
}
