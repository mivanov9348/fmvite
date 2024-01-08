/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import GameComment from "./GameComment";
import GameOver from "./GameOver";

export default function GameScoreboard({
  gameStarted,
  currentGame,
  gameEnded,
  message,

  currentPlayer,
}) {
  console.log(currentGame);

  return (
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
        mb: "5px",
      }}
    >
      <Typography variant="h5" sx={{}}>
        <span
          style={{
            color: currentPlayer === 0 && gameStarted ? "red" : "blue",
          }}
        >
          {currentGame ? currentGame.HomeTeam : "Home Team"}
        </span>
        {" - "}
        <span
          style={{
            color: currentPlayer === 1 && gameStarted ? "red" : "blue",
          }}
        >
          {currentGame ? currentGame.AwayTeam : "Away Team"}
        </span>
      </Typography>
      <Typography variant="h6" sx={{}}>
        {currentGame
          ? `${currentGame.HomeTeamScore}:${currentGame.AwayTeamScore}`
          : "0:0"}
      </Typography>
      {gameEnded ? (
        <GameOver gameStarted={gameStarted} />
      ) : (
        <GameComment message={message} />
      )}
    </Box>
  );
}
