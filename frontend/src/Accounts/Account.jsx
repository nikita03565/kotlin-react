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

class Account extends Component {
  state = {
    initialData: null,
    accountNumber: null,
    allocationType: null,
    amount: null,
    employeeId: null,
    id: null,
    nickname: null,
    priority: null,
    remainder: false,
    routingNumber: null,
    editing: false,
    creating: false,
    errorText: "",
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      this.setState({ ...data, initialData: data });
    }
  }

  onEditButtonClick = () => {
    const { editing, initialData } = this.state;
    if (editing) {
      this.onUpdateAccount();
    } else {
      this.setState({
        editing: true,
        //...initialData
      });
    }
  };
  onCancelButtonClick = () => {
    const { initialData } = this.state;
    this.setState({ editing: false, ...initialData });
  };

  onDeleteButtonClick = () => {
      const { onDelete } = this.props;
    onDelete(this.state.id)
  };

  onUpdateAccount = async () => {
    try {
      const {
        accountNumber,
        allocationType,
        amount,
        id,
        nickname,
        priority,
        remainder,
        routingNumber,
        editing,
        creating,
        errorText,
      } = this.state;
      const data = {
        accountNumber,
        allocationType,
        nickname,
        priority,
        routingNumber,
      };
      await updateEl("accounts", id, data);
      this.setState({ editing: false });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      const errorText = parseErrors(err);
      this.setState({ errorText });
      if (axios.isCancel(err)) {
      }
    }
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const {
      accountNumber,
      allocationType,
      amount,
      id,
      nickname,
      priority,
      remainder,
      routingNumber,
      editing,
      creating,
      errorText,
    } = this.state;
    console.log(this.state);
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
                value={nickname}
                className="default-input"
                label="Nickname"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "nickname")}
                InputProps={{
                  readOnly: true,
                  readOnly: !editing,
                }}
              />
              <TextField
                value={routingNumber}
                label="Routing number"
                className="default-input"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "routingNumber")}
                InputProps={{
                  readOnly: true,
                  readOnly: !editing,
                }}
              />
              <TextField
                value={accountNumber}
                label="Account number"
                className="default-input"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "accountNumber")}
                InputProps={{
                  readOnly: !editing,
                }}
              />
              <FormControl className="default-input">
                <Select
                  style={{ width: "229px" }}
                  variant="outlined"
                  onChange={(e) => this.handleChange(e, "allocationType")}
                  value={allocationType}
                  inputProps={{
                    readOnly: !editing,
                    "aria-label": "Allocation Type",
                  }}
                >
                  <MenuItem value="amount">Amount</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="remainder">Remainder</MenuItem>
                </Select>
                <FormHelperText> Allocation Type </FormHelperText>
              </FormControl>

              <FormControl className="default-input">
                <Input
                  style={{ width: "229px" }}
                  value={priority}
                  label="Priority"
                  type="number"
                  className="default-input"
                  variant="outlined"
                  onChange={(e) => this.handleChange(e, "priority")}
                  InputProps={{
                    readOnly: !editing,
                  }}
                />
                <FormHelperText> Priority </FormHelperText>
              </FormControl>

              <br />
              {
                <>
                  <Button
                    style={{ minWidth: "151px" }}
                    color={editing ? "primary" : "default"}
                    variant="contained"
                    onClick={this.onEditButtonClick}
                  >
                    {editing ? "Save" : "Edit"}
                  </Button>
                  {!editing && (
                    <Button
                      style={{ minWidth: "151px" }}
                      color={editing ? "primary" : "default"}
                      variant="contained"
                      onClick={this.onDeleteButtonClick}
                    >
                      Delete
                    </Button>
                  )}
                  {editing && (
                    <Button
                      style={{ minWidth: "151px" }}
                      color={editing ? "primary" : "default"}
                      variant="contained"
                      onClick={this.onCancelButtonClick}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Account;
