import { Box, Typography, Button } from "@mui/material";
import TeamCard from "../components/Team/TeamCard";
import { useEffect, useState } from "react";
import { useSelectedTeam } from "../contexts/TeamContext";
import { useNavigate } from "react-router-dom";
import { generateFixtures } from "../components/Fixtures/GenerateFixtures";

export default function StartScreen() {
  const [teams, setTeams] = useState([]);
  const [selectTeam, setSelectTeam] = useState(null);
  const { setSelectedTeam, setAllTeams, setFixtures } = useSelectedTeam();

  const navigate = useNavigate();

  function startGame() {
    if (selectTeam !== null && teams[selectTeam]) {
      const generatedFixtures = generateFixtures(teams);
      setFixtures(generatedFixtures);
      navigate("/standings");
    } else {
      console.log("Please select a team!");
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  function fetchTeams() {
    fetch("./public/data/teamNames.json")
      .then((res) => res.json())
      .then((data) => {
        const generatedTeams = generateTeams(data.verbs, data.creatures, 20);
        setAllTeams(generatedTeams);
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
      generatedTeams.push({
        name: teamName,
        image: subject,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsScored: 0,
        goalsConceded: 0,
        goalDifference: 0,
        points: 0,
      });
    }
    return generatedTeams;
  }

  function handleChangeTeams() {
    fetchTeams();
  }

  function handleSelectTeam(teamIndex) {
    setSelectTeam(teamIndex);
    setSelectedTeam(teams[teamIndex]);
  }

  return (
    <Box sx={{ textAlign: "center", m: "auto", p: 1, color: "white" }}>
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
          <Box
            key={index}
            sx={{
              boxShadow:
                selectTeam === index ? "0px 0px 10px 5px white" : "none",
              "&:hover": { boxShadow: "0px 0px 10px 5px white" },
            }}
            onClick={() => handleSelectTeam(index)}
          >
            <TeamCard
              key={index}
              teamName={team.name}
              imageUrl={`${team.image}`}
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#222",
          mt: 2,
          fontWeight: "bolder",
          "&:hover": { backgroundColor: "black" },
        }}
        onClick={startGame}
      >
        Start Game
      </Button>
    </Box>
  );
}
