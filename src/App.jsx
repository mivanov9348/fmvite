import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Standings from "./pages/Standings";
import Fixtures from "./pages/Fixtures";
import MainLayout from "./Layouts/MainLayout";
import StartScreen from "./pages/StartScreen";
import { SelectedTeamProvider } from "./contexts/TeamContext";
import "./App.css";
import TeamStats from "./pages/TeamStats";
import Rules from "./pages/Rules";
import { GameProvider } from "./contexts/GameContext";

export default function App() {
  return (
    <BrowserRouter>
      <SelectedTeamProvider>
        <GameProvider>
          <Routes>
            {" "}
            <Route path="/" element={<StartScreen />} />
            <Route element={<MainLayout />}>
              <Route path="/game" element={<Game />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/teamstats" element={<TeamStats />} />
              <Route path="/rules" element={<Rules />} />
            </Route>
          </Routes>
        </GameProvider>
      </SelectedTeamProvider>
    </BrowserRouter>
  );
}
