import React, { Component } from "react";
import axios from "axios";
import { loadData, deleteEl, addEl } from "../API_Requests/basic";
import { Card, CardContent } from "@material-ui/core";
import { sortBy } from "lodash";

class Payments extends Component {
  state = {
    payments: [],
    creating: false,
  };

  componentDidMount() {
    this.onLoadAllPayments();
  }

  async onLoadAllPayments() {
    try {
      const res = await loadData("users/me/payments");
      this.setState({
        payments: res.data,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  }

  getPaymentCard = (p) => {
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
              <span>${p.amount}</span>
              <br/>
              <span>{p.type}</span>
              <br/>
              <span>{p.payDate}</span>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  

  render() {
    const { payments } = this.state;
    console.log(payments);
    const paymentsSorted = sortBy(payments, "payDate");
    return (
      <>
        {paymentsSorted.map((p) => (
          this.getPaymentCard(p)
        ))}
      </>
    );
  }
}

export default Payments;
