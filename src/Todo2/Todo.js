import React from "react";
import { getTodoById, removeTodo } from "../reducer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "./style.css";

const Todo = React.memo(function ({ id }) {
  const todo = useSelector((state) => getTodoById(state, id), shallowEqual);
  const dispatch = useDispatch();

  console.log("render Todo");

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
});

export default Todo;
