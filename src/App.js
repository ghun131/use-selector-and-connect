import React from "react";
import { shallowEqual } from "react-redux";
import "./App.css";
import Todos from "./Todo1/Todos";

function App() {
  const a = {
    id: "477bf30d-197b-4990-9c60-3de1b5322219",
    content: "eat",
  };

  const b = {
    id: "477bf30d-197b-4990-9c60-3de1b5322219",
    content: "eat",
  };

  console.log(shallowEqual(a, b));

  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;
