export function generateFixtures(teams) {
  if (
    !teams ||
    !Array.isArray(teams) ||
    teams.some((team) => !team || !team.name)
  ) {
    console.error("Invalid teams data");
    return [];
  }

  const teamsCount = teams.length;
  let roundsNum = teamsCount % 2 === 0 ? teamsCount - 1 : teamsCount;
  let fixtures = [];
  let fixtureId = 1;

  // Make a copy of teams to preserve the original order
  let teamsCopy = [...teams];

  // If the number of teams is odd, add a dummy team to make it even
  if (teamsCount % 2 !== 0) {
    teamsCopy.push({ name: "Dummy" });
    roundsNum = teamsCopy.length - 1;
  }

  // Generate fixtures for each round
  for (let round = 0; round < roundsNum; round++) {
    for (let i = 0; i < teamsCopy.length / 2; i++) {
      const homeTeam = teamsCopy[i];
      const awayTeam = teamsCopy[teamsCopy.length - 1 - i];

      // Skip the match if it involves the dummy team
      if (homeTeam.name !== "Dummy" && awayTeam.name !== "Dummy") {
        fixtures.push({
          id: fixtureId++,
          round: round + 1,
          HomeTeam: homeTeam.name,
          AwayTeam: awayTeam.name,
          HomeTeamScore: 0,
          AwayTeamScore: 0,
          isPlayed: false,
        });
      }
    }

    // Rotate teams, except the first one
    teamsCopy.splice(1, 0, teamsCopy.pop());
  }

  return fixtures;
}
