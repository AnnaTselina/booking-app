import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";

export const codes = {
  internal_server_error: "INTERNAL_SERVER_ERROR",
  bad_user_input: "BAD_USER_INPUT",
};

export const formatGraphqlError = (error: GraphQLError | ApolloError) => {
  const returnedError = {
    error: codes.internal_server_error,
    message: ["Internal server error"],
    statusCode: 500,
  };

  if (error instanceof ApolloError) {
    returnedError.message = error.extensions.response.message;
    returnedError.statusCode = error.extensions.response.statusCode;
    returnedError.error = codes.bad_user_input;
  }

  if (
    error instanceof GraphQLError &&
    error.extensions.custom &&
    error.extensions.code &&
    error.extensions.status
  ) {
    returnedError.message = [error.message];
    returnedError.error = error.extensions.code as string;
    returnedError.statusCode = error.extensions.status as number;
  }

  return returnedError;
};
