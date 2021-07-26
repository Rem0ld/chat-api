import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { } from "@apollo/client/react";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";

// @ts-ignore
const errorLink: ApolloLink | RequestHandler = onError(
  ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors);
    }
    if (networkError) {
      console.log("networkError", networkError);
    }
  }
);

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
  // @ts-ignore
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

