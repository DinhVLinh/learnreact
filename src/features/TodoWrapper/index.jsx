import React, { useState } from "react";
import AddTodo from "./components/AddTodo/add";
import TodoItem from "./components/TodoItem";
import "./styles.scss";

TodoWrapper.propTypes = {};

function TodoWrapper(props) {
  const localTodo = JSON.parse(localStorage.getItem("todo"));
  const [todos, setTodos] = useState(localTodo || []);

  function handleSubmit(formValue) {
    const newTodo = { ...formValue };
    const newTodoList = [...todos];
    newTodoList.push(newTodo);
    setTodos(() => {
      const jsonTodo = JSON.stringify(newTodoList);
      // localStorage.setItem("todo", jsonTodo);
      return newTodoList;
    });
  }

  function handleRemoveTodo(todo) {
    const index = todos.findIndex((x) => x.id === todo.id);
    const newTodoList = [...todos];
    newTodoList.splice(index, 1);
    setTodos(newTodoList);
  }

  return (
    <ul>
      <AddTodo onSubmitTodo={handleSubmit} />
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
          <button onClick={handleRemoveTodo}>Remove</button>
          <button>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoWrapper;
