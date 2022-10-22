import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import SERVER_ROUTE from "./utils/constants";

const link = createUploadLink({
  uri: `${SERVER_ROUTE}${process.env.REACT_APP_GRAPHQL_ROUTE}`,
  credentials: "same-origin",
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
