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
async function getPlayers(gameId) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/PlayerControler/GetPlayers/${gameId}`
  ).then((response) => response.json());
  return response;
}
if (
  window.location.href ===
  `${window.location.origin}/partials/insertPlayers.html`
) {
  function ileGraczy1(ileJuz) {
    //convert string to number
    const ileMaxGraczy = parseInt(sessionStorage.getItem("ileGraczy"));
    console.log(ileMaxGraczy);
    console.log(ileJuz);
    if (ileJuz === ileMaxGraczy) {
      const okBtn = document.querySelector("#urlCheck");
      const formG = document.querySelector(".form-group");
      const dalej = document.querySelector(".dalej");
      okBtn.classList.add("hidden");
      formG.classList.add("hidden");
      dalej.classList.remove("hidden");
    }
  }
  const addPlayerBtn = document.querySelector(".form-control2");
  const okBtn = document.querySelector("#urlCheck");
  const names = document.querySelector(".names");
  const mode = sessionStorage.getItem("gameMode");
  const gameId = sessionStorage.getItem("gameId");
  console.log(gameId);
  sessionStorage.setItem("gameId", gameId);
  let ileGraczy = 0;
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
        addNewPlayerToGame(gameId, name);
        ileGraczy1(ileGraczy);
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
      ileGraczy++;
      names.insertAdjacentHTML("beforeend", div);
      addPlayerBtn.value = "";
      addNewPlayerToGame(gameId, name);
      ileGraczy1(ileGraczy);
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
      if (input.value < 1) {
        input.value = 1;
      }
      if (input.value > 10) {
        input.value = 10;
      }
      sessionStorage.setItem("ileGraczy", input.value);
    });
    input.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (input.value < 1) {
        input.value = 1;
      }
      if (input.value > 10) {
        input.value = 10;
      }
      sessionStorage.setItem("ileGraczy", input.value);
    });
  } else {
    sessionStorage.setItem("ileGraczy", 1);
  }
  insterUrl.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      const showTeledysk = chceckTeledyskButton.checked;
      sessionStorage.setItem("showTeledysk", showTeledysk);
      url = insterUrl.value;
      const dane = await getSongs(url);
      const game = await createGameNewPlaylist(dane, tryGry);
      sessionStorage.setItem("gameId", game);
      window.location.replace(
        `${window.location.origin}/partials/insertPlayers.html`
      );
    }
  });

  btn.addEventListener("click", async () => {
    const showTeledysk = chceckTeledyskButton.checked;
    sessionStorage.setItem("showTeledysk", showTeledysk);
    let tryGry = 0;
    if (mode === "#party") {
      tryGry = 2;
    } else if (mode === "#multi") {
      tryGry = 3;
    } else {
      tryGry = 1;
    }
    url = insterUrl.value;
    const dane = await getSongs(url);
    const game = await createGameNewPlaylist(dane, tryGry);
    sessionStorage.setItem("gameId", game);
    window.location.replace(
      `${window.location.origin}/partials/insertPlayers.html`
    );
  });
  sessionStorage.setItem("gameMode", mode);
} else if (
  window.location.href ===
  `${window.location.origin}/partials/singlePlayer.html`
) {
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
        `<iframe width="660" height="345" src="${videoUrl}?modestbranding=1&mute=0&autohide=1&showinfo=0&controls=0&autoplay=1&rel=0&start=${secToStart}&end=${end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      );
      // const audio = new Audio(audioUrl);
      // audio.currentTime = secToStart;
      // audio.play();
      setTimeout(() => {
        // audio.pause();
        player.textContent = "";
      }, 15000);
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
}
if (window.location.href === `http://127.0.0.1:8080/partials/score.html`) {
  const scoreBox = document.querySelector(".container1");
  //get game from local storage
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
}
