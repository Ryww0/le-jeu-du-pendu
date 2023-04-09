const $$keys = document.querySelectorAll(".keyboard button");
const $wordContainer = document.querySelector(".word");
const $gameOver = document.querySelector(".game-over");
const $gameWin = document.querySelector(".game-win");
const $restartLooseBtn = document.querySelector(".game-over button");
const $restartWinBtn = document.querySelector(".game-win button");
const $pWin = document.querySelector(".game-win p");
const $pOver = document.querySelector(".game-over p");

let words = [];
let word = "";
let errors = 0;
let accurate = 0;

getDatas(game);

function game() {
  let n = getRandomInt(0, words.length + 1);
  word = words[n];
  //   console.log(word);
  let wordLetterByLetter = word.split("");

  // create my waited letters span
  for (let i = 0; i < word.length; i++) {
    const $letter = document.createElement("span");

    $wordContainer.append($letter);
  }

  const $$wordSpans = document.querySelectorAll(".word span");

  $$keys.forEach((key) => {
    key.addEventListener("click", () => {
      if (
        key.classList.contains("success") ||
        key.classList.contains("failure")
      ) {
        return;
      }
      if (errors < 5) {
        if (word.includes(key.innerText)) {
          for (let j = 0; j < word.length; j++) {
            if (key.innerText == wordLetterByLetter[j]) {
              $$wordSpans[j].innerText = key.innerText;
              accurate += 1;
            }
          }
          key.classList.add("success");
          if (accurate == word.length) {
            $pWin.innerText = word;
            $gameWin.classList.remove("d-none");
          }
        } else {
          errors += 1;
          key.classList.add("failure");
          if (errors === 5) {
            $pOver.innerText = word;
            $gameOver.classList.remove("d-none");
          }
        }
      } else {
        $pOver.innerText = word;
        $gameOver.classList.remove("d-none");
      }
    });
  });
}

// this function get all the datas in my json database
function getDatas(callback) {
  fetch("./db.json")
    .then((response) => response.json())
    .then((data) => {
      words = data.mots;
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// not used for the moment
/*
function addLetter() {
  for (let j = 0; j < word.length; j++) {
    if (key.innerText == wordLetterByLetter[j]) {
      $$wordSpans[j].innerText = key.innerText;
    } else {
      console.log("pas la bonne lettre");
    }
  }
}
*/

$restartLooseBtn.addEventListener("click", () => {
  //   $gameOver.classList.add("d-none");

  //   $wordContainer.innerHTML = "";
  //   errors = 0;
  //   accurate = 0;
  //   word = "";
  //   words = [];

  //   $$keys.forEach((key) => {
  //     key.classList.remove("success");
  //     key.classList.remove("failure");
  //   });
  //   getDatas(game);
  window.location.replace(window.location.href);
});

$restartWinBtn.addEventListener("click", () => {
  //   $gameWin.classList.add("d-none");
  //   $wordContainer.innerHTML = "";
  //   errors = 0;
  //   accurate = 0;
  //   word = "";
  //   words = [];
  //   $$keys.forEach((key) => {
  //     key.classList.remove("success");
  //     key.classList.remove("failure");
  //   });
  //   getDatas(game);
  window.location.replace(window.location.href);
});
