import { Box, Typography, Button } from "@mui/material";
import TeamCard from "../components/Team/TeamCard";
import { useEffect, useState } from "react";

export default function StartScreen() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  function fetchTeams() {
    fetch("./public/data/teamNames.json")
      .then((res) => res.json())
      .then((data) => {
        const generatedTeams = generateTeams(data.verbs, data.creatures, 20);

        setTeams(generatedTeams);
      })
      .catch((err) => console.error("Failed to load!", err));
  }

  function generateTeams(verbs, subjects, count) {
    let generatedTeams = [];
    let usedSubjects = [];

    for (let i = 0; i < count; i++) {
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      let subject;

      do {
        subject = subjects[Math.floor(Math.random() * subjects.length)];
      } while (usedSubjects.includes(subject));

      usedSubjects.push(subject);
      const teamName = `${verb} ${subject}`;
      generatedTeams.push({ name: teamName, image: subject });
    }
    return generatedTeams;
  }

  function handleChangeTeams() {
    fetchTeams();
  }

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  return (
    <Box sx={{ textAlign: "center", m: "auto", p: 1 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Welcome to Fantasy Football Card Game
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Choose a Team
      </Typography>
      <Button variant="contained" onClick={handleChangeTeams} sx={{ mb: 2 }}>
        Change Teams
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "grey",
          border: "5px solid black",
          height: "auto",
          width: "1200px",
          alignItems: "center",
          justifyContent: "center",
          ml: "150px",
          m: "auto",
          p: 2,
          gap: 2,
        }}
      >
        {teams.map((team, index) => (
          <Box key={index}>
            {console.log(team.name)}
            <TeamCard
              key={index}
              teamName={team.name}
              imageUrl={`${team.image}.png`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
