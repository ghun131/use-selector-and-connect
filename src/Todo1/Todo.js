import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoById, removeTodo } from "../reducer";
import "./style.css";

function Todo({ id }) {
  const todo = useSelector((state) => getTodoById(state, id));
  const dispatch = useDispatch();

  console.log("redner Todo");

  function handleRemoveTodo() {
    dispatch(removeTodo(todo.id));
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

export default Todo;
