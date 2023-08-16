import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./counterSlice";

Counter.propTypes = {};

function Counter(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

  function handleIncreaseClick() {
    const action = increase();
    dispatch(action);
  }

  function handleDecreaseClick() {
    const action = decrease();
    dispatch(action);
  }
  return (
    <div>
      Counter : {count}
      <button onClick={handleIncreaseClick}>+</button>
      <button onClick={handleDecreaseClick}>-</button>
    </div>
  );
}

export default Counter;
