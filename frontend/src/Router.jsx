import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./AuthManagement/SignIn";
import SignUp from "./AuthManagement/SignUp";
import NotFound from "./NotFound";
import Home from "./Home";
import Users from "./Users";
import Accounts from "./Accounts";
import UserDetail from "./Users/UserDetail";
import { tryParseJSONroles } from "./utils";
import history from "./history";

function Router() {
  
  const showFor = (roles) => {
    const userRoles = tryParseJSONroles(localStorage.getItem("roles"));
    return (
      userRoles && userRoles.some((userRole) => roles.includes(userRole))
    );
  };

  return (
    <BrowserRouter history={history}>
      <div style={{ margin: 20 }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserDetail} />
          <Route exact path="/accounts" component={Accounts} />
          {showFor(["ROLE_ADMIN"]) && (
            <Route exact path="/directory" component={Users} />
          )}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Router;
