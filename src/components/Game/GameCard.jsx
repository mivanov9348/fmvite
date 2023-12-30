import { Box, CardMedia, Typography } from "@mui/material";
import { useState } from "react";

export default function GameCard({ back, face, clickable, onClick }) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    if (clickable && !flipped) {
      setFlipped(!flipped);
      onClick();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "240px",
        width: "180px",
        backgroundColor: "darkgreen",
        border: "3px solid black",
        borderRadius: "5px",
        "&:hover": {
          boxShadow: clickable && !flipped ? "2px 2px 2px 2px black" : "none",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200px"
        image={`../public/images/${flipped ? face : back}.png`}
        alt={flipped ? "Game Card Face" : "Game Card Back"}
      />
      <Typography
        variant="h6"
        sx={{ color: "#f0f0f0", mt: 1, fontFamily: "JACKPORT COLLEGE NCV" }}
      >
        {flipped ? face : ""}
      </Typography>
    </Box>
  );
}
