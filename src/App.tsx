import Home from "components/Home";
import LoadingOrError from "components/LoadingOrError";
import React, { ReactElement, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Home />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
