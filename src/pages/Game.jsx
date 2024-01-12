/* eslint-disable no-case-declarations */
import { Box, Button } from "@mui/material";
import GameCard from "../components/Game/GameCard";
import { useState, useEffect } from "react";
import { useSelectedTeam } from "../contexts/TeamContext";
import { useGame } from "../contexts/GameContext";
import {
  initiliazeCardFace,
  findNextFixture,
} from "../components/Game/utils/InitiliazeGame";
import {
  calculateMatchesResult,
  updateTeamStandings,
} from "../components/Game/utils/EndGameUtills";
import GameScoreboard from "../components/Game/GameScoreboard";
import {
  handleFulltimeAction,
  handleGoalAction,
  handleSaveAction,
  handleShootAction,
  handleTackleAction,
  handleThrowinAction,
} from "../components/Game/utils/actionHandlers";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [cardFaces, setCardFaces] = useState([]);
  const { selectedTeam, fixtures, setFixtures, teams, setTeams } =
    useSelectedTeam();
  const { currentGame, setCurrentGame } = useGame();
  const [showNextMatchButton, setShowNextMatchButton] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPlayerTurn) {
      setTimeout(initiatePCTurn, 500);
    }
  }, [isPlayerTurn]);

  function newGame(nextFixture) {
    setCurrentGame(nextFixture);
    setGameStarted(true);
    setGameEnded(false);
    setShowNextMatchButton(false);
    setCurrentPlayer(0);
    const faces = initiliazeCardFace();
    setCardFaces(faces);
    setIsPlayerTurn(true);
  }

  function startGame() {
    const nextFixture = findNextFixture(fixtures, selectedTeam);
    if (nextFixture) {
      newGame(nextFixture);
    } else {
      console.log("No fixtures to start");
    }
  }

  function loadNextMatch() {
    const nextFixture = findNextFixture(fixtures, selectedTeam);
    if (nextFixture) {
      newGame(nextFixture);
    } else {
      console.log("No more fixtures available");
      navigate("/standings");
    }
  }

  function handleCardAction(face, isPlayer = true, index) {
    if (
      gameEnded ||
      (isPlayer && !isPlayerTurn) ||
      (!isPlayer && isPlayerTurn)
    ) {
      console.log("Action not allowed under current conditions");

      return;
    }

    let changeTurn = true;

    setCardFaces((prevFaces) => {
      const newFaces = prevFaces.map((card, idx) => {
        if (idx === index) {
          return { ...card, opened: true };
        }
        return card;
      });
      console.log("Card faces updated:", newFaces);
      return newFaces;
    });

    switch (face) {
      case "goal":
        handleGoalAction(currentGame, selectedTeam, setCurrentGame, isPlayer);
        changeTurn = true;
        break;

      case "save":
        handleSaveAction(setMessage);
        changeTurn = true;
        break;
      case "tackle":
        handleTackleAction(setMessage);
        changeTurn = true;
        break;
      case "fulltime":
        handleFulltimeAction(
          setGameEnded,
          currentGame,
          setCurrentGame,
          setFixtures,
          calculateMatchesResult,
          setTeams,
          updateTeamStandings,
          fixtures,
          teams,
          setShowNextMatchButton
        );
        return;

      case "throwin":
        handleThrowinAction(setMessage);
        changeTurn = false;
        if (!isPlayer) {
          initiatePCTurn();
        }
        break;
      case "shoot":
        handleShootAction(setMessage);
        changeTurn = false;
        if (!isPlayer) {
          initiatePCTurn();
        }
        break;
      default:
        console.log("Unrecognized card action:", face);
    }

    if (changeTurn) {
      setIsPlayerTurn((currentTurn) => !currentTurn);
    }
  }

  function initiatePCTurn() {
    setTimeout(() => {
      const unopenedCards = cardFaces.filter((card) => !card.opened);
      if (unopenedCards.length === 0) {
        console.log("No more cards to open");
        return;
      }
      const pcCardIndex = Math.floor(Math.random() * unopenedCards.length);
      const pcAction = unopenedCards[pcCardIndex];
      const originalIndex = cardFaces.findIndex(
        (card) => card.face === pcAction.face
      );

      handleCardAction(pcAction.face, false, originalIndex);
    }, 100);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: gameStarted ? "auto" : "100vh",
      }}
    >
      {gameEnded && showNextMatchButton && (
        <Box
          sx={{
            backgroundColor: "white",
            mt: 2,
            borderRadius: "10px",
            "&:hover": { backgroundColor: "grey" },
          }}
        >
          <Button
            onClick={loadNextMatch}
            sx={{ "&:hover": { color: "white" } }}
          >
            Next Match
          </Button>
        </Box>
      )}

      <GameScoreboard
        currentGame={currentGame}
        gameStarted={gameStarted}
        gameEnded={gameEnded}
        message={message}
        currentPlayer={currentPlayer}
        selectedTeam={selectedTeam}
      />

      {!gameStarted && (
        <Button
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            mt: "20px",
          }}
          onClick={startGame}
        >
          Start
        </Button>
      )}
      {gameStarted && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 0.2fr)",
            gridGap: "10px",
            justifyContent: "center",
            mt: "200px",
            backgroundColor: "gray",
            width: "1000px",
            height: "800px",
            border: `4px solid ${isPlayerTurn ? "red" : "blue"}`,
            borderRadius: "5px",
            padding: "10px",
            margin: "auto",
          }}
        >
          {cardFaces.map((card, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <GameCard
                key={`${card.face}-${card.opened}`} // Changing key will force re-render
                back="backcard"
                face={card.face}
                flipped={card.opened}
                clickable={gameStarted && !gameEnded && isPlayerTurn}
                onClick={() => handleCardAction(card.face, true, index)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
