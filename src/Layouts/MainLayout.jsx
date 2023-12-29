import { Box } from "@mui/material";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box sx={{ width: "100%" }}>
      <Header />
      <Box component="main" sx={{ pt: "64px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
