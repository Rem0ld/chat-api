import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
  RequestHandler,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import Home from "components/Home";
import LoadingOrError from "components/LoadingOrError";
import React, { ReactElement, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

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

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

client
  .query({
    query: gql`
      query {
        users {
          id
          username
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

export default function App(): ReactElement {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<LoadingOrError />}>
          <Switch>
            <Home />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}
