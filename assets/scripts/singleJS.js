async function getSong(gameId) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Game/NextSong?gameId=${gameId}`
  ).then((response) => response.json());
  return response;
}
async function getGameinfo(gameId) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Game/InformationAboutGame?gameId=${gameId}`
  ).then((response) => response.json());
  return response;
}
async function playerReply(gameId, songId, title, artist, responseTime) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Game/PlayerReply?gameId=${gameId}&songId=${songId}&titleByUser=${title}&artistByUser=${artist}&secWhenUserResponce=${responseTime}
      `,
    {
      method: "POST",
    }
  ).then((response) => response.json());
  return response;
}
async function respons(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    try {
      await playerReply(game, song.id, tytul.value, wykonawca.value, time);
      const player1 = document.querySelector(`.ee${song.player.id}`);
      player1.classList.remove("active-player");
    } catch (e) {}
    try {
      song = await getSong(game);
      setDane(song);
    } catch (e) {
      window.location.href = `${window.location.origin}/partials/score.html`;
    }
  }
}
const showTeledysk = sessionStorage.getItem("showTeledysk");
const player = document.querySelector(".musicBox-m");
const url = sessionStorage.getItem("url");
player.textContent = "";
if (showTeledysk === "false") {
  player.style.height = "40px";
  player.style.marginTop = "20%";
  player.style.display = "flex";
  player.style.justifyContent = "center";
  player.style.alignItems = "center";
}
let artist;
let title;
let songId;
let secToStart;
let videoUrl;
let audioUrl;
let end = 0;
let time = 0;
const wykonawca = document.querySelector("#wyko");
const tytul = document.querySelector("#tyt");
function setDane(song) {
  const id = song.player.id;
  const player1 = document.querySelector(`.ee${id}`);
  player1.classList.add("active-player");
  artist = song.artist;
  title = song.title;
  audioUrl = song.audioUrl;
  songId = song.songId;
  secToStart = song.secToStart + 10;
  videoUrl = song.videoUrl;
  player.textContent = "";
  end = secToStart + 15;
  videoUrl = videoUrl.replace("watch?v=", "embed/");
  videoUrl = videoUrl.substring(0, videoUrl.indexOf("&"));

  player.insertAdjacentHTML(
    "afterbegin",
    `<iframe width="660" height="345" src="${videoUrl}?modestbranding=1&mute=0&autohide=1&showinfo=0&controls=1&autoplay=1&rel=0&start=${secToStart}&end=${end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  );
  if (showTeledysk === "false") {
    player.classList.add("youtube-container1");
  }

  const ifram = document.querySelector("iframe");
  // const audio = new Audio(audioUrl);
  // audio.currentTime = secToStart;
  // audio.play();
  const xdt = setTimeout(() => {
    // audio.pause();
    player.textContent = "";
  }, 15000);
  time = 0;
  const xdt1 = setInterval(() => {
    time += 1;
  }, 1000);

  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 32) {
      ifram.remove();
      clearTimeout(xdt);
      clearInterval(xdt1);
      console.log(time);
    }
    if (e.keyCode === 13) {
      clearTimeout(xdt);
      clearInterval(xdt1);
    }
  });
}

const game = sessionStorage.getItem("gameId");
const gameInfo = await getGameinfo(game);
const players = gameInfo.players;
const playersBox = document.querySelector(".players");

for (let player of players) {
  const id = player.id;
  const addPlayer = `<div class="ee${id}"><h4>${player.name}</h4></div>`;
  playersBox.insertAdjacentHTML("beforeend", addPlayer);
}
sessionStorage.setItem("game", game);
let song = await getSong(game);
setDane(song);
tytul.addEventListener("keyup", async (e) => {
  respons(e);
  tytul.value = "";
  wykonawca.value = "";
});
wykonawca.addEventListener("keyup", async (e) => {
  respons(e);
  tytul.value = "";
  wykonawca.value = "";
});
