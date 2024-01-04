export function calculateMatchesResult(fixtures, currentRound) {
  console.log(fixtures);

  return fixtures.map((fixture) => {
    if (fixture.round === currentRound && !fixture.isPlayed) {
      return {
        ...fixture,
        HomeTeamScore: Math.floor(Math.random() * 4),
        AwayTeamScore: Math.floor(Math.random() * 4),
        isPlayed: true,
      };
    }
    console.log(fixture);

    return fixture;
  });
}

export function updateTeamStandings(fixtures, teams, currentRound) {
  console.log(teams);

  // Create a deep copy of teams to avoid mutating the original data
  let updatedTeams = teams.map((team) => ({
    ...team,
    matches: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    points: 0,
  }));

  // Only process fixtures up to the current round
  const currentRoundFixtures = fixtures.filter(
    (fixture) => fixture.round <= currentRound && fixture.isPlayed
  );

  currentRoundFixtures.forEach((fixture) => {
    const homeTeam = updatedTeams.find(
      (team) => team.name === fixture.HomeTeam
    );
    const awayTeam = updatedTeams.find(
      (team) => team.name === fixture.AwayTeam
    );

    // Update match count
    homeTeam.matches += 1;
    awayTeam.matches += 1;

    // Update goals
    homeTeam.goalsScored += fixture.HomeTeamScore;
    awayTeam.goalsScored += fixture.AwayTeamScore;
    homeTeam.goalsConceded += fixture.AwayTeamScore;
    awayTeam.goalsConceded += fixture.HomeTeamScore;

    // Calculate points and wins/draws/losses
    if (fixture.HomeTeamScore > fixture.AwayTeamScore) {
      homeTeam.wins += 1;
      awayTeam.losses += 1;
      homeTeam.points += 3;
    } else if (fixture.HomeTeamScore < fixture.AwayTeamScore) {
      awayTeam.wins += 1;
      homeTeam.losses += 1;
      awayTeam.points += 3;
    } else {
      homeTeam.draws += 1;
      awayTeam.draws += 1;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }

    // Update goal difference
    homeTeam.goalDifference = homeTeam.goalsScored - homeTeam.goalsConceded;
    awayTeam.goalDifference = awayTeam.goalsScored - awayTeam.goalsConceded;
  });
  console.log(updatedTeams);

  return updatedTeams;
}
