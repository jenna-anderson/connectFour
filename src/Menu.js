import { useState } from "react";
import Query from "./Query";
import NewGame from "./NewGame";
import { Tab, useMediaQuery } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import styles from "./Menu.module.scss";

const Menu = (props) => {
  const { account, handleGame } = props;
  const [value, setValue] = useState("started");
  let isMobile = useMediaQuery("(max-width:600px");

  const ACCOUNT_PLAYER_1 = `
    query Game($p: Bytes) {
        games(
            where: { player1: $p, status_not: "finished" }
            first: 100
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
  const ACCOUNT_PLAYER_2 = `
    query Game($p: Bytes) {
        games(
            where: { player2: $p, status_not: "finished" }
            first: 100
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
  const INITIALIZED_GAMES_BY_OTHERS = `
    query Game($p: Bytes) {
        games(
            where: { player1_not: $p, status: "initialized" }
            first: 100
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

  return (
    <div className={styles.container}>
      <TabContext value={value}>
        <TabList
          orientation={isMobile ? "vertical" : "horizontal"}
          centered
          className={styles.tabs}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab label="Started By Me" value="started" />
          <Tab label="Accepted By Me" value="accepted" />
          <Tab label="Open Challenges" value="challenge" />
          <Tab label="New Game" value="initialize" />
        </TabList>
        {value && (
          <div>
            <TabPanel value="started">
              <Query
                gql={ACCOUNT_PLAYER_1}
                account={account}
                handleGame={handleGame}
              />
            </TabPanel>
            <TabPanel value="accepted">
              <Query
                gql={ACCOUNT_PLAYER_2}
                account={account}
                handleGame={handleGame}
              />
            </TabPanel>
            <TabPanel value="challenge">
              <Query
                gql={INITIALIZED_GAMES_BY_OTHERS}
                account={account}
                handleGame={handleGame}
              />
            </TabPanel>
            <TabPanel value="initialize">
              <NewGame account={account} handleGame={handleGame} />
            </TabPanel>
          </div>
        )}
      </TabContext>
    </div>
  );
};

export default Menu;
