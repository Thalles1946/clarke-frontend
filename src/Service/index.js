import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache(),
});

export function fetchEmpresas(kWh) {
  const request = client
    .query({
      query: gql`
        query consultaEmpresas($kWh: Float!) {
          consultaEmpresas(kWh: $kWh) {
            nome
            limite_minimo_kWh
            estado_origem
            custo_por_kWh
            limite_minimo_kWh
            numero_total_clientes
            avaliacao_media_clientes
          }
        }
      `,
      variables: {
        kWh: kWh,
      },
    })
    .then((result) => {
      if (result.data.consultaEmpresas !== null) {
        return result.data.consultaEmpresas;
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));

  return request;
}
