import React from "react";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid } from "@material-ui/core";

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
  length: 6,
};

function ProductSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((pro, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Box padding={1}>
              <Skeleton variant="rect" width={"100%"} height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
