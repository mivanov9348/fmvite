import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Standings from "./pages/Standings";
import Fixtures from "./pages/Fixtures";
import MainLayout from "./Layouts/MainLayout";
import StartScreen from "./pages/StartScreen";
import { SelectedTeamProvider } from "./contexts/TeamContext";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <SelectedTeamProvider>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route element={<MainLayout />}>
            <Route path="/game" element={<Game />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/fixtures" element={<Fixtures />} />
          </Route>
        </Routes>
      </SelectedTeamProvider>
    </BrowserRouter>
  );
}
