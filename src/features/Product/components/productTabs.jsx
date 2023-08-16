import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

ProductTabs.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductTabs({ currentSort, onChange }) {
  function handleSortChange(e, newValue) {
    if (onChange) onChange(newValue);
  }
  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      textColor="primary"
      aria-label="disabled tabs example"
    >
      <Tab label="Từ thấp đến cao" value="salePrice:ASC" />
      <Tab label="Từ cao xuống thấp" value="salePrice:DESC" />
    </Tabs>
  );
}

export default ProductTabs;
