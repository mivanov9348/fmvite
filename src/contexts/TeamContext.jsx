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
  const [allTeams, setAllTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const navigate = useNavigate();

  function checkDataAndRedirect() {
    if (!selectedTeam || allTeams.length === 0 || allTeams.length < 20) {
      navigate("/");
    }
  }

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        allTeams,
        setAllTeams,
        fixtures,
        setFixtures,
        checkDataAndRedirect,
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
}
