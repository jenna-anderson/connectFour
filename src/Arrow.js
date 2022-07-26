import { BsArrowDownSquareFill } from "react-icons/bs";
import styles from './Arrow.module.scss';

const Arrow = ({ sendPlayMove, status, account, game, board, col, row }) => {
  const getClassName = () => {
    if (status !== "finished" && board[0][row] === 0 && account === game.nextPlayer && account === game.player1) {
     return styles.player1Enabled;
    } else if (status !== "finished" && board[0][row] === 0 && account === game.nextPlayer && account === game.player2) {
     return styles.player2Enabled;
    } else {
      return styles.disabled;
    }
}
  
  return (
    <button
      onClick={() => {
        sendPlayMove(col);
      }}
      disabled={
        status === "finished" ||
        account !== game.nextPlayer ||
        board[0][row] !== 0
      }
      className={getClassName()}
    >
      <BsArrowDownSquareFill />
    </button>
  );
};

export default Arrow;
