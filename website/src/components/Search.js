import React, { Component } from "react";
import axios from "axios";

export class Search extends Component {
  state = {
    username: "",
    pfp: "",
    loading: false,
    error: false
  };

  getPFP = () => {
    axios
      .get(`https://www.vscoviewer.com:3001/api/profile/${this.state.username}`)
      .then(res => {
        if (res.data.error) {
          this.setState({
            loading: false,
            error: true
          });
        } else {
          this.setState({
            pfp: res.data.profilePic,
            loading: false,
            error: false
          });
        }
      })
      .catch(err => {
        this.setState({ pfp: "", loading: false, error: true });
      });
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
          />
          <button
            onClick={this.handleSubmit}
            style={searchButtonStyle}
            type="submit"
          >
            {this.state.loading === true ? "Loading..." : "Search"}
          </button>
        </form>
        {this.state.error === true ? ( //if there's an error then render err msg
          <p>
            Could not find that user, be sure to enter the unique username and
            not the display name
          </p>
        ) : this.state.pfp !== "" ? ( //if there's a pfp then render image
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
          //else render nothing
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
