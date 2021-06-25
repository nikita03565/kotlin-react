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
  InputAdornment
} from "@material-ui/core";
import Navbar from "../Navbar";
import parseErrors from "../parseErrors";
import MenuItem from "@material-ui/core/MenuItem";

class Account extends Component {
  state = {
    initialData: null,
    accountNumber: "",
    allocationType: "",
    amount: "",
    employeeId: null,
    id: null,
    nickname: "",
    priority: "",
    remainder: false,
    routingNumber: "",
    editing: false,
    creating: false,
    errorText: "",
    received_amount: 0,
  };

  componentDidMount() {
    const { data, creating } = this.props;
    if (data) {
      this.setState({ ...data, initialData: data });
    }
    if (creating) {
      this.setState({ creating: creating });
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
    onDelete(this.state.id);
  };

  onUpdateAccount = async () => {
    try {
      const {
        accountNumber,
        allocationType,
        id,
        nickname,
        priority,
        routingNumber,
        amount,
      } = this.state;
      const data = {
        accountNumber,
        allocationType,
        nickname,
        priority,
        routingNumber,
        amount,
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

  onCreateButtonClick = () => {
    const {
      accountNumber,
      allocationType,
      nickname,
      priority,
      routingNumber,
      amount,
    } = this.state;
    const { createAccount } = this.props;
    const data = {
      accountNumber,
      allocationType,
      nickname,
      priority,
      routingNumber,
      amount,
    };
    createAccount(data);
  };

  getAdornment = (allType) => {
    if (allType == "amount") {
      return {startAdornment: <InputAdornment position="start">$</InputAdornment>}
    }
    return {endAdornment: <InputAdornment position="end">%</InputAdornment>}
  }

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
      received_amount
    } = this.state;
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
            style={{ margin: "10px", minWidth: "600px", maxWidth: "600px" }}
          >
            <CardContent>
              <TextField
                value={nickname}
                className="default-input"
                label="Nickname"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "nickname")}
                InputProps={{
                  readOnly: !(editing || creating),
                }}
              />
              <TextField
                value={routingNumber}
                label="Routing number"
                className="default-input"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "routingNumber")}
                InputProps={{
                  readOnly: !(editing || creating),
                }}
              />
              <TextField
                value={accountNumber}
                label="Account number"
                className="default-input"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "accountNumber")}
                InputProps={{
                  readOnly: !(editing || creating),
                }}
              />
              <FormControl className="default-input">
                <Select
                  style={{ width: "229px" }}
                  variant="outlined"
                  onChange={(e) => this.handleChange(e, "allocationType")}
                  value={allocationType}
                  inputProps={{
                    readOnly: !(editing || creating),
                    "aria-label": "Allocation Type",
                  }}
                >
                  <MenuItem value="amount">Amount</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="remainder">Remainder</MenuItem>
                </Select>
                <FormHelperText> Allocation Type </FormHelperText>
              </FormControl>
              {allocationType != "remainder" ? (
                <TextField
                  value={amount}
                  label="Amount"
                  className="default-input"
                  variant="outlined"
                  onChange={(e) => this.handleChange(e, "amount")}
                  InputProps={{
                    type: "number",
                    readOnly: !(editing || creating),
                    ...this.getAdornment(allocationType)
                  }} //{allocationType == "percentage" ? "%" : "$"}
                />
              ) : null}

              <FormControl className="default-input">
                <Input
                  style={{ width: "229px" }}
                  value={priority}
                  label="Priority"
                  type="number"
                  className="default-input"
                  variant="outlined"
                  onChange={(e) => this.handleChange(e, "priority")}
                  readOnly = {!(editing || creating)}
                  
                />
                <FormHelperText> Priority </FormHelperText>
              </FormControl>
                <span>Received Amount: {received_amount}</span>
              <br />

              <>
                {creating ? (
                  <Button
                    style={{ minWidth: "151px", margin: 5}}
                    color={editing ? "primary" : "default"}
                    variant="contained"
                    onClick={this.onCreateButtonClick}
                  >
                    Create
                  </Button>
                ) : (
                  <>
                    <Button
                      style={{ minWidth: "151px", margin: 5 }}
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
                )}
              </>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Account;
