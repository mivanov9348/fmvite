/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const navigate = useNavigate();

  function checkDataAndRedirect() {
    if (!currentGame) {
      navigate("/");
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        setCurrentGame,
        gameHistory,
        setGameHistory,
        checkDataAndRedirect,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
