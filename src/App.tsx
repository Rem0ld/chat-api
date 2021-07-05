import { ApolloProvider } from "@apollo/client";
import Chat from "components/Chat/Chat";
import Home from "components/Home";
import LoadingOrError from "components/LoadingOrError";
import PrivateRoute from "PrivateRoute";
import React, { ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "SessionProvider";
import { client } from "./api/context";

export default function App(): ReactElement {
  return (
    <ApolloProvider client={client}>
      <ProvideAuth>
        <BrowserRouter>
          <Suspense fallback={<LoadingOrError />}>
            <Switch>
              <PrivateRoute path="/chat" component={Chat} />
              <Route path="/home" component={Home} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ProvideAuth>
    </ApolloProvider>
  );
}
