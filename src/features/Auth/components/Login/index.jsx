import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

Login.defaultProps = {
  closeDialog: null,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = props;

  async function handleRegisterForm(data) {
    try {
      data.userName = data.email;

      const action = login(data);

      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }

      // do something here on register succesfully
      // console.log("new user", user);

      // enqueueSnackbar("Register Successfully!!!!!!!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  return (
    <div>
      <LoginForm onSubmit={handleRegisterForm} />
    </div>
  );
}

export default Login;
