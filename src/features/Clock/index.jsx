import React, { useEffect, useState } from "react";
import useClock from "../../hooks/useClock";
import useMagicColor from "../../hooks/useMagicColor";
import "./styles.scss";

function Clock() {
  const { timeString } = useClock();
  const { color } = useMagicColor();

  return (
    <div className="clock">
      <p style={{ fontSize: "50px", color: color, margin: "50px" }}>
        {timeString}
      </p>
    </div>
  );
}

export default Clock;
