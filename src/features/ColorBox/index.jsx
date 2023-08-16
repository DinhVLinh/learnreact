import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
ColorBox.propTypes = {};

function getRandomColor() {
  const colorList = ["violet", "red", "green", "yellow", "orange"];
  const randomIndex = Math.trunc(Math.random() * 5);

  return colorList[randomIndex];
}

function ColorBox(props) {
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem("color-box") || "violet";

    return initColor;
  });
  function handleClickBox() {
    const newColor = getRandomColor();
    setColor(newColor);
    // localStorage.setItem("color-box", newColor);
  }
  return (
    <div
      className="color-box"
      onClick={handleClickBox}
      style={{ backgroundColor: color }}
    >
      <p>Color Box</p>
    </div>
  );
}

export default ColorBox;
