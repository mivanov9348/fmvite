/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

export default function TeamCard({ teamName, imageUrl }) {
  return (
    <Box
      sx={{
        width: "180px",
        height: "210px",
        backgroundColor: "#222",
        border: "4px solid black",
        fontFamily: "JACKPORT COLLEGE NCV",
        color: "white",
        m: 1,
        p: 1,
        textAlign: "center",
      }}
    >
      <img
        src={`./public/images/logos/${imageUrl}`}
        alt={teamName}
        style={{
          width: "95%",
          height: "170px",
          objectFit: "cover",
          border: "4px solid black",
        }}
      />
      <Typography variant="subtitle1">{teamName}</Typography>
    </Box>
  );
}
