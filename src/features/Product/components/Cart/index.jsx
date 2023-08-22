import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { cartItemsTotalSelector } from "./selector";

CartProduct.propTypes = {};

function CartProduct(props) {
  const totalCart = useSelector(cartItemsTotalSelector);
  return <div>Product Cart {totalCart} </div>;
}

export default CartProduct;
