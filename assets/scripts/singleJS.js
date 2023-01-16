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
const showTeledysk = sessionStorage.getItem("showTeledysk");
const player = document.querySelector(".musicBox-m");
const url = sessionStorage.getItem("url");
player.textContent = "";
if (showTeledysk === "false") {
  player.style.height = "40px";
  player.style.marginTop = "22rem";
}
let artist;
let title;
let songId;
let secToStart;
let videoUrl;
let audioUrl;
let end = 0;
const wykonawca = document.querySelector("#wyko");
const tytul = document.querySelector("#tyt");
function setDane(song) {
  const id = song.player.id;
  console.log(id);
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
  if (showTeledysk === "true") {
    player.insertAdjacentHTML(
      "afterbegin",
      `<iframe width="660" height="345" src="${videoUrl}?modestbranding=1&mute=0&autohide=1&showinfo=0&controls=1&autoplay=1&rel=0&start=${secToStart}&end=${end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );
    const ifram = document.querySelector("iframe");
    //create interval to count down time
    const xdt1 = setInterval(() => {
      if (secToStart > 0) {
        secToStart--;
      } else {
        clearInterval(xdt1);
      }
    }, 1000);
    console.log(xdt1);
    // const audio = new Audio(audioUrl);
    // audio.currentTime = secToStart;
    // audio.play();
    const xdt = setTimeout(() => {
      // audio.pause();
      player.textContent = "";
    }, 15000);
    //get current time of video from iframe

    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        ifram.remove();
        clearTimeout(xdt);
      }
      if (e.keyCode === 13) {
        clearTimeout(xdt);
      }
    });
  }
}

const game = sessionStorage.getItem("gameId");
const gameInfo = await getGameinfo(game);
const players = gameInfo.players;
console.log(gameInfo);
const playersBox = document.querySelector(".players");

for (let player of players) {
  //cut player from first non number to end
  const id = player.id;

  const addPlayer = `<div class="ee${id}"><h4>${player.name}</h4></div>`;
  playersBox.insertAdjacentHTML("beforeend", addPlayer);
}

// const gracz = document.querySelector("#players");
// gracz.classList.add("active-player");
//add game to local storage
sessionStorage.setItem("game", game);
let song = await getSong(game);
console.log(song);
console.log(game);
// console.log(dane);
setDane(song);
tytul.addEventListener("keyup", async (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    try {
      const xd = await playerReply(
        game,
        song.id,
        tytul.value,
        wykonawca.value,
        2
      );
      const player1 = document.querySelector(`.ee${song.player.id}`);
      player1.classList.remove("active-player");
      console.log(xd);
    } catch (e) {
      console.log(e);
    }
    //console.log(xdd);
    try {
      song = await getSong(game);
      setDane(song);
      console.log(song);
    } catch (e) {
      window.location.href = `${window.location.origin}/partials/score.html`;
    }
  }
});
wykonawca.addEventListener("keyup", async (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    try {
      const xd = await playerReply(
        game,
        song.id,
        tytul.value,
        wykonawca.value,
        2
      );
      const player1 = document.querySelector(`.ee${song.player.id}`);
      player1.classList.remove("active-player");
      console.log(xd);
    } catch (e) {
      console.log(e);
    }
    // console.log(xdd);
    try {
      song = await getSong(game);
      setDane(song);
      console.log(song);
    } catch (e) {
      //move to score

      window.location.href = `${window.location.origin}/partials/score.html`;
    }
  }
});
