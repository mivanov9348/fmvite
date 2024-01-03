import { useSelectedTeam } from "../contexts/TeamContext";
import TeamCard from "../components/Team/TeamCard";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TeamStatsModal from "../components/Team/TeamStatsModal";

export default function TeamStats() {
  const { teams, checkDataAndRedirect } = useSelectedTeam();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  function handleCardClick(team) {
    setSelectedTeam(team);
    setModalOpen(true);
  }

  useEffect(() => {
    checkDataAndRedirect();
  }, [checkDataAndRedirect]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        p: 2,
      }}
    >
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          teamName={team.name}
          imageUrl={team.image}
          onClick={() => handleCardClick(team)}
        />
      ))}
      <TeamStatsModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        team={selectedTeam}
      />
    </Box>
  );
}
