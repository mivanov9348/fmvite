/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

export default function GameComment({ message }) {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: "black",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "red" }}>
        {message}
      </Typography>
    </Box>
  );
}
