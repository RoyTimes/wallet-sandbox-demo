import logo from './logo.svg';
import './App.css';

import {ApiPromise, WsProvider} from '@polkadot/api'
import { Keyring } from '@polkadot/keyring';
import { waitReady } from '@polkadot/wasm-crypto';
import {parse} from 'query-string'
import {sendTx} from '@skyekiwi/util'

function App() {

  const params = parse(window.location.search);
  
  console.log(params)

  window.onload = async () => {

    await waitReady();
    
    const keyring = new Keyring({ type: 'sr25519' });
    const key = keyring
      .addFromUri("KEY");

    const provider = new WsProvider("wss://staging.rpc.skye.kiwi");
    const api = await ApiPromise.create({provider: provider});

    const rawTx = params.tx;
    const tx = api.tx(rawTx);

    alert("Submitting transaction...");
    
    await sendTx(tx, key)

    window.location.href = params.callback;
  }

  return (
    <div className="App">
      <h1>Best Wallet</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
