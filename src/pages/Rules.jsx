import { Box, Typography, Divider } from "@mui/material";

export default function Rules() {
  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 800,
        margin: "auto",
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Rule 1
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>Description of rule 1.</Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Rule 2
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>Description of rule 2.</Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Add more rules as needed */}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Rule 3
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>Description of rule 3.</Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Continue adding rules and dividers */}
    </Box>
  );
}
