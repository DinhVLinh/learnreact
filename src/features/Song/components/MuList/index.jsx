import React from "react";
import PropTypes from "prop-types";
import MuItem from "../MuItem";
import "./styles.scss";

MuList.propTypes = {
  muList: PropTypes.array.isRequired,
};

function MuList(props) {
  const { muList } = props;

  return (
    <ul className="mu-list">
      {muList.map((muItem) => (
        <li key={muItem.id}>
          <MuItem muItem={muItem} />
        </li>
      ))}
    </ul>
  );
}

export default MuList;
