import { Box, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddToCartForm from "../AddToCartForm";
import { addToCart, removeCartItem } from "./cartSlice";

CartItem.propTypes = {};

function CartItem({ product, onClick }) {
  const thumbnail = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail?.url}`
    : "https://via.placeholder.com/444";
  const dispatch = useDispatch();

  function handleAddToCardSunmit(formValues) {
    const action = addToCart({
      id: product.id,
      product: product,
      quantity: formValues.quantity,
    });
    // console.log(action);
    dispatch(action);
  }

  function handleRemoveToCard(id) {
    if (onClick) onClick(id);
    console.log("123");
  }

  return (
    <Box display={"flex"}>
      <Box display={"flex"}>
        <img src={thumbnail} alt="" width={"20%"} />
        <Box>
          <Typography>{product.name}</Typography>
          <Typography>{product.isFreeShip ? "Mien phi ship" : ""}</Typography>
          <Button onClick={handleRemoveToCard}>Xoa</Button>
        </Box>

        <Box>
          <Typography variant="body2">
            <Box
              component={"span"}
              fontSize={"16px"}
              fontWeight={"bold"}
              mr={1}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.salePrice)}
            </Box>
            {product.promotionPercent > 0
              ? `- ${product.promotionPercent}%`
              : ""}
          </Typography>
        </Box>
      </Box>
      <Box>
        <AddToCartForm onSubmit={handleAddToCardSunmit}></AddToCartForm>
      </Box>
    </Box>
  );
}

export default CartItem;
