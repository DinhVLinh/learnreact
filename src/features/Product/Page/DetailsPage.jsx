import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Paper,
  makeStyles,
} from "@material-ui/core";
import productApi from "api/productsApi";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import ProductDesc from "../components/ProductDesc";
import ProductInfo from "../components/ProductInfo";
import ProductMenu from "../components/ProductMenu";
import ProductThumbnail from "../components/ProductThumbnail";
import ProductAdditional from "../components/ProductAdditional";
import ProductReviews from "../components/ProductReviews";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Product/components/Cart/cartSlice";

DetailsPage.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },

  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: "1px solid #dbdada",
  },

  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },
}));

function DetailsPage() {
  const classes = useStyle();

  const {
    params: { productId },
    url,
  } = useRouteMatch();
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

  if (loading) {
    return (
      <Box>
        <LinearProgress></LinearProgress>
      </Box>
    );
  }

  function handleAddToCardSunmit(formValues) {
    const action = addToCart({
      id: product.id,
      product: product,
      quantity: formValues.quantity,
    });
    dispatch(action);
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product}></ProductThumbnail>
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product}></ProductInfo>
              <AddToCartForm
                onSubmit={handleAddToCardSunmit}
                product={product}
              />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu></ProductMenu>

        <Switch>
          <Route path={url} exact>
            <ProductDesc product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailsPage;
