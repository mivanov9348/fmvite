import { Box, Button, Typography } from "@mui/material";
import GameCard from "../components/Game/GameCard";
import { useState } from "react";

const faceArr = [
  "save",
  "tackle",
  "throwin",
  "halftime",
  "fulltime",
  "goal",
  "shoot",
];

const players = [
  { name: "Red Devils", goals: 0 },
  { name: "Blue Lagoons", goals: 0 },
];

function randomFace() {
  return faceArr[Math.floor(Math.random() * faceArr.length)];
}

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [cardFaces, setCardFaces] = useState([]);

  function startGame() {
    setGameStarted(true);
    setCurrentPlayer(0);
    initializeCardFaces();
  }

  function initializeCardFaces() {
    const faces = Array.from({ length: 15 }, () => randomFace());
    setCardFaces(faces);
  }

  function handleCardAction(face) {
    console.log(face);

    if (gameEnded) return;
    let changeTurn = false;

    switch (face) {
      case "goal":
        players[currentPlayer].goals += 1;
        changeTurn = true;
        break;
      case "save":
      case "tackle":
        changeTurn = true;
        break;
      case "fulltime":
        setGameEnded(true);
        return;
      case "throwin":
      case "shoot":
        break;
      default:
        changeTurn = true;
    }

    if (changeTurn) {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers content horizontally in the container
        height: gameStarted ? "auto" : "100vh", // Full viewport height before game starts
      }}
    >
      {gameEnded && (
        <Box
          sx={{
            backgroundColor: "#5f5f5f",
            border: "2px solid black",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "10px",
            mt: gameStarted ? "20px" : 0,
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
              mt: "10px",
              fontFamily: "JACKPORT COLLEGE NCV",
              color: "darkgreen",
            }}
          >
            Game Over
          </Typography>
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
            {players[0].name}
          </span>
          {" - "}
          <span
            style={{
              color: currentPlayer === 1 && gameStarted ? "red" : "black",
            }}
          >
            {players[1].name}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "JACKPORT COLLEGE NCV" }}>
          {players[0].goals}:{players[1].goals}
        </Typography>
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
          {cardFaces.map((faceValue, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <GameCard
                back="backcard"
                face={faceValue}
                clickable={gameStarted && !gameEnded}
                onClick={() => handleCardAction(faceValue)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
