import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import CustomGraphqlError from "./custom-error";

const formatGraphqlError = (error: ApolloError | CustomGraphqlError) => {
  let returnedError = {
    statusCode: 500,
    message: ["Internal server error"],
  };

  if (error instanceof ApolloError) {
    returnedError = error.extensions.response;
  }

  if (error instanceof GraphQLError && error.extensions.exception?.statusCode) {
    returnedError.statusCode = error.extensions.exception.statusCode;
    returnedError.message = [error.message];
  }

  return returnedError;
};

export default formatGraphqlError;
