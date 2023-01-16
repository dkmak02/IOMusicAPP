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
    if (input.value > 5) {
      input.value = 5;
    }
    sessionStorage.setItem("ileGraczy", input.value);
  });
  input.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (input.value < 1) {
      input.value = 1;
    }
    if (input.value > 5) {
      input.value = 5;
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
    const url = insterUrl.value;
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
  const url = insterUrl.value;
  const dane = await getSongs(url);
  const game = await createGameNewPlaylist(dane, tryGry);
  sessionStorage.setItem("gameId", game);
  window.location.replace(
    `${window.location.origin}/partials/insertPlayers.html`
  );
});
sessionStorage.setItem("gameMode", mode);
