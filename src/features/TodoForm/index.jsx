import React, { useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  onSubmit: null,
};

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  function handleChangeValue(e) {
    setValue(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!onSubmit) return;
    const formValue = {
      title: value,
    };

    onSubmit(formValue);
    setValue("");
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <input type="text" value={value} onChange={handleChangeValue} />
      <button>Submit</button>
    </form>
  );
}

export default TodoForm;
