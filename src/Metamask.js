import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@mui/material";
import styles from "./Metamask.module.scss";

const Metamask = (props) => {
  const { handleAccount } = props;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connected, setConnected] = useState(false);

  const formattedAcct = `${account?.slice(0, 5)}...${account?.slice(-4)}`;

  const getMetaMaskInfo = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const _account = accounts[0];
    const bigBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [_account, "latest"],
    });
    const _balance = ethers.utils.formatEther(bigBalance);
    const _chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (_account !== account) {
      setAccount(_account);
      handleAccount(_account);
    }
    if (_balance !== balance) {
      setBalance(_balance);
    }
    if (_chainId !== chainId) {
      setChainId(_chainId);
    }
    if (_chainId !== "0x4") {
      alert("Please connect to Rinkeby testnet");
    }
  };

  useEffect(() => {
    if (connected && account === null) {
      window.ethereum.on("accountsChanged", () => {
        getMetaMaskInfo();
      });
      window.ethereum.on("chainChanged", () => {
        getMetaMaskInfo();
      });
      getMetaMaskInfo();
    }
    if (connected && account !== null) {
      getMetaMaskInfo();
    }
  });

  if (typeof window.ethereum === "undefined") {
    return <h2>Install Metamask</h2>;
  }

  if (!connected) {
    return (
      <Button
        className={styles.button}
        variant="contained"
        onClick={() => {
          setConnected(true);
        }}
      >
        Connect to Metamask
      </Button>
    );
  }

  if (account === null || balance === null || chainId === null) {
    return <h5>connecting to Metamask...</h5>;
  } else {
    return (
      <div className={styles.container}>
        {chainId !== "0x4" ? <h2>WARNING: Please connect to Rinkeby</h2> : <h2>METAMASK CONNECTED:</h2>}
        <p>Account: {formattedAcct}</p>
        <p>Balance: {balance} ETH</p>
      </div>
    );
  }
};

export default Metamask;
