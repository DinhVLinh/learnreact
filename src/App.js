import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const name = "Linh";
  const age = 18;
  const male = true;
  const clb = {
    name: "MU",
  };
  const colorList = ["red", "green", "blue"];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {name} - {age} - {male ? "Male" : "Female"}
        </p>

        {male ? <p>Male1</p> : <p>FeMale</p>}

        {male && <p> Male2</p>}
        {!male && <p> FeMale</p>}

        {male && (
          <div>
            <p> Male1</p>
            <p> Male2</p>
            <p> Male3</p>
          </div>
        )}

        {male && (
          <React.Fragment>
            <p> Male4</p>
            <p> Male5</p>
            <p> Male6</p>
          </React.Fragment>
        )}

        {male && (
          <>
            <p> Male7</p>
            <p> Male8</p>
            <p> Male9</p>
          </>
        )}

        <p> My favourite CLB is {clb.name}</p>

        <ul>
          {colorList.map((color) => (
            <li style={{ color }}>Linh</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
