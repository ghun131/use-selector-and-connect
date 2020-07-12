import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { removeTodo } from "../reducer";
import "./style.css";

function Todo({ id }) {
  const { todo } = useSelector(
    (state) => ({ todo: state.todos.find((todo) => todo.id === id) }),
    shallowEqual
  );
  const dispatch = useDispatch();

  console.log("render Todo", todo);

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
