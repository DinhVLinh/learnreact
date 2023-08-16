import React, { useState } from "react";
import PropTypes from "prop-types";

AddTodo.propTypes = {};

function AddTodo({ onSubmitTodo }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formValues = {
      id: Date.now(),
      title: value,
      completed: false,
      edit: false,
    };

    onSubmitTodo(formValues);
    setValue("");
  }

  function handleEditTodo() {}

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
    </form>
  );
}

export default AddTodo;
