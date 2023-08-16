import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid #333`,
  },

  range: {
    border: "none",
    borderBottom: "1px solid #333",
  },

  btn: {
    marginTop: "10px",
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: [value],
    }));
  }

  function handleSubmit() {
    if (onChange) onChange(value);
    setValue({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2"> Giá</Typography>

      <Box>
        <TextField
          className={classes.range}
          onChange={handleChange}
          value={value.salePrice_gte}
          name="salePrice_gte"
        />
        <TextField
          className={classes.range}
          onChange={handleChange}
          value={value.salePrice_lte}
          name="salePrice_lte"
        />
      </Box>
      <Button
        className={classes.btn}
        variant="outlined"
        onClick={handleSubmit}
        color="primary"
      >
        Áp Dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
