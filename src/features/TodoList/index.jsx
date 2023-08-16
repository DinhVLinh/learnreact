import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

Todo.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

Todo.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function Todo(props) {
  const { todoList, onTodoClick } = props;

  function handleClick(todo) {
    if (!onTodoClick) return;
    onTodoClick(todo);
  }

  return (
    <div>
      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} onClick={() => handleClick(todo)}>
            {todo.title}
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
