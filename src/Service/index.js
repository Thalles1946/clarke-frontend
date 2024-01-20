import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const accessToken = "IKpPlCY5uVmy6qolmN1Pk5RG";

const httpLink = createHttpLink({
  uri: "https://clarke-api-azure.vercel.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
