async function getPlayers(gameId) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/PlayerControler/GetPlayers/${gameId}`
  ).then((response) => response.json());
  return response;
}
const scoreBox = document.querySelector(".container1");
//get game from local storage
console.log("score");
const game = sessionStorage.getItem("gameId");
console.log(game);
const players = await getPlayers(game);
console.log(players);

for (let player of players) {
  let score = document.createElement("div");
  score.classList.add("score");
  scoreBox.appendChild(score);
  score.insertAdjacentHTML(
    "afterbegin",
    `<h3>${player.name}: ${player.points}</h3>`
  );
}
