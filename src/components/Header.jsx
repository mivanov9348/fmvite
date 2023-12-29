import { NavLink } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  marginRight: theme.spacing(2), // Add some spacing to the right
}));

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ width: "100%" }}>
      <Toolbar>
        <StyledNavLink to="/game">Game</StyledNavLink>{" "}
      </Toolbar>
    </AppBar>
  );
}
