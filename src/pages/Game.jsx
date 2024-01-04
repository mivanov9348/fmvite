/* eslint-disable no-case-declarations */
import { Box, Button, Typography } from "@mui/material";
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

  useEffect(() => {
    if (!isPlayerTurn) {
      setTimeout(initiatePCTurn, 2000); // Delay for a realistic feel
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
      console.log("Updated cardFaces:", newFaces); // Debugging log

      return newFaces;
    });

    switch (face) {
      case "goal":
        if (currentPlayer === 0) {
          setCurrentGame((currentGame) => ({
            ...currentGame,
            HomeTeamScore:
              currentPlayer === 0
                ? currentGame.HomeTeamScore + 1
                : currentGame.HomeTeamScore,
            AwayTeamScore:
              currentPlayer === 1
                ? currentGame.AwayTeamScore + 1
                : currentGame.AwayTeamScore,
          }));
        }
        changeTurn = true;
        break;
      case "save":
      case "tackle":
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
    // Delay the PC's turn for a realistic feel
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
    }, 2000);
  }

  function loadNextMatch() {
    const nextFixture = findNextFixture(fixtures, selectedTeam);

    if (nextFixture) {
      setCurrentGame(nextFixture);
    } else {
      console.log("No more fixtures available");
    }

    setGameStarted(false);
    setGameEnded(false);
    setShowNextMatchButton(false);
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

      <Box
        sx={{
          backgroundColor: "#5f5f5f",
          color: "#ffffff",
          border: "2px solid black",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
          textAlign: "center",
          fontFamily: "JACKPORT COLLEGE NCV",
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "JACKPORT COLLEGE NCV" }}>
          <span
            style={{
              color: currentPlayer === 0 && gameStarted ? "red" : "black",
            }}
          >
            {currentGame?.HomeTeam}
          </span>
          {" - "}
          <span
            style={{
              color: currentPlayer === 1 && gameStarted ? "red" : "black",
            }}
          >
            {currentGame?.AwayTeam}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "JACKPORT COLLEGE NCV" }}>
          {gameStarted
            ? `${currentGame?.HomeTeamScore}:${currentGame?.AwayTeamScore}`
            : ""}
        </Typography>
        {gameEnded && (
          <Box
            sx={{
              backgroundColor: "white",
              border: "2px solid black",
              padding: "1px",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "2px",
              mt: gameStarted ? "2px" : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "JACKPORT COLLEGE NCV",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mt: "1px",
                fontFamily: "JACKPORT COLLEGE NCV",
                color: "red",
              }}
            >
              Game Over
            </Typography>
          </Box>
        )}
      </Box>

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
            mt: "150px",
            backgroundColor: "gray",
            width: "1000px",
            height: "800px",
            border: "4px solid black",
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
