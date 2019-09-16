import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Search } from "./components/Search";
import Contact from "./components/Contact";
import Error404 from "./components/Error404";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* eslint-disable-next-line*/}
          <a href="">
            <img
              className="home-button"
              alt="home button"
              src="./home-icon.png"
              width="64"
              height="64"
            />
          </a>
          <h3>VSCO Profile Picture Viewer</h3>
          <a href="/contact">
            <button style={contactButtonStyle}>Contact</button>
          </a>
        </header>
        <Router>
          <Switch>
            <Route exact path="/" component={Search}></Route>
            <Route path="/contact" component={Contact} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const contactButtonStyle = {
  backgroundColor: "white",
  padding: ".375rem .75rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  borderRadius: ".25rem",
  cursor: "pointer",
  color: "black",
  margin: "0.25em 1em"
};

export default App;
