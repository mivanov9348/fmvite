/* eslint-disable react/prop-types */
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TeamStatsModal({ open, handleClose, team }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 5,
          borderRadius: 2,
          border: "5px solid #3f3f3f",
          backgroundColor: "#222",
          color: "white",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2, color: "red" }}>
            {team?.name}
          </Typography>
          {team?.image && (
            <img
              src={`./public/images/logos/${team.image}.png`}
              alt={team.name}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: "0px 0px 10px 3px black",
              }}
            />
          )}
          <Typography variant="body1" sx={{ mt: 2 }}>
            Wins: {team?.wins}
          </Typography>
          <Typography variant="body1">Draws: {team?.draws}</Typography>
          <Typography variant="body1">Losses: {team?.losses}</Typography>
        </Box>
      </Box>
    </Modal>
  );
}
