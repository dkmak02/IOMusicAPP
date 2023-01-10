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
  insterUrl.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      const showTeledysk = chceckTeledyskButton.checked;
      localStorage.setItem("showTeledysk", showTeledysk);
      url = insterUrl.value;
      localStorage.setItem("url", url);
      window.location.replace(
        `${window.location.origin}/partials/singleplayer.html`
      );
    }
  });

  btn.addEventListener("click", async () => {
    const showTeledysk = chceckTeledyskButton.checked;
    localStorage.setItem("showTeledysk", showTeledysk);
    url = insterUrl.value;
    localStorage.setItem("url", url);
    window.location.replace(
      `${window.location.origin}/partials/singleplayer.html`
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
  let i = 0;
  let pkt = 0;
  let bledne = 0;
  let end = 0;
  const wykonawca = document.querySelector("#wyko");
  const tytul = document.querySelector("#tyt");
  function setDane(i) {
    if (i > dane.length - 1) {
      localStorage.setItem("pkt", pkt);
      window.location.replace(`${window.location.origin}/partials/score.html`);
    } else {
      artist = dane[i].artist === null ? "" : dane[i].artist;
      title = dane[i].title;
      audioUrl = dane[i].audioUrl;
      songId = dane[i].songId;
      secToStart = dane[i].secToStart + 10;
      videoUrl = dane[i].videoUrl;
      player.textContent = "";
      end = secToStart + 15;
      videoUrl = videoUrl.replace("watch?v=", "embed/");
      videoUrl = videoUrl.substring(0, videoUrl.indexOf("&"));
      player.insertAdjacentHTML(
        "afterbegin",
        `<iframe width="660" height="345" src="${videoUrl}?modestbranding=1&mute=1&autohide=1&showinfo=0&controls=0&autoplay=1&rel=0&start=${secToStart}&end=${end}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      );
    }
    // const audio = new Audio(audioUrl);
    // audio.currentTime = secToStart;
    // audio.play();
    // setTimeout(() => {
    //   audio.pause();
    //   player.textContent = "";
    // }, 15000);
  }
  function check(autor, tytuł) {
    if (bledne === 2) {
      i += 1;
      bledne = 0;
      setDane(i);
      return;
    }
    if (wykonawca.value == artist && tytul.value == title) {
      i += 1;
      pkt += 10;
      wykonawca.value = "";
      tytul.value = "";
      setDane(i);
    } else {
      bledne += 1;
    }
  }

  tytul.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      console.log(wykonawca.value);
      console.log(e.target.value);
      check(wykonawca.value, e.target.value);
    }
  });
  wykonawca.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      console.log(e.target.value);
      console.log(tytul.value);
      check(e.target.value, tytul.value);
    }
  });
  const dane = await getSongs(url);
  const xd = await createGameNewPlaylist(dane, 1);

  console.log(xd);
  console.log(dane);
  setDane(i);
}
if (window.location.href === `http://127.0.0.1:8080/partials/score.html`) {
  const score = document.querySelector(".score");
  const pkt = localStorage.getItem("pkt");
  score.textContent = `Twój wynik to: ${pkt}`;
}
