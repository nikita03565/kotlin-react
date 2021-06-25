import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./AuthManagement/SignIn";
import SignUp from "./AuthManagement/SignUp";
import NotFound from "./NotFound";
import Home from "./Home";
import Users from "./Users";
import Accounts from "./Accounts";
import Companies from "./Companies";
import Payments from "./Payments";
import UserDetail from "./Users/UserDetail";
import { tryParseJSONroles } from "./utils";
import history from "./history";
import Navbar from "./Navbar";

function Router() {
  const showFor = (roles) => {
    const userRoles = tryParseJSONroles(localStorage.getItem("roles"));
    return userRoles && userRoles.some((userRole) => roles.includes(userRole));
  };

  return (
    <BrowserRouter history={history}>
      <div>
        <Navbar />
        <div className="">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={UserDetail} />
            {showFor(["ROLE_USER"]) && (
              <>
                <Route exact path="/accounts" component={Accounts} />
                <Route exact path="/payments" component={Payments} />
              </>
            )}
            {showFor(["ROLE_ADMIN", "ROLE_SUPER"]) && (
              <Route exact path="/directory" component={Users} />
            )}
            {showFor(["ROLE_SUPER"]) && (
              <Route exact path="/companies" component={Companies} />
            )}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
