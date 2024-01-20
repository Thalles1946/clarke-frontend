import {
  Backdrop,
  Button,
  Card,
  TextField,
  Typography,
  CardContent,
  CardHeader,
} from "@mui/material";
import "./Body.css";
import { useState } from "react";
import { fetchEmpresas } from "../../Service";

const Body = () => {
  const [kwhValue, setKwhValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const [response, setResponse] = useState([]);
  function onChangeKwhValue(value) {
    setErrorField(false);
    setKwhValue(value.replace(/[^0-9]/g, ""));
  }

  async function submit() {
    if (!kwhValue) {
      setErrorField(true);
      return;
    }
    const res = await fetchEmpresas(parseFloat(kwhValue));
    setResponse(res);
    if (response) {
      setDrawerOpen(true);
    }
  }

  function createOptions() {
    return (
      <>
        {response.map((data) => (
          <Card sx={{ margin: "0.5rem" }}>
            <CardHeader
              sx={{
                display: "flex",
              }}
              title={data.nome}
              subheader={data.estado_origem}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Typography>Custo(por kWh) : R${data.custo_por_kWh}</Typography>
                <Typography>
                  Limite minimo de kWh : {data.limite_minimo_kWh}
                </Typography>
              </div>
              <div>
                <Typography>
                  Número de clientes : {data.numero_total_clientes}
                </Typography>
                <Typography>
                  Avaliação : {data.avaliacao_media_clientes}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <body style={{ marginTop: "10%", display: "flex", alignItems: "center" }}>
      <div style={{ width: "23%" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: "2.6rem",
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
            marginTop: "1rem",
          }}
        >
          Preenchendo o formulário ao lado, será possivel identificar as
          empresas parceiras que atendem a sua necessidade de consumo.
        </Typography>
      </div>
      <Card
        sx={{
          maxHeight: "20rem",
        }}
      >
        <form
          style={{
            padding: "2rem",
          }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
            }}
          >
            <label style={{ marginBottom: "0.4rem" }}>
              Qual o seu consumo mensal de energia? (Em kWh)
            </label>
            <TextField
              style={{ borderRadius: "20rem" }}
              placeholder="Ex: 100"
              size="small"
              value={kwhValue}
              onChange={(event) => onChangeKwhValue(event.target.value)}
              error={errorField}
              helperText={errorField ? "Insira um valor no campo" : null}
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
            onClick={() => submit()}
          >
            Consultar
          </Button>
        </form>
      </Card>
      <Backdrop open={drawerOpen}>
        <Card
          sx={{
            maxHeight: "60%",
            width: "70%",
            overflowY: "scroll",
          }}
        >
          {response && response.length > 0 ? createOptions() : null}
          <Button
            sx={{
              borderRadius: "4rem",
              margin: "0.5rem",
              width: "70%",
              backgroundColor: "#00df7c",
              "&:hover": {
                backgroundColor: "#22c55e",
              },
              color: "black",
            }}
            onClick={() => setDrawerOpen(false)}
          >
            Fechar
          </Button>
        </Card>
      </Backdrop>
    </body>
  );
};

export default Body;
