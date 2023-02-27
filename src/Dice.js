import React from "react";
import "./styles.css";
export default function Dice(props) {
  return (
    <div
      className={props.isHeld ? "green-die-face" : "die-face"}
      onClick={() => {
        props.holdDice(props.id);
      }}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
