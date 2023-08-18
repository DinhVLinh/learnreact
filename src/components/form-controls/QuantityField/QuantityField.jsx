import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../../../features/Todo/ultis";
import ErrorMessage from "../ErrorMessage";
import { Box, IconButton } from "@material-ui/core";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

QuantityField.propTypes = {};

function QuantityField(props) {
  const { label, name, inputProps, control, errors } = props;
  const [values, setValues] = useState(1);

  function handleDecreaseCart() {
    setValues(Number.parseInt(values) ? Number.parseInt(values) - 1 : 1);
    console.log(Number.parseInt(values));
  }

  function handleIncreaseCart(e) {
    setValues(Number.parseInt(values) ? Number.parseInt(values) + 1 : 1);
    console.log(Number.parseInt(values));
  }

  function handeFormChange(e) {
    setValues(e.target.value);
  }

  return (
    <FormControl fullWidth sx={{ mt: "2rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <IconButton onClick={handleDecreaseCart}>
              <RemoveCircleOutline></RemoveCircleOutline>
            </IconButton>

            <TextField
              id={name}
              type="number"
              {...addErrorIntoField(errors[name])}
              value={values}
              {...field}
              onChange={handeFormChange}
              label={label}
              variant="outlined"
              InputProps={inputProps}
              size="small"
            />
            <IconButton onClick={handleIncreaseCart}>
              <AddCircleOutline></AddCircleOutline>
            </IconButton>
          </Box>
        )}
      />

      {errors[name] ? <ErrorMessage messages={errors[name].message} /> : null}
    </FormControl>
  );
}

export default QuantityField;
