import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  LinearProgress,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputField from "components/form-controls/InputField";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

// Create Schema validation
const schema = yup.object().shape({
  userName: yup
    .string()
    .required("Please Enter Full Name.")
    .min(5, "Full Name is Too Short."),
  email: yup.string().email().required("Please Enter Email."),

  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function RegisterForm({ onSubmit }) {
  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmitForm(data) {
    if (onSubmit) {
      await onSubmit(data);
    }
  }

  const { isSubmitting } = form.formState;

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
        mt: "1rem",
        position: "relative",
      }}
      onSubmit={form.handleSubmit(handleSubmitForm)}
    >
      {isSubmitting && (
        <LinearProgress sx={{ position: "absolute", left: 0, right: 0 }} />
      )}

      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <HowToRegIcon />
      </Avatar>

      <Typography component="h1">Create An Account</Typography>

      {/* Form */}

      <Box
        noValidate
        component="form"
        sx={{
          width: "100%",
          mt: "2rem",
        }}
      >
        <InputField
          errors={form.formState.errors}
          control={form.control}
          label="User Name"
          name="userName"
        />
        <InputField
          errors={form.formState.errors}
          control={form.control}
          label="Email"
          name="email"
        />

        <InputField
          errors={form.formState.errors}
          control={form.control}
          label="Password"
          name="password"
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            type: showPassword ? "password" : "text",
          }}
        />

        <InputField
          errors={form.formState.errors}
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            type: showPassword ? "password" : "text",
          }}
        />
        <Button
          errors={form.formState.errors}
          type="submit"
          variant="contained"
          sx={{ mt: "20px", width: "100%" }}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
