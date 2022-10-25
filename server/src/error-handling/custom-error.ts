import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";

interface CustomGraphqlErrorExtensions extends GraphQLErrorExtensions {
  exception?: {
    code?: string;
    stacktrace?: ReadonlyArray<string>;
    statusCode?: number;
  };
}

@ObjectType({})
class CustomGraphqlError extends GraphQLError {
  @Field({})
  override message: string;
  extensions: CustomGraphqlErrorExtensions;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.extensions.exception = {
      statusCode: status,
    };
  }
}

export default CustomGraphqlError;
