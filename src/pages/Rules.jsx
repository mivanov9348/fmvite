/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Divider } from "@mui/material";

export default function Rules() {
  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 800,
        margin: "auto",
        textAlign: "center",
        color: "white",
      }}
    >
      {/* Rule 1 */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Getting Started
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Start by selecting a team from a list of 20 randomly generated options.
        Once you have chosen a team, click on 'Start Game' to proceed.
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Rule 2 */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Gameplay Mechanics
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        The game is played by flipping cards from a set of 20, each representing
        a different action or event in the fixture. Players take turns to flip
        these cards and react to the outcomes.
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Rule 3 */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Card Actions
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Each card in the game triggers a specific action like 'Goal', 'Save', or
        'Tackle', affecting the match's outcome. An explanation and image for
        each card type are provided.
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Rule 4 */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Game Conclusion
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        A fixture concludes once all cards are flipped, and the match's result
        is determined by the actions that occurred. Monitor your team's progress
        through 'Standings' and 'Team Stats'.
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: 2 }} />

      {/* Additional Notes or Rules */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Enjoy the Game
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Remember, the key is to enjoy the experience of managing your team
        through the season. Good luck and have fun!
      </Typography>
    </Box>
  );
}
