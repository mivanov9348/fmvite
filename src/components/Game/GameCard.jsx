import { Box, CardMedia } from "@mui/material";
import { useState } from "react";

export default function GameCard({ back, face, clickable }) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    if (clickable && !flipped) {
      setFlipped(!flipped);
    }
  }

  return (
    <Box
      sx={{
        height: "220px",
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
        height="100%"
        image={`../public/images/${flipped ? face : back}.png`}
        alt={flipped ? "Game Card Face" : "Game Card Back"}
      />
    </Box>
  );
}
