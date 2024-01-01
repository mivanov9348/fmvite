/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

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

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        allTeams,
        setAllTeams,
        fixtures,
        setFixtures,
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
}
