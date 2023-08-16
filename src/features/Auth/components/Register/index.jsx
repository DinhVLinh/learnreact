import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm/index";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

Register.defaultProps = {
  closeDialog: null,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = props;

  async function handleRegisterForm(data) {
    try {
      data.userName = data.email;

      const action = register(data);

      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }

      // do something here on register succesfully
      console.log("new user", user);

      enqueueSnackbar("Register Successfully!!!!!!!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  return (
    <div>
      <RegisterForm onSubmit={handleRegisterForm} />
    </div>
  );
}

export default Register;
