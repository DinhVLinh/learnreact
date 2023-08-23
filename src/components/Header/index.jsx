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
import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import { logout } from "features/Auth/userSlice";
import { AccountCircle } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsCountSelector } from "features/Product/components/Cart/selector";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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
  const countProduct = useSelector(cartItemsCountSelector);
  const history = useHistory();

  localStorage.setItem("countProduct", JSON.stringify(countProduct));
  const saveCountCart = JSON.parse(localStorage.getItem("countProduct"));
  const proList = useSelector((state) => state.cart.cartItems);

  const [openCart, setOpenCart] = useState(null);

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

  const handleClickMiniCart = (event) => {
    setOpenCart(event.currentTarget);
  };

  const handleCloseMiniCart = () => {
    setOpenCart(null);
  };

  const handleClickLogout = () => {
    const action = logout();
    dispatch(action);
  };

  function handleClickCartButton() {
    history.push("/carts");
  }

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

          <NavLink to="/products">
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
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClickMiniCart}
            >
              <Badge badgeContent={saveCountCart} color="error">
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            </IconButton>
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

      <Menu
        keepMounted
        anchorEl={openCart}
        open={Boolean(openCart)}
        onClose={handleCloseMiniCart}
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
        {saveCountCart > 0 ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {proList.map((pro) => (
              <li style={{ padding: "10px 20px", width: "300px" }}>
                <MenuItem>
                  <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Box padding={1}>
                      <img
                        src={pro.product.thumbnail?.url}
                        alt={pro.product.name}
                        width="100%"
                      />
                    </Box>

                    <Box>
                      <Typography>{pro.product.name}</Typography>
                      <Typography>
                        <Box component={"span"}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(pro.product.salePrice)}
                        </Box>
                        {pro.product.promotionPercent > 0
                          ? `- ${pro.product.promotionPercent}%`
                          : ""}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              </li>
            ))}
            <Button onClick={handleClickCartButton}>View To Cart</Button>
          </ul>
        ) : (
          <MenuItem>
            <Typography>Khong co san pham</Typography>
          </MenuItem>
        )}
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
