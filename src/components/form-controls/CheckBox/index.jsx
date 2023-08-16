import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../../../features/Todo/ultis";
import ErrorMessage from "../ErrorMessage";

CheckboxField.propTypes = {};

function CheckboxField(props) {
  const { control, name, errors } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            required
            control={<Checkbox {...field} />}
            label="I Agree to Myapp Terms and Privacy Policy."
          />
        )}
      />
      {errors[name] ? <ErrorMessage messages={errors[name].message} /> : null}
    </>
  );
}

export default CheckboxField;
