import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { getTodos, addTodo } from "../reducer";
import Todo from "./Todo";

function Todos({ todos, dispatch }) {
  const [task, setTask] = useState("");

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

function mapState(state) {
  return {
    todos: getTodos(state),
  };
}

export default connect(mapState)(Todos);
