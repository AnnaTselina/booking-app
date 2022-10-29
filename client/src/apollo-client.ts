import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { SERVER_ROUTE } from "./utils/constants";

export const userVar = makeVar<null | string>(null);

const link = createUploadLink({
  uri: `${SERVER_ROUTE}${process.env.REACT_APP_GRAPHQL_ROUTE}`,
  credentials: "same-origin",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return userVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
