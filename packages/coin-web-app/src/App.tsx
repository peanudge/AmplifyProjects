import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "aws-amplify";

type Coin = {
  name: string;
  symbol: string;
  price_usd: string;
};
function App() {
  const [coins, updateCoins] = useState<Coin[]>([]);

  async function fetchCoins() {
    const data = await API.get("cryptoapi", "/coins", {});
    updateCoins(data.coins as Coin[]);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      {coins.map((coin, idx) => {
        return (
          <div key={idx}>
            <h2>
              {coin.name} - {coin.symbol}
            </h2>
            <h5>${coin.price_usd}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default App;
