import React, { Component, Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { loadData, updateEl } from "../API_Requests/basic";
import axios from "axios";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import Navbar from "../Navbar";
import parseErrors from "../parseErrors";

class UserDetail extends Component {
  state = {
    date_of_birth: null,
    first_name: "",
    id: null,
    last_name: "",
    username: "",
    salary: null,
    title: "",
    company: null,
    detail: true,
    editing: false,
    creating: false,
    sampleInput: "",
    errorText: "",
  };

  componentDidMount() {
    const { data, match } = this.props;
    if (data) {
      this.setState({ ...data, detail: false });
    } else if (match) {
      const url = `users/${match.params.id}`;
      this.onLoadUser(url);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, match } = nextProps;
    let newState = null;
    if (data) {
      newState = { id: data.id };
    } else if (match) {
      newState = { id: match.params.id };
    }
    return newState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.state;
    if (id !== prevState.id) {
      this.onLoadUser(`users/${id}`);
    }
  }

  onLoadUser = async (url) => {
    try {
      const res = await loadData(url);
      this.setState({
        ...res.data,
        detail: true,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
      }
    }
  };

  // onUpdateUser = async () => {
  //     try {
  //         const {
  //             bio, id, date_of_birth, email,
  //             phone_number, social_media_links
  //         } = this.state;
  //         const linksData = social_media_links.map(linkObj => linkObj.link).filter(link => link);
  //         const locationData = this.createLocationData();
  //         const data = {
  //             bio,
  //             date_of_birth: date_of_birth !== '' ? date_of_birth : null,
  //             email,
  //             location: locationData,
  //             phone_number,
  //             social_media_links: linksData,
  //         };
  //         await updateEl('users', id, data);
  //         this.setState({location: locationData, editing: false})
  //     } catch (err) {
  //         console.log(err);
  //         console.log(err.response);
  //         const errorText = parseErrors(err);
  //         this.setState({errorText});
  //         if (axios.isCancel(err)) {

  //         }
  //     }
  // };

  onEditButtonClick = () => {
    const { editing } = this.state;
    if (editing) {
      this.onUpdateUser();
    } else {
      this.setState({
        editing: true,
      });
    }
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const {
      first_name,
      id,
      company,
      salary,
      title,
      last_name,
      username,
      detail,
      editing,
      errorText,
    } = this.state;
    const authId = localStorage.getItem("id");
    return (
      <div>
        {detail && <Navbar />}
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
              <p>
                <a href={`/users/${id}`}>{`${username}`} </a>
              </p>
              <p> {`${first_name} ${last_name}`} </p>
              <p> {company && `${title} at ${company.name}`} </p>
              <p> Earning: {salary} </p>
              <br />
              {detail && Number(id) === Number(authId) && (
                <Button
                  style={{ minWidth: "151px" }}
                  color={editing ? "primary" : "default"}
                  variant="contained"
                  onClick={this.onEditButtonClick}
                >
                  {editing ? "Завершить" : "Редактировать"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserDetail;
