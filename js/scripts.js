import { games } from "./db_connection.js";

//Funtion to list the games in the DB
function listGames() {
  let listGames = games.map(function (i) {
    //If name > 14 characters, replace with '...'
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
}

//Get select element
const orderGames = document.getElementById("sort_options");

//On select change, execute the following code:
orderGames.onchange = function () {
  if (orderGames.value == "latest") {
    //Order by latest
    games.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  } else if (orderGames.value == "year") {
    //Order by Year
    games.sort(function (a, b) {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });
  } else if (orderGames.value == "name") {
    //Order by name
    games.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  listGames();
};

//Show data in webpage on load
listGames();

/* Depracated function to upload data into JSON file
//It is very complicated and not useful to mess around with a JSON "database"
*/
function handleSubmit(event) {
  event.preventDefault();

  const gameId = games.length++;
  const gameName = document.getElementById("game_name-input").value;
  const gameYear = document.getElementById("game_year-input").value;
  const gameImg = document.getElementById("game_cover-input").value;

  if (gameName == "" || gameYear == "" || gameImg == "") {
    document.getElementById("submission_result").innerHTML = `
      <div class="error__box">
        <p class="error__box-text">Please fill all the fields above!</p>
      </div>
    `;
  } else {
    document.getElementById("submission_result").innerHTML = `
      <div class="sucess__box">
        <p class="sucess__box-text">Game submitted sucessfully!</p>
      </div>
    `;

    console.log(
      "Game ID: " +
        gameId +
        "\nGame Name: " +
        gameName +
        "\nGame Year: " +
        gameYear +
        "\nGame Cover: " +
        gameImg
    );
  }
}

const submit = document.getElementById("game_submit-input");
submit.addEventListener("click", handleSubmit);
