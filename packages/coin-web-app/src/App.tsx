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
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`,
      {}
    );
    updateCoins(data.coins as Coin[]);
  }

  function updateInputValues(type: string, value: any) {
    updateInput({ ...input, [type]: value });
  }
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="limit"
        onChange={(e) => updateInputValues("limit", e.target.value)}
      />
      <input
        placeholder="start"
        onChange={(e) => updateInputValues("start", e.target.value)}
      />

      <button onClick={fetchCoins}>Fetch Coins</button>

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
