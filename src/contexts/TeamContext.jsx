/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectedTeamContext = createContext();

export function useSelectedTeam() {
  return useContext(SelectedTeamContext);
}

export function useAllSelectedTeams() {
  const { allTeams } = useSelectedTeam();
  return allTeams;
}

export function SelectedTeamProvider({ children }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  function checkDataAndRedirect() {
    if (!selectedTeam || teams.length === 0 || teams.length < 20) {
      navigate("/");
    }
  }

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        fixtures,
        setFixtures,
        checkDataAndRedirect,
        teams,
        setTeams,
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
}
