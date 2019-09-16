import React, { Component } from "react";
import axios from "axios";

export class Search extends Component {
  state = {
    username: "",
    pfp: "",
    loading: false
  };

  getPFP = () => {
    axios
      .get(`http://3.13.29.0:3001/api/profile/${this.state.username}`)
      .then(res => this.setState({ pfp: res.data.profilePic, loading: false }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.getPFP();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <p>
          Enter a VSCO username below to view their Full-size, Un-cropped,
          High-Resolution profile picture
        </p>
        <form>
          <input
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            style={searchInputStyle}
            required
          ></input>
          <button
            onClick={this.handleSubmit}
            style={searchButtonStyle}
            type="submit"
          >
            {this.state.loading === true ? "Loading..." : "Search"}
          </button>
        </form>
        {this.state.pfp !== "" ? ( //if there's a pfp render image
          <div>
            <img
              src={this.state.pfp}
              alt="vsco profile"
              style={profilePicStyle}
            ></img>
            <br />
            <button
              type="submit"
              onClick={() => window.open(this.state.pfp, "blank")}
              style={downloadButtonStyle}
            >
              View Full Size
            </button>
          </div>
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

const searchInputStyle = {
  border: "0.1em solid lightgray",
  borderRadius: ".25rem",
  height: "3em",
  margin: "0.5em",
  textAlign: "center"
};

const searchButtonStyle = {
  backgroundColor: "black",
  padding: ".375rem .75rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  borderRadius: ".25rem",
  cursor: "pointer",
  color: "white",
  margin: "0.5em"
};

const downloadButtonStyle = {
  backgroundColor: "black",
  padding: ".375rem .75rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  borderRadius: ".25rem",
  cursor: "pointer",
  color: "white",
  margin: "0.5em"
};
export default Search;
