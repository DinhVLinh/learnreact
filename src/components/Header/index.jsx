import CodeIcon from "@mui/icons-material/Code";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Register from "../../features/Auth/components/Register/index";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import CloseIcon from "@mui/icons-material/Close";
import Login from "features/Auth/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { logout } from "features/Auth/userSlice";
import { AccountCircle } from "@mui/icons-material";

const MODE = {
  REGISTER: "register",
  LOGIN: "login",
};

export default function Header() {
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "#fff",
  };

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const stateLoggedIn = useSelector((state) => state.user.current);
  const isLoggedIn = !!stateLoggedIn.id;
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={linkStyle}>
              MC18
            </Link>
          </Typography>
          <NavLink to="/clock">
            {" "}
            <Button sx={{ color: "#fff" }}>Clock</Button>
          </NavLink>

          <NavLink to="/posts">
            {" "}
            <Button sx={{ color: "#fff" }}>Post</Button>
          </NavLink>

          <NavLink to="/mu-list">
            {" "}
            <Button sx={{ color: "#fff" }}>MUN</Button>
          </NavLink>

          <NavLink to="/product">
            {" "}
            <Button sx={{ color: "#fff" }}>Product</Button>
          </NavLink>

          {!isLoggedIn && (
            <Button
              color="inherit"
              sx={{ color: "#fff" }}
              onClick={handleClickOpen}
            >
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton onClick={handleClickUserMenu}>
              <AccountCircle
                sx={{ fontSize: "30px", color: "#fff" }}
              ></AccountCircle>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Button>
        </DialogActions>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box sx={{ textAlign: "center", m: "10px" }}>
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box sx={{ textAlign: "center", m: "10px" }}>
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
