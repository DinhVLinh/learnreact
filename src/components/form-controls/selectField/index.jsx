import { FormControl, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../../../features/Todo/ultis";
import ErrorMessage from "../ErrorMessage";

SelectField.propTypes = {};

function SelectField(props) {
  const { label, name, control, errors } = props;

  const [values, setValues] = useState();
  const [listCountry, setListCountry] = useState([]);
  const countryNames = listCountry.map((item) => item.name.common).sort();
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setListCountry(data));
  }, []);

  function handeFormChange(e) {
    setValues(e.target.value);
  }
  return (
    <FormControl fullWidth sx={{ mt: "2rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            value={values}
            {...addErrorIntoField(errors[name])}
            onChange={handeFormChange}
            {...field}
            required
            label={label}
            name={name}
            select
            variant="filled"
          >
            {countryNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage messages={errors[name].message} /> : null}
    </FormControl>
  );
}

export default SelectField;
