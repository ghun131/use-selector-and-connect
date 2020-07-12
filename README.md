## React-Redux useSelector + useDispatch hay Connect

Mấy tuần trước có một cậu trong team tớ hỏi: "Tại sao không sử dụng useSelector cho dự án mới?" Nếu các bạn sử dụng React và Redux chắc các bạn sẽ dùng thêm một thứ khá phổ biến đi kèm với 2 thư viện này, đó chính là thư viện `react-redux`.

`react-redux` cho phép bạn dùng hàm `connect` để lấy các `state` trong `reducer` hoặc sử dụng các **action** trên các components để hiển thị. Cụ thể mục tiêu này đạt được nhờ dùng đến 2 hàm là `mapStateToProps` và `mapDispatchToProps`.

Từ phiên bản `react-redux` v7 bạn đã có thể sử dụng `useSelector` và `useDispatch` thay thế cho hàm `connect`. Một lý cậu đồng nghiệp sử dụng 2 hàm này là cú pháp code của bạn trở nên sáng sủa hơn. Và tớ đã viết thử 1 todo app đơn giản để kiểm chứng điều này.

Todos.js

```javascript
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
```

Todo.js

```javascript
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
```

So với việc sử dụng `useSelector` và `useDispatch` thì

Todos.js

```javascript
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
```

Todo.js

```javascript
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
```

Có thể thấy rằng số dòng code giảm đi, nhất là khi nếu bạn sử dụng nhiều `state` của reducer hay `action` khiến cho hàm `mapStateToProps` và `mapDispatchToProps` phình to ra, cộng thêm việc _destructure_ các biến trong props để sử dụng ở đầu hàm (như dòng 7 file Todo.js có `connect`) khiến cho số lượng code bạn viết tăng lên tương đối nhiều.

Tuy nhiên `useSelector` có một nhược điểm là khi một component thay đổi, nó khiến cho toàn bộ cây component phải render lại và việc này gây tốn hiệu năng.

#### Số lần render dùng connect

  <img src="https://res.cloudinary.com/hunghayho131/image/upload/v1593881780/connect.gif" height=300>

#### Số lần rende dùng useSelector

  <img src="https://res.cloudinary.com/hunghayho131/image/upload/v1593881780/useSelector.gif" height=300>

Do đó mà ngay trong document của `react-redux`, `React.memo` được sử dụng để hạn chế số lần render. Todo sẽ trở thành như sau

Todo.js

```javascript
import React from "react";
import { getTodoById, removeTodo } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const Todo = React.memo(function ({ id }) {
  const todo = useSelector((state) => getTodoById(state, id));
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
```

Việc dùng `React.memo` hạn chế số lần render `useSelector` nhưng rõ ràng là cách làm này khiến `useSelector` phải dựa vào một phương thức khác để không bị mất đi hiệu năng so với `connect`, đây là một điểm trừ. Một cách khắc phục khác là thêm hàm `shallowEqual` như param thứ 2 của `useSelector` nhưng không phải lúc nào hàm này cũng chạy (như trong ví dụ hiện tại). Đây là lý do mà `useSelector` hay `useDispatch` chưa được sử dụng phổ biến
