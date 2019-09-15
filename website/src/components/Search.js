import React, { Component } from "react";
import axios from "axios";

export class Search extends Component {
  state = {
    username: "",
    pfp: ""
  };

  getPFP = () => {
    axios
      .get(`http://localhost:3001/api/test/${this.state.username}`)
      .then(res => this.setState({ pfp: res.data.profilePic }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getPFP();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter VSCO Username"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
          ></input>
          <button>Submit</button>
        </form>
        {this.state.pfp !== "" ? ( //if there's a pfp render image
          <img
            src={this.state.pfp}
            alt="vsco profile"
            style={profilePicStyle}
          ></img>
        ) : (
          //else no pfp then show nothing
          <div></div>
        )}
      </div>
    );
  }
}

const profilePicStyle = {
  objectFit: "cover",
  width: "30%",
  margin: "1em"
};

export default Search;
