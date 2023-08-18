import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnail = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail?.url}`
    : "https://via.placeholder.com/444";

  const history = useHistory();

  function handleClick() {
    history.push(`/products/${product.id}`);
  }
  return (
    <Box
      padding={1}
      minHeight={"215px"}
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Box padding={1}>
        <img src={thumbnail} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component={"span"} fontSize={"16px"} fontWeight={"bold"} mr={1}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? `- ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
