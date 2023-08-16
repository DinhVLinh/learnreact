import React from "react";
import PropTypes from "prop-types";

TodoItem.propTypes = {};

function TodoItem(props) {
  const { todo } = props;
  return (
    <div>
      <p>{todo.title}</p>
    </div>
  );
}

export default TodoItem;
