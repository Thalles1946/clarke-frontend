import { Button, Card, TextField, Typography } from "@mui/material";
import "./Body.css";
import { useState } from "react";

const Body = () => {
  const [kwhValue, setKwhValue] = useState(0);
  function onChangeKwhValue(value) {
    setKwhValue(value.replace(/[^0-9]/g, ""));
  }
  return (
    <body style={{ marginTop: "10%" }}>
      <div style={{ width: "23%" }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "2.6rem",
            fontWeight: 700,
            fontSize: "2rem",
            color: "white",
            textAlign: "left",
          }}
        >
          Economize até 40% na conta de luz da sua empresa sem precisar investir
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            textAlign: "left",
          }}
        >
          Se o seu negócio gasta mais de R$ 10 mil por mês com energia, a Clarke
          pode te ajudar a economizar com o Mercado Livre de Energia.
        </Typography>
      </div>
      <Card>
        <form
          style={{
            padding: "2rem",
          }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              marginTop: "10%",
            }}
          >
            <label style={{ marginBottom: "0.4rem" }}>
              Qual o seu consumo mensal de energia? (Em kWh)
            </label>
            <TextField
              style={{ borderRadius: "20rem" }}
              placeholder="Ex: 30.000"
              size="small"
              value={kwhValue}
              onChange={(event) => onChangeKwhValue(event.target.value)}
            />
          </div>
          <Button
            sx={{
              borderRadius: "4rem",
              width: "100%",
              marginTop: "1.5rem",
              backgroundColor: "#00df7c",
              "&:hover": {
                backgroundColor: "#22c55e",
              },
              color: "black",
            }}
          >
            Consultar
          </Button>
        </form>
      </Card>
    </body>
  );
};

export default Body;
