import logo from './logo.svg';
import './App.css';

import {ApiPromise, WsProvider} from '@polkadot/api'
import queryString from 'query-string'
const walletURL = "http://localhost:3001"

function App() {
  return (
    <div className="App">
      <h1>Best DApp</h1>
      <header className="App-header" onClick={ async event => {
            event.preventDefault();

            const provider = new WsProvider("wss://staging.rpc.skye.kiwi");
            const api = await ApiPromise.create({provider: provider});


            const tx = api.tx.balances.transfer(
              "5CQ5PxbmUkAzRnLPUkU65fZtkypqpx8MrKnAfXkSy9eiSeoM",
              1
            );
            
            alert("Submitting transaction...");

            window.location.href = walletURL + "?" + queryString.stringify({
              tx: tx.toHex(),
              callback: "http://localhost:3000"
            });
      }}>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
