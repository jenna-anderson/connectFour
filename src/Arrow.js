import { BsArrowDownSquareFill } from "react-icons/bs";
import styles from './Arrow.module.scss';

const Arrow = ({ sendPlayMove, status, account, game, board, col, row }) => {
  const getClassName = () => {
    if (status !== "finished" && board[0][row] === 0 && account === game.nextPlayer) {
     return styles.enabled;
    } else {
      return styles.disabled;
    }
  }
  
  return (
    <div
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
    </div>
  );
};

export default Arrow;
