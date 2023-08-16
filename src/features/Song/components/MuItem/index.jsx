import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

MuItem.propTypes = {
  muItem: PropTypes.object.isRequired,
};

function MuItem(props) {
  const { muItem } = props;
  return (
    <div className="mu-item">
      <img src={muItem.imgUrl} alt={muItem.name} />

      <p>{muItem.name}</p>
    </div>
  );
}

export default MuItem;
