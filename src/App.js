import { useEffect } from "react";
import "./App.css";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import { fetchEmpresas } from "./Service";

function App() {
  // useEffect(() => {
  //   fetchEmpresas(100);
  // }, []);
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

export default App;
