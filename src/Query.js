import { Button, Divider } from "@mui/material";
import { useQuery } from "urql";
import styles from "./Query.module.scss";

const Query = (props) => {
  const { account, handleGame, gql } = props;
  const [result, reexecuteQuery] = useQuery({
    query: gql,
    variables: { p: account },
    requestPolicy: "network-only",
  },);


  const { data, fetching, error } = result;

  if (fetching) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;
  const waiting = data.games.filter(
    (game) =>
      (game.status === "initialized" && game.player1 === account) ||
      (game.status === "started" && game.nextPlayer !== account)
  );

  const ready = data.games.filter(
    (game) =>
      //   (game.status = "initialized" && game.player1 !== account) ||
      game.status === "started" && game.nextPlayer === account
  );

  const open = data.games.filter(
    (game) => game.status === "initialized" && game.player1 !== account
  );

  const readyElement = ready.map((game) => (
    <Button
      variant="contained"
      key={game.id}
      className={styles.readyButton}
      onClick={() => handleGame(game)}
    >
      ID: {parseInt(game.id)} / POT: {game.betAmount * 2} / MOVES:{" "}
      {game.moves?.length ? game.moves.length : 0}
    </Button>
  ));

  const waitingElement = waiting.map((game) => (
    <Button
      variant="outlined"
      key={game.id}
      className={styles.waitingButton}
      onClick={() => handleGame(game)}
    >
      ID: {parseInt(game.id)} / POT: {game.betAmount * 2} / MOVES:{" "}
      {game.moves?.length ? game.moves.length : 0}
    </Button>
  ));

  const openElement = open.map((game) => (
    <Button
      variant="outlined"
      key={game.id}
      className={styles.openButton}
      onClick={() => handleGame(game)}
    >
      ID: {parseInt(game.id)} / POT: {game.betAmount * 2} / MOVES:{" "}
      {game.moves?.length ? game.moves.length : 0}
    </Button>
  ));

  return (
    <div className={styles.container}>
      {openElement.length > 0 && (
        <div className={styles.openContainer}>
          <div className={styles.open}>{openElement}</div>
        </div>
      )}
      {openElement.length < 1 && (
        <div className={styles.readyContainer}>
          <h3>YOUR TURN: </h3>
          <div className={styles.ready}>{readyElement}</div>
        </div>
      )}
      {openElement.length < 1 && <Divider orientation="vertical" flexItem />}
      {openElement.length < 1 && (
        <div className={styles.waitingContainer}>
          <h3>OPPONENT'S TURN: </h3>
          <div className={styles.waiting}>{waitingElement}</div>
        </div>
      )}
    </div>
  );
};

export default Query;
