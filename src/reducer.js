const ADD_TODO = "add todo";
const REMOVE_TODO = "remove todo";

export function addTodo(payload) {
  return {
    type: ADD_TODO,
    payload,
  };
}

export function removeTodo(payload) {
  return {
    type: REMOVE_TODO,
    payload,
  };
}

const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload],
      };

    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const getTodos = (state) => state.todos;
export const getTodoById = (state, id) =>
  state.todos.find((todo) => todo.id === id);
export default reducer;
