/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import { useSelectedTeam } from "../../contexts/TeamContext";

export default function FixtureCard({ fixture }) {
  const { selectedTeam } = useSelectedTeam();

  function getImage(team) {
    return team.split(" ")[1];
  }

  return (
    <Card
      sx={{
        minWidth: 100,
        height: 230,
        margin: 2,
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        boxShadow: "0px 0px 10px 5px black",
        backgroundColor: "#a1a1a1",
      }}
    >
      <CardContent>
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item>
            <Tooltip title={fixture.HomeTeam}>
              <Avatar
                alt={fixture.HomeTeam}
                src={`public/images/logos/${getImage(fixture.HomeTeam)}.png`}
                sx={{
                  width: 110,
                  height: 110,
                  mb: 1,
                  textAlign: "center",
                  boxShadow:
                    selectedTeam.name === fixture.HomeTeam
                      ? "0px 0px 10px 5px red"
                      : "0px 0px 10px 5px black",
                  objectFit: "cover",
                }}
              />
            </Tooltip>
          </Grid>

          {/* Away Team */}
          <Grid item>
            <Tooltip title={fixture.AwayTeam}>
              <Avatar
                alt={fixture.AwayTeam}
                src={`public/images/logos/${getImage(fixture.AwayTeam)}.png`}
                sx={{
                  width: 110,
                  height: 110,
                  mb: 1,
                  ml: 2,
                  textAlign: "center",
                  boxShadow:
                    selectedTeam.name === fixture.AwayTeam
                      ? "0px 0px 10px 5px red"
                      : "0px 0px 10px 5px black",
                  objectFit: "cover",
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 2,
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            py: 1,
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Cursed Timer Ulil",
              fontSize: "32px",
              color: "red",
            }}
          >
            {fixture.HomeTeamScore} - {fixture.AwayTeamScore}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
