import { games } from "./db_connection.js";

//Show data in webpage on load

let listGames = games.map(function (i) {
  if (i.name.length > 14) {
    i.name = i.name.substring(0, 13).concat("...");
  }
  return `
  <div class="game">
    <div class="game__box">
        <h2 class="game__name">${i.name}</h2>
        <h2 class="game__year">${i.year}</h2>
        <img src="${i.img}" class="game__cover" />
    </div>
  </div>
  `;
});

document.getElementById("content").innerHTML = listGames.join("\n");
