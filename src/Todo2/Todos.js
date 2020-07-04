import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { getTodos, addTodo } from "../reducer";
import Todo from "./Todo";

function Todos() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => getTodos(state));
  const dispatch = useDispatch();

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    const payload = {
      id: uuid(),
      content: task,
    };
    dispatch(addTodo(payload));
    setTask("");
  }

  return (
    <>
      <form onSubmit={handleClick}>
        New task: &nbsp;
        <input type="text" onChange={handleChange} value={task} />
        &nbsp; &nbsp;
        <button type="submit">+</button>
      </form>
      <br />

      <div>
        {!!todos.length &&
          todos.map((todo) => <Todo key={todo.id} id={todo.id} />)}
      </div>
    </>
  );
}

export default Todos;
