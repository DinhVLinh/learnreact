import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../../../features/Todo/ultis";
import ErrorMessage from "../ErrorMessage";
import { Box, IconButton } from "@material-ui/core";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

QuantityField.propTypes = {};

function QuantityField(props) {
  const { label, name, inputProps, control, errors, form } = props;
  if (!form) return;
  const value = form.watch(name);

  function handleDecreaseCart() {
    form.setValue(name, value ? value - 1 : 1);
  }

  function handleIncreaseCart() {
    form.setValue(name, value ? value + 1 : 1);
  }

  return (
    <FormControl fullWidth sx={{ mt: "2rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, values }) => (
          <Box>
            <IconButton onClick={handleDecreaseCart}>
              <RemoveCircleOutline></RemoveCircleOutline>
            </IconButton>
            <TextField
              {...addErrorIntoField(errors[name])}
              value={values}
              onChange={(e) => form.setValue(e.target.value)}
              {...field}
              label={label}
              variant="outlined"
              InputProps={inputProps}
              required
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
