import { useSelectedTeam } from "../contexts/TeamContext";
import FixtureCard from "../components/Fixtures/FixtureCard";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Fixtures() {
  const { fixtures } = useSelectedTeam();
  const [selectedRound, setSelectedRound] = useState(1);

  const totalRounds = Math.max(...fixtures.map((x) => x.round));

  function handleRoundChange(e) {
    setSelectedRound(e.target.value);
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl
        variant="filled"
        sx={{
          m: 2,
          minWidth: 120,
          backgroundColor: "white",
          border: "3px solid black",
        }}
      >
        <InputLabel id="round-select-label">Round</InputLabel>
        <Select
          labelId="round-select-label"
          id="round-select"
          value={selectedRound}
          onChange={handleRoundChange}
          label="Round"
        >
          {[...Array(totalRounds).keys()].map((round) => (
            <MenuItem key={round + 1} value={round + 1}>
              {round + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {fixtures
        .filter((fixture) => fixture.round === selectedRound)
        .map((fixture, index) => (
          <FixtureCard key={index} fixture={fixture} />
        ))}
    </Box>
  );
}
