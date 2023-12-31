import { useSelectedTeam } from "../contexts/TeamContext"; // Adjust the path as needed
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  typography: {
    fontFamily: ["JACKPORT Regular NCV", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
          color: "#ffffff",
          fontSize: "25px",
        },
      },
    },
  },
});

export default function Standings() {
  const { allTeams, selectedTeam } = useSelectedTeam();

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: 3,
          margin: 1,
          border: "5px solid black",
          backgroundColor: "#113951",
          maxWidth: "110%",
          mx: "auto",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
          Standings
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "#002941",
              border: "5px solid black",
            }}
            aria-label="standings table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "1%" }}>N</TableCell>
                <TableCell sx={{ width: "16%" }}>Team</TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  M
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "8.64%",
                  }}
                >
                  W
                </TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  D
                </TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  L
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "8.64%",
                  }}
                >
                  GS
                </TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  GC
                </TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  GD
                </TableCell>
                <TableCell align="right" sx={{ width: "8.64%" }}>
                  P
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTeams.map((team, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    color: selectedTeam == team ? "red" : "none",
                    textAlign: "center",
                  }}
                >
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      sx={{
                        mr: 1,
                        color: selectedTeam == team ? "red" : "none",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        fontSize: "17px",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        src={`./public/images/logos/${team.image}.png`}
                        sx={{ width: 30, height: 30, marginRight: 1 }}
                      />
                      {team.name}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.matches}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.wins}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.draws}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.losses}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.goalsScored}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.goalsConceded}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.goalDifference}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: selectedTeam == team ? "red" : "none",
                    }}
                  >
                    {team.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
}
