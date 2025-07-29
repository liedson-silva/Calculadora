import "./App.css";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0");

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "x",
    "C", "0", "=", "/"
  ];

  function parseExpression(expression) {
    const operators = ["+", "-", "x", "/"];
    for (const operator of operators) {
      const parts = expression.split(operator);
      if (parts.length === 2) {
        return { n1: parts[0], n2: parts[1], op: operator };
      }
    }
    return null; // expressão inválida
  }

  async function handleClick(value) {
    if (value === "C") {
      setDisplay("0");
      return;
    }

    if (value === "=") {
      const parsed = parseExpression(display);

      if (!parsed) {
        setDisplay("Erro");
        return;
      }

      const opMap = { "+": "sum", "-": "sub", "x": "mul", "/": "div" };
      const op = opMap[parsed.op];

      try {
        const res = await fetch(`http://localhost:3000/calc?n1=${parsed.n1}&n2=${parsed.n2}&op=${op}`);
        const text = await res.text();

        if (!isNaN(text)) {
          setDisplay(text);
        } else {
          setDisplay("Erro");
        }
      } catch {
        setDisplay("Erro");
      }
      return; // para não concatenar '=' no display
    }

    // Código original: concatena valor no display
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={
              "btn " +
              (["+", "-", "x", "/", "="].includes(btn) ? "operator " : "") +
              (btn === "C" ? "clear" : "")
            }
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
