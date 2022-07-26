import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useQuery } from "urql";
import { Button, TextField } from "@mui/material";
import styles from "./NewGame.module.scss";

const NewGame = (props) => {
  const { account, handleGame } = props;
  const [lastGame, setLastGame] = useState(null);
  const [bet, setBet] = useState("");
  const [status, setStatus] = useState(null);

  const abi = require("./abi/c4abi.json");
  const c4address = "0x221854d60317A923d42229a6E5646823Fc5c9148";
  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "rinkeby"
  );
  const signer = provider.getSigner(account);
  const contract = new ethers.Contract(c4address, abi, signer);

  const sendInitializeGame = async () => {
    try {
      setStatus("Metamask: \n waiting for user...");
      await contract.initializeGame({
        value: ethers.BigNumber.from(bet),
        gasLimit: 500000,
      });
      setStatus("METAMASK: TRANSACTION SENT, WAITING FOR CONFIRMATION...");
    } catch (err) {
      setBet("");
      setStatus(null);
    }
  };

  const LAST_GAME = `
        query Game($p: Bytes) {
            games(
                where: { player1: $p }
                first: 1
                orderBy: id
                orderDirection: desc
            )
            {
                id
                betAmount
                moves
                player1
                player2
                status
                nextPlayer
            }
        }
    `;

  const [result, reexecuteQuery] = useQuery({
    query: LAST_GAME,
    variables: { p: account },
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (result.fetching) return;

    const timerId = setTimeout(() => {
      reexecuteQuery();
    }, 3000);

    if (result.data.games.length === 0) {
      if (lastGame === null) {
        setLastGame("none");
        return;
      }
    } else {
      if (lastGame === null) {
        setLastGame(result.data.games[0].id);
        return;
      }
      if (result.data.games[0].id !== lastGame) {
        handleGame(result.data.games[0]);
      }
    }
    return () => clearTimeout(timerId);
  }, [result]);

  if (result.error) return <p>Error: {result.error.message}</p>;

  if (status === null) {
    return (
      <div className={styles.container}>
        <div className={styles.betContainer}>
          <TextField
            id="outlined-basic"
            label="BET AMOUNT (WEI)"
            variant="outlined"
            type="number"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={!parseInt(bet) > 0 || parseInt(bet) > 10 ** 18}
            onClick={() => {
              sendInitializeGame();
            }}
          >
            START GAME
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>{status}</div>
      </div>
    );
  }
};

export default NewGame;
