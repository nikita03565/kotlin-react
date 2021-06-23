import React, { Component, Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { loadData, updateEl } from "../API_Requests/basic";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Select,
  Input,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import Navbar from "../Navbar";
import parseErrors from "../parseErrors";
import MenuItem from "@material-ui/core/MenuItem";

class Company extends Component {
  state = {
    name: "",
    creating: false,
    errorText: "",
  };

  componentDidMount() {
    const { data, creating } = this.props;
    if (data) {
      this.setState({ ...data });
    }
    if (creating) {
      this.setState({ creating: creating });
    }
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onCreateButtonClick = () => {
    const { name } = this.state;
    const { createCompany } = this.props;
    const data = {
      name,
    };
    createCompany(data);
  };

  render() {
    const { name, creating, errorText } = this.state;
    console.log(creating);
    return (
      <div>
        <div
          style={{
            minWidth: "500px",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Card
            style={{ margin: "10px", minWidth: "1000px", maxWidth: "1000px" }}
          >
            <CardContent>
              <TextField
                value={name}
                className="default-input"
                label="name"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "name")}
                InputProps={{
                  readOnly: !creating,
                }}
              />
              <Button
                style={{ minWidth: "151px" }}
                color={"primary"}
                variant="contained"
                onClick={this.onCreateButtonClick}
              >
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Company;
