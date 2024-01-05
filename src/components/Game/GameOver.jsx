/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

export default function GameOver({ gameStarted }) {
  return (
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
  );
}
