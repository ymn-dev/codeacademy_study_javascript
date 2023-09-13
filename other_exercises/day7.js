/*
Daily working question - 20230913
In a football league, matches are not only won by teams but players who excel on the field can also be recognized as the Most Valuable Player (MVP) of the match.
You can assume that only 20 teams in this league and home/away team will face each other only 2 times for each season.
Given an example list of matches and their scores
"matches": [
  {"home": "Team1", "away": "Team2", "homeScore": 2, "awayScore": 1, "MVP": "AAAAAA"}, // Team 1 Win
  {"home": "Team2", "away": "Team1", "homeScore": 0, "awayScore": 0, "MVP": null }, // Draw
]
Rule
>3 points for winner
>Draw - 1 point for each other
>0 point for lose
Questions
>Determines the winner of the league
>Find the player who has been awarded the most MVP titles throughout the season.
  >MVP will consider from winner team
  >If draw, Assume there is no MVP on the match
*/
const Match = (homeTeam, awayTeam, homeScore, awayScore, MVP, winner) => {
  return {
    home: homeTeam,
    away: awayTeam,
    homeScore: homeScore,
    awayScore: awayScore,
    MVP: MVP,
    winner: winner,
  };
};

//generating teams
//assuming only 11 players a team, no bench warmers
const teams = [];
for (let i = 65; i < 20 + 65; i++) {
  const teamName = String.fromCharCode(i);
  const players = [];
  for (let j = 1; j <= 11; j++) {
    players.push({
      name: teamName + j,
      MVPcount: 0,
    });
  }

  teams.push({
    name: teamName,
    players: players,
    matchRecord: [],
    pointTotal: 0,
    addMatch(match) {
      this.matchRecord.push(match);
    },
  });
}
// console.log(teams);
// console.log(teams[1].players);

//simulating matches
for (let i = 0; i < teams.length; i++) {
  teams.forEach((team, index) => {
    if (index !== i) {
      const homeTeam = teams[i];
      const awayTeam = team;
      const homeScore = Math.floor(Math.random() * 10);
      const awayScore = Math.floor(Math.random() * 10);
      let MVP = null;
      let winner = "tied";
      if (homeScore > awayScore) {
        homeTeam.pointTotal += 3;
        const MVPPlayer = homeTeam.players[Math.floor(Math.random() * homeTeam.players.length)];
        MVPPlayer.MVPcount++;
        MVP = MVPPlayer.name;
        winner = homeTeam.name;
      } else if (awayScore > homeScore) {
        awayTeam.pointTotal += 3;
        const MVPPlayer = awayTeam.players[Math.floor(Math.random() * awayTeam.players.length)];
        MVPPlayer.MVPcount++;
        MVP = MVPPlayer.name;
        winner = awayTeam.name;
      }
      teams[i].addMatch(Match(homeTeam, awayTeam, homeScore, awayScore, MVP, winner));
    }
  });
}

//find Winner and MVP, no tiebreaker
let winner = [];
let MVP = [];
let highestScore = 0;
let highestMVPCount = 0;
for (let i = 0; i < teams.length; i++) {
  if (teams[i].pointTotal > highestScore) {
    winner = [teams[i].name];
    highestScore = teams[i].pointTotal;
  } else if (teams[i].pointTotal === highestScore) {
    winner.push(teams[i].name);
  }
  for (let j = 0; j < teams[i].players.length; j++) {
    if (teams[i].players[j].MVPcount > highestMVPCount) {
      MVP = [teams[i].players[j].name];
      highestMVPCount = teams[i].players[j].MVPcount;
    } else if (teams[i].players[j].MVPcount === highestMVPCount) {
      MVP.push(teams[i].players[j].name);
    }
  }
}
console.log(`THE WINNER IS ${winner[0]} with ${highestScore} points`);
console.log(`THE MVP IS ${MVP[0]} with ${highestMVPCount} times`);
