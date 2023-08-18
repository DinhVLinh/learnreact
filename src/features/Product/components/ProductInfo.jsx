import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

ProductInfo.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "16px",
  },

  title: {},

  shortDescription: {
    padding: "16px 0",
  },
  price: {
    backgroundColor: "#f0eded",
    padding: "10px",
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
  },

  saleBox: {
    padding: "10px 0",
  },

  originalPrice: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: "400",
  },
  promotionPercent: {
    fontSize: theme.typography.h5.fontSize,
    marginLeft: "20px",
  },
}));

function ProductInfo({ product }) {
  const classes = useStyle();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;
  return (
    <Box className={classes.root}>
      <Typography component={"h1"} variant="h4" className={classes.title}>
        {name}
      </Typography>
      <Typography variant="body2" className={classes.shortDescription}>
        {shortDescription}
      </Typography>

      <Box className={classes.price}>
        <Box component={"span"} className={classes.salePrice}>
          {`GIÁ MỚI : ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(salePrice)}
          `}
        </Box>

        <Box className={classes.saleBox}>
          <Box component={"span"} className={classes.originalPrice}>
            {`GIÁ CŨ : ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(originalPrice)}
          `}
          </Box>
          <Box component={"span"} className={classes.promotionPercent}>
            {promotionPercent > 0 ? `- ${promotionPercent}%` : ""}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
