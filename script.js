const slides = [
  "Hari ini adalah hari spesial 🎂 Karena kamu yang spesial sedang berulang tahun!",
  "Semoga hari-harimu penuh tawa dan cinta dari orang-orang terdekat 🥳",
  "Jangan lupa bersyukur, karena kamu telah melewati banyak hal luar biasa ✨",
  "Selamat ulang tahun! Tetap semangat mengejar mimpi 💪❤️"
];

let currentSlide = 0;
let slideStarted = false;
let typingInterval = null;
let nextSlideTimeout = null;
let finalQuestionTimeout = null;

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start");
  const selectBtn = document.getElementById("select");
  const subtitle = document.querySelector(".subtitle");
  const screen = document.querySelector(".screen");
  const title = document.querySelector(".screen h1");
  const bgMusic = document.getElementById("bg-music");

  const btnA = document.querySelector(".circle:nth-child(1)");
  const btnB = document.querySelector(".circle:nth-child(2)");

  // START
  startBtn.addEventListener("click", () => {
    if (slideStarted) return;
    slideStarted = true;

    bgMusic.play();
    title.style.display = "none";
    subtitle.innerText = "";

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    screen.appendChild(countdown);

    let count = 3;
    countdown.innerText = count;

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countdown.innerText = count;
      } else {
        clearInterval(timer);
        countdown.innerText = "🎉";
        setTimeout(() => {
          countdown.remove();
          showSlide(slides[currentSlide]);
        }, 800);
      }
    }, 1000);
  });

  // RESET
  selectBtn.addEventListener("click", () => {
    clearInterval(typingInterval);
    clearTimeout(nextSlideTimeout);
    clearTimeout(finalQuestionTimeout);
    document.removeEventListener("keydown", onChoice);

    slideStarted = false;
    currentSlide = 0;

    title.style.display = "block";
    subtitle.innerText = "Press Start Button 🥞";
    subtitle.style.whiteSpace = "";
    subtitle.style.overflowY = "unset";
    subtitle.style.maxHeight = "";
    subtitle.scrollTop = 0;

    bgMusic.pause();
    bgMusic.currentTime = 0;
  });

  // SHOW SLIDE
  function showSlide(text) {
    subtitle.innerText = "";
    subtitle.style.whiteSpace = "normal";
    subtitle.style.overflowY = "auto";
    subtitle.style.maxHeight = "100px";

    const words = text.split(" ");
    let i = 0;

    typingInterval = setInterval(() => {
      if (!slideStarted) {
        clearInterval(typingInterval);
        return;
      }

      if (i < words.length) {
        subtitle.innerHTML += words[i] + " ";
        i++;
        subtitle.scrollTop = subtitle.scrollHeight;
      } else {
        clearInterval(typingInterval);

        if (!slideStarted) return;

        if (currentSlide < slides.length - 1) {
          nextSlideTimeout = setTimeout(() => {
            if (!slideStarted) return;
            currentSlide++;
            showSlide(slides[currentSlide]);
          }, 1500);
        } else {
          finalQuestionTimeout = setTimeout(() => {
            if (!slideStarted) return;
            subtitle.innerHTML +=
              "<br><br><strong>Mau main mini games?</strong><br>Tekan <strong>A</strong> untuk YA, <strong>B</strong> untuk TIDAK.";
            initChoiceEvents();
          }, 1500);
        }
      }
    }, 300);
  }

  // INIT PILIHAN A/B
  function initChoiceEvents() {
    document.addEventListener("keydown", onChoice);
    btnA.addEventListener("click", handleClickA);
    btnB.addEventListener("click", handleClickB);
  }

  function handleClickA() {
    cleanupChoiceEvents();
    startCatGame();
  }

  function handleClickB() {
    cleanupChoiceEvents();
    alert("Wah parah si kalo nggak dilanjut 😅");
  }

  function onChoice(e) {
    if (!slideStarted) return;

    if (e.key.toLowerCase() === "a") handleClickA();
    else if (e.key.toLowerCase() === "b") handleClickB();
  }

  function cleanupChoiceEvents() {
    document.removeEventListener("keydown", onChoice);
    btnA.removeEventListener("click", handleClickA);
    btnB.removeEventListener("click", handleClickB);
  }

  // MINI-GAME TANGKAP KUCING
  function startCatGame() {
    screen.innerHTML = "";
    subtitle.innerText = "";

    const gameArea = document.createElement("div");
    gameArea.style.position = "relative";
    gameArea.style.width = "100%";
    gameArea.style.height = "120px";
    gameArea.style.background = "#000";
    gameArea.style.border = "2px solid #00ffff";
    gameArea.style.borderRadius = "10px";
    screen.appendChild(gameArea);

    const scoreDiv = document.createElement("div");
    scoreDiv.style.color = "#00ffcc";
    scoreDiv.style.marginTop = "10px";
    screen.appendChild(scoreDiv);

    const player = document.createElement("div");
    player.innerText = "😺";
    player.style.position = "absolute";
    player.style.left = "10px";
    player.style.top = "50px";
    player.style.fontSize = "24px";
    gameArea.appendChild(player);

    const cat = document.createElement("div");
    cat.innerText = "🐱";
    cat.style.position = "absolute";
    cat.style.fontSize = "24px";
    gameArea.appendChild(cat);

    let score = 0;
    const target = 5;

    function updateScore() {
      scoreDiv.innerText = `Tangkap: ${score}/${target}`;
    }

    function randomCatPosition() {
      const maxX = gameArea.clientWidth - 24;
      const maxY = gameArea.clientHeight - 24;
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      cat.style.left = x + "px";
      cat.style.top = y + "px";
    }

    randomCatPosition();
    updateScore();

    const catInterval = setInterval(randomCatPosition, 1000);

    function movePlayer(dx, dy) {
      const newX = Math.min(Math.max(player.offsetLeft + dx, 0), gameArea.clientWidth - 24);
      const newY = Math.min(Math.max(player.offsetTop + dy, 0), gameArea.clientHeight - 24);
      player.style.left = newX + "px";
      player.style.top = newY + "px";

      // cek tabrakan
      if (
        Math.abs(newX - cat.offsetLeft) < 24 &&
        Math.abs(newY - cat.offsetTop) < 24
      ) {
        score++;
        updateScore();
        if (score >= target) {
          clearInterval(catInterval);
          alert("🎉 You Win! Kamu berhasil menangkap 5 kucing!");
          resetGameScreen();
        } else {
          randomCatPosition();
        }
      }
    }

    // keyboard & D-pad kontrol
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowUp") movePlayer(0, -10);
      else if (e.key === "ArrowDown") movePlayer(0, 10);
      else if (e.key === "ArrowLeft") movePlayer(-10, 0);
      else if (e.key === "ArrowRight") movePlayer(10, 0);
    });

    document.querySelector(".dpad .up").addEventListener("click", () => movePlayer(0, -10));
    document.querySelector(".dpad .down").addEventListener("click", () => movePlayer(0, 10));
    document.querySelector(".dpad .left").addEventListener("click", () => movePlayer(-10, 0));
    document.querySelector(".dpad .right").addEventListener("click", () => movePlayer(10, 0));

    function resetGameScreen() {
      screen.innerHTML = "";
      subtitle.innerText = "Press Start Button 🥞";
      document.querySelector(".screen h1").style.display = "block";
    }
  }
});
