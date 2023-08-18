import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@material-ui/core";
import InputField from "components/form-controls/InputField";
import QuantityField from "components/form-controls/QuantityField/QuantityField";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, "Minimum values is 1.")
      .required("Please Enter Quantity.")
      .positive("A Quantity can't start with a minus")
      .integer("A Quantity can't include a decimal point")
      .typeError("Please enter number."),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  async function handleAddToCardSunmit(formValues) {
    if (onSubmit) await onSubmit(formValues);
  }

  return (
    <Box
      noValidate
      component="form"
      sx={{
        width: "100%",
        mt: "2rem",
      }}
      onSubmit={form.handleSubmit(handleAddToCardSunmit)}
    >
      <QuantityField
        errors={form.formState.errors}
        control={form.control}
        label="Quantity"
        name="quantity"
        inputProps={{
          type: "number",
        }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: "20px", width: "100%" }}
      >
        Buy
      </Button>
    </Box>
  );
}

export default AddToCartForm;
