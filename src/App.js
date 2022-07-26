import React, { useEffect, useState } from "react";
import { createClient, Provider } from "urql";

import Header from "./Header.js";
import Menu from "./Menu.js";
import Game from "./Game.js";
import sound from "./www.fesliyanstudios.com.mp3";

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/jenna-anderson/connect-four-game-subgraph",
});

function App() {
  const [account, setAccount] = useState(null);
  const [game, setGame] = useState(null);

  const playDrop = () => {
    let audio = new Audio(sound);
    audio.play();
  };

  const renderBody = () => {
    if (account && !game) {
      return <Menu account={account} handleGame={setGame} />;
    } else if (game) {
      return <Game account={account} game={game} handleGame={setGame} />;
    }
  };

  useEffect(() => {
    if (game) {
      playDrop();
    }
  }, [game]);

  useEffect(() => {
    setGame(null);
  }, [account]);

  return (
    <Provider value={client}>
      <div className="App">
        <Header handleAccount={setAccount} />
        {renderBody()}
      </div>
    </Provider>
  );
}

export default App;
