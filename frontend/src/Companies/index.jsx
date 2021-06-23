import React, { Component } from "react";
import axios from "axios";
import { loadData, addEl } from "../API_Requests/basic";
import Navbar from "../Navbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Card, CardContent, Modal } from "@material-ui/core";
import { withAuthHeader } from "../Auth";
import Company from "./Company"
class Users extends Component {
  state = {
    companies: [],
    creating: false,
  };

  componentDidMount() {
    this.onLoadAllCompanies();
  }

  async onLoadAllCompanies() {
    try {
      const res = await loadData("companies");
      this.setState({
        companies: res.data,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  }

  onCreateCompany = async (data) => {
    const { companies } = this.state;
    try {
      const res = await addEl("companies", data);
      this.setState({
        companys: [res.data, ...companies], creating: false
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  onCreateButtonClick = () => {
    this.setState({ creating: true });
  };

  handleClose = () => {
    this.setState({ creating: false });
  };


  getCompanyCard = (company) => {
    return (
      <Card>
        <CardContent>
          {company.name}
        </CardContent>
      </Card>
    )
  }

  render() {
    const { companies, creating } = this.state;

    return (
      <div>
        <Navbar />
        {!creating && (
          <Button
            style={{ minWidth: "151px" }}
            color={"primary"}
            variant="contained"
            onClick={this.onCreateButtonClick}
          >
            Create new company
          </Button>
        )}
        {companies.map(c => this.getCompanyCard(c))}
        <Modal
          open={creating}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Company creating={true} createCompany={this.onCreateCompany}/>
        </Modal>
      </div>
    );
  }
}

export default Users;
