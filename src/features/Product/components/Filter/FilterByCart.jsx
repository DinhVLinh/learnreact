import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryApi from "api/categoryApi";
import { Box, Typography } from "@mui/material";

FilterByCart.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCart({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const reponse = await categoryApi.getAll();
        // console.log({ reponse });
        setCategoryList(
          reponse.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Failed for get cart", error);
      }
    })();
  }, []);

  function handleCartClick(category) {
    if (onChange) onChange(category.id);
  }

  return (
    <Box>
      <Typography variant="body2">DANH MỤC SẢN PHẨM : </Typography>
      <ul style={{ listStyle: "none" }}>
        {categoryList.map((cart) => (
          <li
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              fontSize: " 16px",
            }}
            key={cart.id}
            onClick={() => handleCartClick(cart)}
          >
            <Typography variant="body2"> {cart.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCart;
