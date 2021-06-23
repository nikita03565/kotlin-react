import React, { Component } from "react";
import { Card, CardContent, Button, TextField } from "@material-ui/core";
// import styles from './styles';
import AuthService from "../AuthService";
import history from "../history";
import Navbar from "../Navbar";
import parseErrors from "../parseErrors";
import { loadData } from "../API_Requests/basic";

class SignUp extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = {
      errorText: "",
      username: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
      company: "",
      company_id: null,
      companyErrorText: "",
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      history.replace("/");
    }
  }

  async handleFormSubmit(e) {
    const { username, password, first_name, last_name, company_id } = this.state;
    e.preventDefault();
    try {
      await this.Auth.signup(username, password, first_name, last_name, company_id);
      history.push("/");
    } catch (err) {
      const errorText = parseErrors(err);
      this.setState({ errorText });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  selectCompany = async () => {
    const { company } = this.state;
    try {
      const res = await loadData(`companies?name=${company}`);
      console.log(res, res.data);
      if (res.data == null) {
        this.setState({
          company_id: null,
          companyErrorText:
            "Company was not found. Don't worry, you can still sign up",
        });
      } else {
        this.setState({
          company_id: res.data.id,
          companyErrorText: "",
        });
      }
    } catch (err) {
      const errorText = parseErrors(err);
      this.setState({ errorText });
    }
  };

  render() {
    const {
      errorText,
      username,
      password,
      first_name,
      last_name,
      password2,
      company,
      companyErrorText,
    } = this.state;
    console.log(this.state)
    return (
      <div>
        <Navbar />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Card style={{ width: 250, paddingLeft: 10 }}>
            <CardContent>
              <TextField
                name="company"
                type="text"
                value={company}
                onChange={this.handleChange}
                placeholder="Company Name"
                required
              />
            </CardContent>
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.selectCompany}
            >
              Select Company
            </Button>
            {companyErrorText !== "" ? (
              <p style={{ color: "red", margin: 0, marginTop: 10 }}>
                {companyErrorText}
              </p>
            ) : (
              ""
            )}
          </Card>

          <Card style={{ width: 250, paddingLeft: 10 }}>
            <CardContent>
              <form onSubmit={this.handleFormSubmit}>
                <TextField
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Enter username"
                  required
                />
                <TextField
                  name="first_name"
                  type="text"
                  value={first_name}
                  onChange={this.handleChange}
                  placeholder="Enter first name"
                  required
                />
                <TextField
                  name="last_name"
                  type="text"
                  value={last_name}
                  onChange={this.handleChange}
                  placeholder="Enter last name"
                  required
                />
                <TextField
                  name="password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                  placeholder="Enter password"
                  required
                />
                <TextField
                  name="password2"
                  value={password2}
                  type="password"
                  onChange={this.handleChange}
                  placeholder="Confirm password"
                  required
                />
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={password !== password2}
                >
                  Sign up
                </Button>
              </form>
              {errorText !== "" ? (
                <p style={{ color: "red", margin: 0, marginTop: 10 }}>
                  {errorText}
                </p>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default SignUp;
