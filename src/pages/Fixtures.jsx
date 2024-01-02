import { useSelectedTeam } from "../contexts/TeamContext";
import FixtureCard from "../components/Fixtures/FixtureCard";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Fixtures() {
  const { fixtures, checkDataAndRedirect } = useSelectedTeam();
  const [selectedRound, setSelectedRound] = useState(1);
  const totalRounds = Math.max(...fixtures.map((x) => x.round));

  useEffect(() => {
    checkDataAndRedirect();
  }, [checkDataAndRedirect]);

  function handleRoundChange(e) {
    setSelectedRound(e.target.value);
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl variant="filled" sx={{ m: 2, minWidth: 120 }}>
        <InputLabel
          id="round-select-label"
          sx={{
            color: "white",
            fontSize: "20px",
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Round
        </InputLabel>
        <Select
          labelId="round-select-label"
          id="round-select"
          value={selectedRound}
          onChange={handleRoundChange}
          label="Round"
          sx={{
            fontSize: "20px",
            color: "white",
            "&:before": {
              borderBottomColor: "white",
            },
            "&:after": {
              borderBottomColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          {[...Array(totalRounds).keys()].map((round) => (
            <MenuItem
              key={round + 1}
              value={round + 1}
              sx={{ color: "white", backgroundColor: "black" }}
            >
              {round + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3} justifyContent="center">
        {fixtures
          .filter((fixture) => fixture.round === selectedRound)
          .map((fixture, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <FixtureCard fixture={fixture} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
