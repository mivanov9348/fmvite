/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectedTeamContext = createContext();

export function SelectedTeamProvider({ children }) {
  const [selectedTeam, setSelectedTeam] = useState(
    () => JSON.parse(localStorage.getItem("selectedTeam")) || null
  );
  const [fixtures, setFixtures] = useState(
    () => JSON.parse(localStorage.getItem("fixtures")) || []
  );
  const [teams, setTeams] = useState(
    () => JSON.parse(localStorage.getItem("teams")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    localStorage.setItem("fixtures", JSON.stringify(fixtures));
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [selectedTeam, fixtures, teams]);

  function checkDataAndRedirect() {
    if (!selectedTeam || teams.length === 0 || fixtures.length === 0) {
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
        teams,
        setTeams,
        checkDataAndRedirect,
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
}

export const useSelectedTeam = () => useContext(SelectedTeamContext);
