import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: `http://${process.env.REACT_APP_HOST}${process.env.REACT_APP_GRAPHQL_ROUTE}`,
  credentials: "same-origin",
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
