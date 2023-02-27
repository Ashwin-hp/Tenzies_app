import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./styles.css";
export default function App() {
  const [rolls, setRolls] = React.useState(0);
  function Roll() {
    setRolls((rolls) => (tenzies ? rolls : rolls + 1));
    tenzies
      ? window.location.reload(false)
      : setDice((oldDice) =>
          oldDice.map((item) => {
            if (item.isHeld === true) return item;
            else {
              return {
                ...item,
                value: randomNumber()
              };
            }
          })
        );
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            isHeld: !item.isHeld
          };
        } else return item;
      })
    );
  }
  function randomNumber() {
    return Math.ceil(Math.random() * 6);
  }
  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return arr;
  }
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    let val = dice[0].value;
    let count = 0;
    dice.map((item) => {
      if (item.isHeld && item.value === val) {
        count++;
      }
    });
    if (count == 10) {
      setTenzies(true);
      console.log("You Won !!");
    }
  }, [dice]);
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">
        {dice.map((item) => (
          <Dice
            key={item.id}
            id={item.id}
            value={item.value}
            isHeld={item.isHeld}
            holdDice={holdDice}
          />
        ))}
      </div>
      <button className="roll-dice" onClick={Roll}>
        {tenzies ? "NEW GAME" : "ROLL"}
      </button>
      <h3>Number of Rolls : {rolls}</h3>
    </main>
  );
}
