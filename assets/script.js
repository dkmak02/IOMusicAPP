"use strict";
let url;

async function getSongs(url) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Songs/GetSongs?playlistUrl=${url}`
  ).then((response) => response.json());
  return response.songs;
}

async function createGameNewPlaylist(dane, mode) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Game/CreateGameNewPlaylist?mode=${mode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songs: dane,
      }),
    }
  ).then((response) => response.json());
  return response;
}

async function addNewPlayerToGame(gameId, name) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/PlayerControler/AddNewPlayerToGame?gameId=${gameId}&playerNickname=${name}`,
    {
      method: "POST",
    }
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
async function getSong(gameId) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/Game/NextSong?gameId=${gameId}`
  ).then((response) => response.json());
  return response;
}
if (
  window.location.href ===
  `${window.location.origin}/partials/insertPlayers.html`
) {
  const addPlayerBtn = document.querySelector(".form-control2");
  const okBtn = document.querySelector("#urlCheck");
  const names = document.querySelector(".names");
  const mode = localStorage.getItem("gameMode");
  let ileGraczy = 0;
  console.log(mode);
  //gamne id e680bd74-9fb2-4404-b00a-6bca041cd442
  addPlayerBtn.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const name = addPlayerBtn.value;
      if (name.length > 0) {
        const div = `<div class="asss">
        ${name}
    </div>`;
        ileGraczy++;
        names.insertAdjacentHTML("beforeend", div);
        addPlayerBtn.value = "";
        if (mode === "#single") {
          window.location.replace(
            `${window.location.origin}/partials/singleplayer.html`
          );
        }
      }
    }
  });
  okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = addPlayerBtn.value;
    if (name.length > 0) {
      const div = `<div class="asss">
      ${name}
  </div>`;
      names.insertAdjacentHTML("beforeend", div);
      addPlayerBtn.value = "";
      if (mode === "#single") {
        window.location.replace(
          `${window.location.origin}/partials/singleplayer.html`
        );
      }
    }
  });
}
if (
  window.location.href ===
    `${window.location.origin}/partials/insertUrl.html#multi` ||
  window.location.href ===
    `${window.location.origin}/partials/insertUrl.html#single` ||
  window.location.href ===
    `${window.location.origin}/partials/insertUrl.html#party`
) {
  const insterUrl = document.querySelector("#url");
  const btn = document.querySelector("#urlCheck");
  const chceckTeledyskButton = document.querySelector("#checkbox1");
  const mode = new URL(document.URL).hash;
  if (mode === "#party") {
    const ileG = document.querySelector(".iloscgraczy");
    ileG.classList.remove("hidden");
    const input = document.querySelector(".form-control3");
    input.addEventListener("click", (e) => {
      e.preventDefault();
      if (input.value < 0) {
        input.value = 0;
      }
      if (input.value > 10) {
        input.value = 10;
      }
      localStorage.setItem("ileGraczy", input.value);
    });
    input.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (input.value < 0) {
        input.value = 0;
      }
      if (input.value > 10) {
        input.value = 10;
      }
      localStorage.setItem("ileGraczy", input.value);
    });
    //add input value to local storage
  }
  insterUrl.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      const showTeledysk = chceckTeledyskButton.checked;
      localStorage.setItem("showTeledysk", showTeledysk);
      url = insterUrl.value;
      localStorage.setItem("url", url);
      const ileGraczy = localStorage.getItem("ileGraczy");
      console.log(ileGraczy);
      // window.location.replace(
      //   `${window.location.origin}/partials/insertPlayers.html`
      // );
    }
  });

  btn.addEventListener("click", async () => {
    const showTeledysk = chceckTeledyskButton.checked;
    localStorage.setItem("showTeledysk", showTeledysk);
    url = insterUrl.value;
    localStorage.setItem("url", url);
    window.location.replace(
      `${window.location.origin}/partials/insertPlayers.html`
    );
  });
  localStorage.setItem("gameMode", mode);
} else if (
  window.location.href ===
  `${window.location.origin}/partials/singleplayer.html`
) {
  const mode = localStorage.getItem("gameMode");
  const showTeledysk = localStorage.getItem("showTeledysk");
  const player = document.querySelector(".musicBox-m");
  const url = localStorage.getItem("url");
  player.textContent = "";

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
      `<iframe width="660" height="345" src="${videoUrl}?modestbranding=1&mute=1&autohide=1&showinfo=0&controls=0&autoplay=1&rel=0&start=${secToStart}&end=${end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );
    // const audio = new Audio(audioUrl);
    // audio.currentTime = secToStart;
    // audio.play();
    // setTimeout(() => {
    //   audio.pause();
    //   player.textContent = "";
    // }, 15000);
  }
  const dane = await getSongs(url);
  const game = await createGameNewPlaylist(dane, 1);
  const players = await addNewPlayerToGame(game, "player1");
  const playersBox = document.querySelector(".players");
  const addPlayer = `<div id="players"><h3>Player 1</h3></div>`;
  playersBox.insertAdjacentHTML("afterbegin", addPlayer);
  const gracz = document.querySelector("#players");
  gracz.classList.add("active-player");
  //add game to local storage
  localStorage.setItem("game", game);
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
        console.log(xd);
      } catch (e) {
        console.log(e);
      }
      //console.log(xdd);
      try {
        song = await getSong(game);
        setDane(song);
      } catch (e) {
        console.log("niamdasd");
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
        console.log(xd);
      } catch (e) {
        console.log(e);
      }
      // console.log(xdd);
      try {
        song = await getSong(game);
        setDane(song);
      } catch (e) {
        //move to score

        window.location.href = `${window.location.origin}/partials/score.html`;
      }
    }
  });
}
if (window.location.href === `http://127.0.0.1:8080/partials/score.html`) {
  const scoreBox = document.querySelector(".container1");
  const pkt = localStorage.getItem("pkt");
  //get game from local storage
  const game = localStorage.getItem("game");
  const players = await getGameinfo(game);
  console.log(players);
  // for (let player of players.players) {
  //   score.insertAdjacentHTML("afterbegin", `${player.name}: ${player.points}`);
  // }
  //create div with score class and insert score to it and insert it to scoreBox div

  for (let player of players.players) {
    let score = document.createElement("div");
    score.classList.add("score");
    scoreBox.appendChild(score);
    score.insertAdjacentHTML(
      "afterbegin",
      `<h3>${player.name}: ${player.points}</h3>`
    );
  }
}
