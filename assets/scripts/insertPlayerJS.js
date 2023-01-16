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
async function addNewPlayerToGame(gameId, name) {
  const response = await fetch(
    `https://yourmelodyapi20221119173116.azurewebsites.net/api/PlayerControler/AddNewPlayerToGame?gameId=${gameId}&playerNickname=${name}`,
    {
      method: "POST",
    }
  ).then((response) => response.json());
  return response;
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
