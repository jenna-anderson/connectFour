import { BsFillCircleFill } from "react-icons/bs";
import Arrow from "./Arrow";
import styles from "./Board.module.scss";

const Board = ({ board, sendPlayMove, status, account, game }) => {
  const row6 = [];
  const row5 = [];
  const row4 = [];
  const row3 = [];
  const row2 = [];
  const row1 = [];

  const buildRow = (min, max, row) => {
    for (let i = min; i < max; i++) {
      row.push(board[0][i]);
    }
  };

  buildRow(35, 42, row6);
  buildRow(28, 35, row5);
  buildRow(21, 28, row4);
  buildRow(14, 21, row3);
  buildRow(7, 14, row2);
  buildRow(0, 7, row1);

  const getClassName = (disc) => {
    switch (disc) {
      case 1:
        return styles.player1;
      case 2:
        return styles.player2;
      default:
        return styles.empty;
    }
  };

  return (
    <div className={styles.container}>
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={0}
        row={35}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={1}
        row={36}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={2}
        row={37}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={3}
        row={38}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={4}
        row={39}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={5}
        row={40}
      />
      <Arrow
        sendPlayMove={sendPlayMove}
        status={status}
        account={account}
        board={board}
        game={game}
        col={6}
        row={41}
      />

      {row6.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
      {row5.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
      {row4.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
      {row3.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
      {row2.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
      {row1.map((disc) => {
        return (
          <div>
            <BsFillCircleFill className={getClassName(disc)} />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
