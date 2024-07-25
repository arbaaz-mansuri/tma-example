import React from "react";
import "./App.css";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  console.log(connectors, "connectors");

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div>
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  return (
    <>
      <div className="w-full h-dvh flex flex-col justify-center items-center">
        <ConnectWallet />
      </div>
    </>
  );
}

export default App;
