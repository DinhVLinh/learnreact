import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import FilterByCart from "./Filter/FilterByCart";
import FilterByPrice from "./Filter/FilterByPrice";
import FilterByService from "./Filter/FilterByService";

ProductFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilter({ filter, onChange }) {
  function handleCartChange(newCartId) {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      "category.id": newCartId,
    };
    onChange(newFilter);
  }

  function handlePriceChange(values) {
    onChange(values);
  }

  function handleServiceChange(values) {
    onChange(values);
  }

  return (
    <Box>
      <FilterByCart onChange={handleCartChange}></FilterByCart>
      <FilterByPrice onChange={handlePriceChange}></FilterByPrice>
      <FilterByService
        filter={filter}
        onChange={handleServiceChange}
      ></FilterByService>
    </Box>
  );
}

export default ProductFilter;
