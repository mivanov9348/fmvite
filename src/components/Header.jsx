import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  marginRight: theme.spacing(2),
  "&.active": {
    color: "red",
  },
}));

export default function Header() {
  const navigate = useNavigate();

  function handleReset() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "black",
        boxShadow: "0px 0px 10px 5px white",
        alignItems: "center",
        fontSize: "20px",
      }}
    >
      <Toolbar>
        <StyledNavLink to="/game">Next Game</StyledNavLink>
        <StyledNavLink to="/standings">Standings</StyledNavLink>
        <StyledNavLink to="/fixtures">Fixtures</StyledNavLink>
        <StyledNavLink to="/teamstats">Team Stats</StyledNavLink>
        <StyledNavLink to="/rules">Rules</StyledNavLink>

        <Button
          color="inherit"
          onClick={handleReset}
          sx={{ backgroundColor: "red" }}
        >
          Reset Game
        </Button>
      </Toolbar>
    </AppBar>
  );
}
