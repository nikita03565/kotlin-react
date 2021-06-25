import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import PropTypes from "prop-types";

import AuthService from "./AuthService";
import WithAuth from "./WithAuth";
import { tryParseJSONroles } from "./utils";
const Auth = new AuthService();

class Navbar extends Component {
  signal = axios.CancelToken.source();

  state = {};

  static propTypes = {
    username: PropTypes.string,
  };

  componentDidMount() {
    console.log("MOUNT!!!");
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  handleLogout = () => {
    Auth.logout();
    window.location.reload();
  };

  showFor = (roles) => {
    const userRoles = tryParseJSONroles(localStorage.getItem("roles"));
    return userRoles && userRoles.some((userRole) => roles.includes(userRole));
  };

  render() {
    const { username } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {this.showFor(["ROLE_USER"]) && (
                <>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <NavLink className="nav-link" to="/accounts">
                      My Accounts
                    </NavLink>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <NavLink className="nav-link" to="/payments">
                      Payments History
                    </NavLink>
                  </li>
                </>
              )}
              {this.showFor(["ROLE_SUPER"]) && (
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/companies">
                    Companies
                  </NavLink>
                </li>
              )}
              {this.showFor(["ROLE_SUPER", "ROLE_ADMIN"]) && (
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/directory">
                    Employees Directory
                  </NavLink>
                </li>
              )}
            </ul>
            {username ? (
              <div
                style={{
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "0",
                }}
                className="navbar-nav"
              >
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to={`/users/me`}>
                    <AccountCircleIcon />
                  </NavLink>
                </li>
                <div>
                  <span className="navbar-text" style={{ margin: "5px" }}>
                    {username}
                  </span>
                </div>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/"
                  onClick={this.handleLogout}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div
                style={{
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "0",
                }}
                className="navbar-nav"
              >
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default WithAuth(Navbar);
