import React from "react";
import "./App.css";
import gif from "./gif/connect.gif";
import Todos from "./Todo1/Todos";

function App() {
  return (
    <div className="App">
      <img src={gif} alt="" />
      <Todos />
    </div>
  );
}

export default App;
