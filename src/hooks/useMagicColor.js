import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function randomColor(currentColor) {
  const colorList = ["violet", "red", "green", "yellow", "orange"];
  const currentIndex = colorList.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 5);
  }

  return colorList[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState("black");
  const colorRef = useRef("black");
  useEffect(() => {
    const colorInteval = setInterval(() => {
      const magicColor = randomColor(colorRef.current);

      setColor(magicColor);

      colorRef.current = magicColor;
    }, 1000);
    return () => {
      clearInterval(colorInteval);
    };
  }, []);

  return { color };
}

export default useMagicColor;
