import { Box, Button } from "@mui/material";
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

function randomFace() {
  return faceArr[Math.floor(Math.random() * faceArr.length)];
}

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);

  function startGame() {
    setGameStarted(true);
  }

  function resetGame() {
    setGameStarted(false);
    setGameStarted(true);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "20px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={startGame}
        >
          Start
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 0.2fr)",
          gridGap: "10px",
          justifyContent: "center",
          mt: "5px",
          backgroundColor: "gray",
          width: "1000px",
          height: "700px",
          border: "4px solid black",
          borderRadius: "5px",
          padding: "10px",
          margin: "auto",
        }}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <GameCard
            key={index}
            back="backcard"
            face={randomFace()}
            clickable={gameStarted}
          />
        ))}
      </Box>
    </Box>
  );
}
