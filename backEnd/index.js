import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/calc", (req, res) => {
  const { n1, n2, op } = req.query;

  const a = parseFloat(n1);
  const b = parseFloat(n2);

  let result;

  switch (op) {
    case "sum":
      result = a + b;
      break;
    case "sub":
      result = a - b;
      break;
    case "mul":
      result = a * b;
      break;
    case "div":
      if (b > a || b == 0) {
        res.send("Divisão inválida!");
      } else {
        result = a / b;
      }
      break;
    default:
      return res.send("Operador inválido!");
  }
  res.send(`${result}`);
});

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

export default app;