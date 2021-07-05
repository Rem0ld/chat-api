import React, { ReactElement } from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";
import { useAuth } from "SessionProvider";

export default function PrivateRoute({
  component: Component,
  path,
}: RouteProps): ReactElement {
  const auth = useAuth();

  if (!auth?.user) {
    return <Redirect to="/home" />;
  }

  return <Route component={Component} path={path} />;
}
