import { yupResolver } from "@hookform/resolvers/yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar, Box, Button, InputAdornment, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckboxField from "../../../../components/form-controls/CheckBox";
import InputField from "../../../../components/form-controls/InputField";
import SelectField from "../../../../components/form-controls/selectField";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  onSubmit: null,
};

// Create Schema validation
const schema = yup.object().shape({
  userName: yup
    .string()
    .required("Please Enter Full Name.")
    .min(5, "Full Name is Too Short."),

  email: yup.string().email().required("Please Enter Email."),
  phoneNumber: yup
    .number()
    .typeError("Please enter Phone Number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
  country: yup.string().required("Please select your Country."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Password does not match"),
});
function TodoForm(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      country: "",
      password: "",
      confirmPassword: "",
      check: "",
    },
    resolver: yupResolver(schema),
  });

  console.log(errors);

  function handleSubmitForm(data) {
    console.log(data);
  }

  return (
    // <form onSubmit={form.handleSubmit(handleSubmitForm)}>
    //   ToDo Form
    //   <InputField name="title" label="Name" form={form} />
    //   {/* <InputField name="email" label="Email" form={form} />
    //   <InputField name="age" label="Age" form={form} /> */}
    // </form>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "4rem",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <HowToRegIcon />
      </Avatar>

      <Typography component="h1">Sign Up</Typography>

      {/* Form */}

      <Box
        noValidate
        component="form"
        sx={{
          width: "100%",
          mt: "2rem",
        }}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <InputField
          errors={errors}
          control={control}
          label="User Name"
          name="userName"
        />
        <InputField
          errors={errors}
          control={control}
          label="Email"
          name="email"
        />
        <InputField
          errors={errors}
          control={control}
          label="Phone Numer"
          name="phoneNumber"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">+84</InputAdornment>
            ),
            type: "number",
          }}
        />
        <SelectField
          errors={errors}
          control={control}
          label="Country"
          name="country"
          sx={{ width: "100%" }}
        ></SelectField>
        <InputField
          errors={errors}
          control={control}
          label="Password"
          name="password"
        />
        <InputField
          errors={errors}
          control={control}
          label="Confirm Password"
          name="confirmPassword"
        />
        <CheckboxField errors={errors} name="check" control={control} />
        <Button
          errors={errors}
          type="submit"
          variant="contained"
          sx={{ mt: "20px", width: "100%" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default TodoForm;
