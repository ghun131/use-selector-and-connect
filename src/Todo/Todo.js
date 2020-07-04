import React from "react";
import { connect } from "react-redux";
import { getTodoById, removeTodo } from "../reducer";
import "./style.css";

function Todo({ todo, removeTodo }) {
  console.log("render Todo");

  function handleRemoveTodo() {
    removeTodo(todo.id);
  }
  return (
    <div className="container">
      <div className="content">{todo.content}</div>
      <button onClick={handleRemoveTodo} style={{ marginLeft: 10, height: 20 }}>
        X
      </button>
    </div>
  );
}

function mapState(state, ownProps) {
  const { id } = ownProps;
  return {
    todo: getTodoById(state, id),
  };
}

export default connect(mapState, { removeTodo })(Todo);
