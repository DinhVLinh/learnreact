import { Box, Container, Grid, Paper, makeStyles } from "@material-ui/core";
import ProductThumbnail from "../components/ProductThumbnail";
import { useEffect, useState } from "react";
import productApi from "api/productsApi";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom";
import ProductInfo from "../components/ProductInfo";
import AddToCartForm from "../components/AddToCartForm";

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
  } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

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
    return <Box>Loading</Box>;
  }

  function handleAddToCardSunmit(formValues) {
    console.log(formValues);
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
              <AddToCartForm onSubmit={handleAddToCardSunmit} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailsPage;
