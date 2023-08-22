import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../../../features/Todo/ultis";
import ErrorMessage from "../ErrorMessage";

InputField.propTypes = {};

function InputField(props) {
  const { label, name, inputProps, control, errors } = props;
  const [values, setValues] = useState();

  function handeFormChange(e) {
    setValues(e.target.value);
  }
  return (
    <FormControl fullWidth sx={{ mt: "2rem" }}>
      <Controller
        id={name}
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...addErrorIntoField(errors[name])}
            value={values}
            onChange={handeFormChange}
            {...field}
            label={label}
            variant="outlined"
            InputProps={inputProps}
            requiredz
          />
        )}
      />

      {errors[name] ? <ErrorMessage messages={errors[name].message} /> : null}
    </FormControl>
  );
}

export default InputField;
