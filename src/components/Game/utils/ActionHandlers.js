/* eslint-disable no-unused-vars */
export function handleGoalAction(
  currentGame,
  selectedTeam,
  setCurrentGame,
  isPlayer
) {
  const isPlayerHomeTeam = selectedTeam.id === currentGame.HomeTeamId;
  if (isPlayer) {
    if (isPlayerHomeTeam) {
      setCurrentGame({
        ...currentGame,
        HomeTeamScore: currentGame.HomeTeamScore + 1,
      });
    } else {
      setCurrentGame({
        ...currentGame,
        AwayTeamScore: currentGame.AwayTeamScore + 1,
      });
    }
  } else {
    if (isPlayerHomeTeam) {
      setCurrentGame({
        ...currentGame,
        AwayTeamScore: currentGame.AwayTeamScore + 1,
      });
    } else {
      setCurrentGame({
        ...currentGame,
        HomeTeamScore: currentGame.HomeTeamScore + 1,
      });
    }
  }
}

export function handleSaveAction(setMessage) {
  setMessage("The goalkeeper saves the ball!");
}

export function handleTackleAction(setMessage) {
  setMessage("Tackle! The ball is for the opposite!");
}

export function handleFulltimeAction(
  setGameEnded,
  currentGame,
  setCurrentGame,
  setFixtures,
  calculateMatchesResult,
  setTeams,
  updateTeamStandings,
  fixtures,
  teams,
  setShowNextMatchButton
) {
  setGameEnded(true);

  const updatedGame = { ...currentGame, isPlayed: true };

  setFixtures((prevFixtures) => {
    const updatedFixtures = prevFixtures.map((f) =>
      f.id === updatedGame.id ? updatedGame : f
    );

    const newFixtures = calculateMatchesResult(
      updatedFixtures,
      updatedGame.round
    );

    setTeams((prevTeams) =>
      updateTeamStandings(newFixtures, teams, updatedGame.round)
    );

    return newFixtures;
  });

  setCurrentGame(updatedGame);
  setShowNextMatchButton(true);
}

export function handleThrowinAction(setMessage) {
  setMessage("The player is ready for throw in!");
}

export function handleShootAction(setMessage) {
  setMessage("Exceptional Shoot!");
}
