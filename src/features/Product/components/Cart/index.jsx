import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsCountSelector, cartItemsTotalSelector } from "./selector";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import CartItem from "./CartItem";
import { removeCartItem } from "./cartSlice";

CartProduct.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {},

  right: {
    width: "250px",
  },

  left: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    marginTop: " 30px",
    paddingBottom: " 30px",
  },
}));

function CartProduct(props) {
  const classes = useStyle();
  const totalCart = useSelector(cartItemsTotalSelector);
  const countCart = useSelector(cartItemsCountSelector);
  const proList = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  function handleRemoveToCard(formValues) {
    const action = removeCartItem(formValues);
    dispatch(action);
  }

  return (
    <Box sx={{ pt: 5 }}>
      <Container>
        <Typography>
          Gio Hang <span>{`(${countCart} san pham)`}</span>
        </Typography>

        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            {" "}
            <Box>
              <Paper>
                <ul style={{ listStyle: "none" }}>
                  {proList.map((pro) => (
                    <li key={pro.product.id}>
                      <CartItem
                        product={pro.product}
                        onClick={() => handleRemoveToCard(pro.id)}
                      ></CartItem>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Box>
          </Grid>

          <Grid item className={classes.right}>
            <Box>
              <Paper>Tong gia tri :{totalCart} </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartProduct;
