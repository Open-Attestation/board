import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home";

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <nav className="py-3 text-white bg-pink-400 font-bold text-center text-2xl">Board</nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
