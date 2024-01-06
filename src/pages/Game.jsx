/* eslint-disable no-case-declarations */
import { Box, Button } from "@mui/material";
import GameCard from "../components/Game/GameCard";
import { useState, useEffect } from "react";
import { useSelectedTeam } from "../contexts/TeamContext";
import { useGame } from "../contexts/GameContext";
import {
  initiliazeCardFace,
  findNextFixture,
} from "../components/Game/utils/setGameUtills";
import {
  calculateMatchesResult,
  updateTeamStandings,
} from "../components/Game/utils/endGameUtills";
import GameScoreboard from "../components/Game/GameScoreboard";

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

  useEffect(() => {
    if (!isPlayerTurn) {
      setTimeout(initiatePCTurn, 2000);
    }
  }, [isPlayerTurn]);

  function startGame() {
    const nextFixture = findNextFixture(fixtures, selectedTeam);
    setCurrentGame(nextFixture);
    setGameStarted(true);
    setCurrentPlayer(0);
    const faces = initiliazeCardFace();
    setCardFaces(faces);
    setShowNextMatchButton(false);
  }

  function handleCardAction(face, isPlayer = true, index) {
    console.log("Action:", face, "Is Player:", isPlayer);

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
      const newFaces = [...prevFaces];
      newFaces[index].opened = true;
      return newFaces;
    });

    switch (face) {
      case "goal":
        setCurrentGame((currentGame) => {
          // Determine if the selected team is playing at home or away
          const isPlayerHomeTeam = selectedTeam.id === currentGame.HomeTeamId;

          if (isPlayer) {
            // Player's turn
            if (isPlayerHomeTeam) {
              // Player's team is the home team
              return {
                ...currentGame,
                HomeTeamScore: currentGame.HomeTeamScore + 1,
              };
            } else {
              // Player's team is the away team
              return {
                ...currentGame,
                AwayTeamScore: currentGame.AwayTeamScore + 1,
              };
            }
          } else {
            // PC's turn
            if (isPlayerHomeTeam) {
              // PC's team is the away team
              return {
                ...currentGame,
                AwayTeamScore: currentGame.AwayTeamScore + 1,
              };
            } else {
              // PC's team is the home team
              return {
                ...currentGame,
                HomeTeamScore: currentGame.HomeTeamScore + 1,
              };
            }
          }
        });
        changeTurn = true;
        break;

      case "save":
        setMessage("The goalkeeper saves the ball!");
        changeTurn = true;
        break;
      case "tackle":
        setMessage("Tackle! The ball is for the opposite!");
        changeTurn = true;
        break;
      case "fulltime":
        setGameEnded(true);

        setCurrentGame((currentGame) => {
          const updatedGame = { ...currentGame, isPlayed: true };

          setFixtures((fixtures) => {
            const updatedFixtures = fixtures.map((f) =>
              f.id === updatedGame.id ? updatedGame : f
            );

            const newFixtures = calculateMatchesResult(
              updatedFixtures,
              updatedGame.round
            );
            setTeams(() => {
              return updateTeamStandings(newFixtures, teams, updatedGame.round);
            });

            return newFixtures;
          });

          return updatedGame;
        });

        setShowNextMatchButton(true);
        return;

      case "throwin":
        setMessage("The player is ready for throw in!");
        changeTurn = false;
        if (!isPlayer) {
          initiatePCTurn();
        }
        break;
      case "shoot":
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
    }, 1000);
  }

  function loadNextMatch() {
    const nextFixture = findNextFixture(fixtures, selectedTeam);

    if (nextFixture) {
      setCurrentGame(nextFixture);
      setGameStarted(true);
      setGameEnded(false);
      setShowNextMatchButton(false);
      setCurrentPlayer(0);
      const faces = initiliazeCardFace();
      setCardFaces(faces);
      setIsPlayerTurn(true);
    } else {
      console.log("No more fixtures available");
    }
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
