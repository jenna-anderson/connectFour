import Metamask from "./Metamask";
import styles from "./Header.module.scss";
import { BsFillCircleFill } from "react-icons/bs";

const Header = (props) => {
  const { handleAccount } = props;
  return (
    <header className={styles.container}>
      <h1>Connect Four</h1>
      <div className={styles.discs}>
        <BsFillCircleFill color="#d32f2f" />
        <BsFillCircleFill color="#fbc02d" />
        <BsFillCircleFill color="#d32f2f" />
        <BsFillCircleFill color="#fbc02d" />
      </div>
      <div>
        <Metamask handleAccount={handleAccount} />
      </div>
    </header>
  );
};

export default Header;
