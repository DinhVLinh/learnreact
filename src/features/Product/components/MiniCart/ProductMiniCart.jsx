import { Box, MenuItem } from "@material-ui/core";
import MiniCartItem from "./MiniCartItem";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import productApi from "api/productsApi";

function ProductMiniCart() {
  const {
    params: { productId },
  } = useRouteMatch();
  console.log(productId, "123details");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const reponse = await productApi.getById(productId);
        setProduct(reponse);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, [productId]);
  return (
    <Box>
      <MenuItem>
        <MiniCartItem product={product}></MiniCartItem>
      </MenuItem>
    </Box>
  );
}

export default ProductMiniCart;
