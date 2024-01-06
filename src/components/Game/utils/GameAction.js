export function handleCardActionLogic(
  face,
  isPlayer,
  currentPlayer,
  currentGame,
  selectedTeam
) {
  let changeTurn = true;
  let updatedGame = { ...currentGame };
  let message = "";

  switch (face) {
    case "goal":
      const playerTeam =
        selectedTeam.id === currentGame.HomeTeamId ? "Home" : "Away";
      const pcTeam = playerTeam === "Home" ? "Away" : "Home";

      if (isPlayer) {
        message = `${selectedTeam.name} scored a goal!`;
        updatedGame = {
          ...currentGame,
          HomeTeamScore:
            playerTeam === "Home"
              ? currentGame.HomeTeamScore + 1
              : currentGame.HomeTeamScore,
          AwayTeamScore:
            playerTeam === "Away"
              ? currentGame.AwayTeamScore + 1
              : currentGame.AwayTeamScore,
        };
      } else {
        const pcTeamName =
          pcTeam === "Home" ? currentGame.HomeTeam : currentGame.AwayTeam;
        message = `${pcTeamName} scored a goal!`;
        updatedGame = {
          ...currentGame,
          HomeTeamScore:
            pcTeam === "Home"
              ? currentGame.HomeTeamScore + 1
              : currentGame.HomeTeamScore,
          AwayTeamScore:
            pcTeam === "Away"
              ? currentGame.AwayTeamScore + 1
              : currentGame.AwayTeamScore,
        };
      }
      break;

    case "save":
      message = "The goalkeeper saves the ball!";
      break;

    case "tackle":
      message = "Tackle! The ball is for the opposite team!";
      break;

    case "fulltime":
      message = "The match has ended!";
      updatedGame = { ...currentGame, isPlayed: true };
      changeTurn = false;
      break;

    case "throwin":
      message = "The player is ready for a throw-in!";
      changeTurn = false;
      break;

    case "shoot":
      message = "Shooting at the goal!";
      changeTurn = false;
      break;

    default:
      message = "Unrecognized card action";
      console.log("Unrecognized card action:", face);
  }

  return { updatedGame, message, changeTurn };
}
