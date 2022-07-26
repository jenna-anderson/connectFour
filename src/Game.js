import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useQuery } from "urql";
import { BsFillCircleFill } from "react-icons/bs";
import { Button, Paper } from "@mui/material";
import Board from "./Board.js";
import styles from "./Game.module.scss";

const GAME_INFO = `
    query Game($g: ID!) {
        game( id: $g )
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

const boardPos = (idx) => {
  let row = Math.floor(idx / 7);
  let col = idx % 7;
  console.log("boardPos", col, row)
  return [col, row];
};

const winningDirection = {
  LeftDiagonal: 0,
  Up: 1,
  RightDiagonal: 2,
  Right: 3,
};

const Game = (props) => {
  const { handleGame, game, account } = props;

  const [result, reexecuteQuery] = useQuery({
    query: GAME_INFO,
    variables: { g: game.id },
    requestPolicy: "network-only",
  });

  const abi = require("./abi/c4abi.json");
  const c4address = "0x221854d60317A923d42229a6E5646823Fc5c9148";
  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "rinkeby"
  );

  const updateContract = () => {
    const signer = provider.getSigner(account);
    return new ethers.Contract(c4address, abi, signer);
  };

  const updateBoard = () => {
    const tempBoard = new Array(42).fill(0);
    for (let i = 0; i < game.moves?.length; i++) {
      if (i % 2 === 0) {
        tempBoard[game.moves[i]] = 1;
      } else {
        tempBoard[game.moves[i]] = 2;
      }
    }

    let winner_info = null;
    let playerNumber = account === game.player1 ? 1 : 2;
    for (let i = 0; i < 42; i++) {
      if (tempBoard[i] !== playerNumber) {
        continue;
      }
      let coord = boardPos(i);
      //left horizontal
      if (coord[0] >= 3) {
        if (
          tempBoard[i] === tempBoard[i - 1] &&
          tempBoard[i] === tempBoard[i - 2] &&
          tempBoard[i] === tempBoard[i - 3]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i - 1] = tempBoard[i - 1] + 2;
        //   tempBoard[i - 2] = tempBoard[i - 2] + 2;
        //   tempBoard[i - 3] = tempBoard[i - 3] + 2;
        //   let [col, row] = boardPos(i - 3);
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.Right];
          break;
        }
      }
      //right horizontal
      if (coord[0] <= 3) {
        if (
          tempBoard[i] === tempBoard[i + 1] &&
          tempBoard[i] === tempBoard[i + 2] &&
          tempBoard[i] === tempBoard[i + 3]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i + 1] = tempBoard[i + 1] + 2;
        //   tempBoard[i + 2] = tempBoard[i + 2] + 2;
        //   tempBoard[i + 3] = tempBoard[i + 3] + 2;
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.Right];
          break;
        }
      }
      //up vertical
      if (coord[1] <= 2) {
        if (
          tempBoard[i] === tempBoard[i + 7] &&
          tempBoard[i] === tempBoard[i + 14] &&
          tempBoard[i] === tempBoard[i + 21]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i + 7] = tempBoard[i + 7] + 2;
        //   tempBoard[i + 14] = tempBoard[i + 14] + 2;
        //   tempBoard[i + 21] = tempBoard[i + 21] + 2;
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.Up];
          break;
        }
      }
      //down vertical
      if (coord[1] >= 3) {
        if (
          tempBoard[i] === tempBoard[i - 7] &&
          tempBoard[i] === tempBoard[i - 14] &&
          tempBoard[i] === tempBoard[i - 21]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i - 7] = tempBoard[i - 7] + 2;
        //   tempBoard[i - 14] = tempBoard[i - 14] + 2;
        //   tempBoard[i - 21] = tempBoard[i - 21] + 2;
        //   let [col, row] = boardPos(i - 21);
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.Up];
          break;
        }
      }
      //left diagonal up
      if (coord[0] >= 3 && coord[1] <= 2) {
        if (
          tempBoard[i] === tempBoard[i + 6] &&
          tempBoard[i] === tempBoard[i + 12] &&
          tempBoard[i] === tempBoard[i + 18]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i + 6] = tempBoard[i + 6] + 2;
        //   tempBoard[i + 12] = tempBoard[i + 12] + 2;
        //   tempBoard[i + 18] = tempBoard[i + 18] + 2;
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.LeftDiagonal];
          break;
        }
      }
      //right diagonal up
      if (coord[0] <= 3 && coord[1] <= 2) {
        if (
          tempBoard[i] === tempBoard[i + 8] &&
          tempBoard[i] === tempBoard[i + 16] &&
          tempBoard[i] === tempBoard[i + 24]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i + 8] = tempBoard[i + 8] + 2;
        //   tempBoard[i + 16] = tempBoard[i + 16] + 2;
        //   tempBoard[i + 24] = tempBoard[i + 24] + 2;
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.RightDiagonal];
          break;
        }
      }
      //left diagonal down
      if (coord[0] >= 3 && coord[1] <= 3) {
        if (
          tempBoard[i] === tempBoard[i - 8] &&
          tempBoard[i] === tempBoard[i - 16] &&
          tempBoard[i] === tempBoard[i - 24]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i - 8] = tempBoard[i - 8] + 2;
        //   tempBoard[i - 16] = tempBoard[i - 16] + 2;
        //   tempBoard[i - 24] = tempBoard[i - 24] + 2;
        //   let [col, row] = boardPos(i - 24);
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.RightDiagonal];
          break;
        }
      }
      //right diagonal down
      if (coord[0] <= 3 && coord[1] >= 3) {
        if (
          tempBoard[i] === tempBoard[i - 6] &&
          tempBoard[i] === tempBoard[i - 12] &&
          tempBoard[i] === tempBoard[i - 18]
        ) {
        //   tempBoard[i] = tempBoard[i] + 2;
        //   tempBoard[i - 6] = tempBoard[i - 6] + 2;
        //   tempBoard[i - 12] = tempBoard[i - 12] + 2;
        //   tempBoard[i - 18] = tempBoard[i - 18] + 2;
        //   let [col, row] = boardPos(i - 24);
          let [col, row] = boardPos(i);
          winner_info = [col, row, winningDirection.RightDiagonal];
          break;
        }
      }
    }
    return [tempBoard, winner_info];
  };

  const updateStatus = () => {
    if (game.status === "finished" && board[1] === null) {
      return <span>GAME FINISHED, YOU LOST: {game.betAmount * 2} WEI</span>;
    }
    console.log(board[1])
    console.log(game.status)
    if (game.status === "finished" && board[1] !== null) {
      return <span>GAME FINISHED, YOU WON: {game.betAmount * 2} WEI</span>;
    }
    if (board[1]) {
      return "winner";
    }
    if (game.status === "initialized") {
      if (game.player1 !== account) {
        return "challenge";
      } else {
        return "WAITING FOR OPPONENT...";
      }
    } else if (game.status === "started") {
      if (game.moves?.length === 42) {
        return "GAME TIE!";
      }
      if (game.nextPlayer !== account) {
        return "WAITING FOR OPPONENT...";
      } else {
        return "CLICK ARROW TO DROP A CHIP...";
      }
    }
  };

  const [contract, setContract] = useState(updateContract());
  const [board, setBoard] = useState(updateBoard());
  const [status, setStatus] = useState(updateStatus());
  const color = account === game.player1 ? "red" : "yellow";

  const sendStartGame = async () => {
    setStatus("METAMASK: WAITING FOR USER...");
    try {
      await contract.startGame(game.id, {
        value: ethers.BigNumber.from(game.betAmount),
        gasLimit: 500000,
      });
    } catch (err) {
      setStatus(updateStatus());
      console.log("Metamask: error");
    }
  };

  const sendPlayMove = async (col) => {
    setStatus("METAMASK: PLEASE CONFIRM TRANSACTION...");
    try {
      await contract.playMove(game.id, col, {
        gasLimit: 500000,
      });
      setStatus("METAMASK: TRANSACTION SENT, WAITING FOR VALIDATION...");
    } catch (err) {
      setStatus(updateStatus());
      console.log("Metamask: error");
    }
  };

  const sendClaimReward = async () => {
      console.log('jjclaimreward')
    setStatus("METAMASK: WAITING FOR USER...");
    try {
      await contract.claimReward(
        game.id,
        account,
        board[1][0],
        board[1][1],
        board[1][2],
        {
          gasLimit: 500000,
        }
      );
      setStatus("METAMASK: TRANSACTION SENT, WAIT FOR CONFIRMATION...");
    } catch (err) {
      setStatus(updateStatus());
      console.log(err);
    }
  };

  useEffect(() => {
    if (result.fetching) {
      return;
    }
    const timerId = setTimeout(() => {
      reexecuteQuery();
    }, 3000);

    if (JSON.stringify(game) !== JSON.stringify(result.data.game)) {
      handleGame(result.data.game);
    }
    return () => clearTimeout(timerId);
  }, [result]);

  useEffect(() => {
    setBoard(updateBoard());
  }, [game]);

  useEffect(() => {
    setStatus(updateStatus());
  }, [board]);

  return (
      <div className={styles.container}>
        <Paper elevation={8}>
          <div className={styles.info}>
            <div className={styles.status}>
              {status !== "challenge" && status !== "winner" && (
                <h3>{status}</h3>
              )}
              {status === "challenge" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    sendStartGame();
                  }}
                >
                  ACCEPT CHALLENGE
                </Button>
              )}
              {status === "winner" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    sendClaimReward();
                  }}
                >
                  WINNER! CLAIM REWARD
                </Button>
              )}
            </div>
            <div className={styles.row}>
              <h4>YOUR COLOR: </h4>
              {color === "red" ? (
                <BsFillCircleFill color="#d32f2f" />
              ) : (
                <BsFillCircleFill color="#fbc02d" />
              )}
            </div>

            <div className={styles.row}>
              <h4>GAME ID: </h4>
              <p>{parseInt(game.id)}</p>
            </div>

            <div className={styles.row}>
              <h4>STATUS: </h4>
              <p>{game.status}</p>
            </div>

            <div className={styles.row}>
              <h4>BET (WEI): </h4>
              <p>{parseInt(game.betAmount)}</p>
            </div>

            <div className={styles.row}>
              <h4>OPPONENT: </h4>
              {game.player1 === account ? (
                game.player2 === "0x00000000" ? (
                  <span>open</span>
                ) : (
                  `${game.player2.slice(0, 5)}...${game.player2.slice(-4)}`
                )
              ) : (
                `${game.player1.slice(0, 5)}...${game.player1.slice(-4)}`
              )}
            </div>
          </div>

          <div className={styles.button}>
            <Button
              variant="contained"
              onClick={() => {
                handleGame(null);
              }}
            >
              CHANGE GAME
            </Button>
          </div>
        </Paper>

        <div>
          <Board
            sendPlayMove={sendPlayMove}
            status={game.status}
            account={account}
            board={board}
            game={game}
          />
        </div>
      </div>
  );
};

export default Game;
