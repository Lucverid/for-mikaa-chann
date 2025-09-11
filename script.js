const slides = [
  "Jyaa Mikaa Chann :)",
  "Ekhem sudah tanggal 17 September aja Nih",
  "Mwhehe Maaf ya Mikaa, aku ngga bisa ngerayain langsung. Tapi.. semoga dengan hadiah dan perayaan kecil ini bisa ngebuat Mikaa seneng",
  "I'm proud of you, and I always will be <3"
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

  const btnA = document.querySelector(".ab-buttons .circle:nth-child(1)");
  const btnB = document.querySelector(".ab-buttons .circle:nth-child(2)");

  const btnMessage = document.getElementById('btn-message');
  const btnGallery = document.getElementById('btn-gallery');
  const btnMusic = document.getElementById('btn-music');
  const btnTetris = document.getElementById('btn-tetris');

  const messages = [
    "🎈 Happy Birthday!! Selamat mencari jati diri, hehehe -Tidak tahu ni punya siapa :v",
    "💪 Hari yang di nantikan sudah tiba, Happy Birthday Mikaa chann. Semoga apa yang kamu harap dan yang kamu tuju selalu dilancarkan ",
    "🌟 Jangan terlalu banyak pikiran Mika chann, biar tidurnya bisa nyenyak",
    "✝️ Kiranya diberikan-Nya kepadamu apa yang diinginkan hatimu dan dijadikan-Nya berhasil segala rencanamu -Mazmur 20:4."",
    " I Think I Love You *Ini beneran ya, tapi mohon maaf rasanya kerasa lebay😂"
  ];

  const gallery = [
    { src: "https://i.imgur.com/SmY0XGv.jpeg", caption: "Cantiknyaaa kamu! 😍" },
    { src: "https://i.imgur.com/N92EjXz.jpeg", caption: "Mikaa & senyum manisnya ☀️" },
    { src: "https://i.imgur.com/YFvYa6R.jpeg", caption: "Pose andalan! 💃" },
    { src: "https://i.imgur.com/v4aBlch.jpeg", caption: "Tatapan mematikan 🔥" },
    { src: "https://i.imgur.com/rZSzcvw.jpeg", caption: "Candid tapi tetap kece 📸" }
  ];

  // Tombol menu
  btnMessage.addEventListener('click', () => {
    subtitle.innerHTML = messages.map(msg => `<div style="margin-bottom:10px;">${msg}</div>`).join('');
    subtitle.scrollTop = 0;
  });

  btnGallery.addEventListener('click', () => {
    subtitle.innerHTML = gallery.map(g =>
      `<div style="margin-bottom:10px;">
        <img src="${g.src}" style="width:100%;max-width:200px;border-radius:5px;"><br>
        <em>${g.caption}</em>
      </div>`).join('');
    subtitle.scrollTop = 0;
  });

  btnMusic.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      subtitle.innerHTML = "🎵 Musik diputar!";
    } else {
      bgMusic.pause();
      subtitle.innerHTML = "🎵 Musik dihentikan!";
    }
  });

  btnTetris.addEventListener('click', () => {
    subtitle.innerHTML = "🧱 Tetrisnya ngg ada Mik, aku-nya sedang mamlas ngomding";
  });

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
      if (count > 0) countdown.innerText = count;
      else {
        clearInterval(timer);
        countdown.innerText = "🎉";
        setTimeout(() => { countdown.remove(); showSlide(slides[currentSlide]); }, 800);
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
    subtitle.innerText = "Press Start Button 👾";
    subtitle.style.whiteSpace = "";
    subtitle.style.overflowY = "unset";
    subtitle.style.maxHeight = "";
    subtitle.scrollTop = 0;

    bgMusic.pause();
    bgMusic.currentTime = 0;
  });

  // SLIDE TEXT
  function showSlide(text) {
    subtitle.innerText = "";
    subtitle.style.whiteSpace = "normal";
    subtitle.style.overflowY = "auto";
    subtitle.style.maxHeight = "100px";

    const words = text.split(" ");
    let i = 0;

    typingInterval = setInterval(() => {
      if (!slideStarted) { clearInterval(typingInterval); return; }

      if (i < words.length) {
        subtitle.innerHTML += words[i] + " ";
        i++;
        subtitle.scrollTop = subtitle.scrollHeight;
      } else {
        clearInterval(typingInterval);
        if (!slideStarted) return;

        if (currentSlide < slides.length - 1) {
          nextSlideTimeout = setTimeout(() => { currentSlide++; showSlide(slides[currentSlide]); }, 1500);
        } else {
          finalQuestionTimeout = setTimeout(() => {
            subtitle.innerHTML += "<br><br><strong>Mau main mini games?</strong><br>Tekan <strong>A</strong> untuk YA, <strong>B</strong> untuk TIDAK.";
            initChoiceEvents();
          }, 1500);
        }
      }
    }, 300);
  }

  // PILIHAN A/B
  function initChoiceEvents() {
    document.addEventListener("keydown", onChoice);
    btnA.addEventListener("click", handleClickA);
    btnB.addEventListener("click", handleClickB);
  }

  function onChoice(e) {
    if (!slideStarted) return;
    if (e.key.toLowerCase() === "a") handleClickA();
    else if (e.key.toLowerCase() === "b") handleClickB();
  }

  function handleClickA() { cleanupChoiceEvents(); startCatGame(); }
  function handleClickB() { cleanupChoiceEvents(); subtitle.innerHTML = " Wah parah si kalo nggak dilanjut-_-!"; }
  function cleanupChoiceEvents() {
    document.removeEventListener("keydown", onChoice);
    btnA.removeEventListener("click", handleClickA);
    btnB.removeEventListener("click", handleClickB);
  }

  // MINI GAME CAT
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
    player.innerText = "😾";
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

    let score = 0, target = 5, gameOver = false;

    function updateScore() { scoreDiv.innerText = `Tangkap: ${score}/${target}`; }
    function randomCatPosition() {
      const maxX = gameArea.clientWidth - 24;
      const maxY = gameArea.clientHeight - 24;
      cat.style.left = Math.floor(Math.random() * maxX) + "px";
      cat.style.top = Math.floor(Math.random() * maxY) + "px";
    }
    randomCatPosition();
    updateScore();

    const catInterval = setInterval(() => { if (!gameOver) randomCatPosition(); }, 1000);

    function movePlayer(dx, dy) {
      if (gameOver) return;
      const newX = Math.min(Math.max(player.offsetLeft + dx, 0), gameArea.clientWidth - 24);
      const newY = Math.min(Math.max(player.offsetTop + dy, 0), gameArea.clientHeight - 24);
      player.style.left = newX + "px";
      player.style.top = newY + "px";

      if (Math.abs(newX - cat.offsetLeft) < 24 && Math.abs(newY - cat.offsetTop) < 24) {
        score++;
        updateScore();
        if (score >= target) { gameOver = true; clearInterval(catInterval); handleWin(); }
        else randomCatPosition();
      }
    }

    // KEYBOARD
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowUp") movePlayer(0, -10);
      else if (e.key === "ArrowDown") movePlayer(0, 10);
      else if (e.key === "ArrowLeft") movePlayer(-10, 0);
      else if (e.key === "ArrowRight") movePlayer(10, 0);
    });

    // D-PAD CLICK
    const upBtn = document.querySelector(".dpad .up");
    const downBtn = document.querySelector(".dpad .down");
    const leftBtn = document.querySelector(".dpad .left");
    const rightBtn = document.querySelector(".dpad .right");

    upBtn.addEventListener("click", () => movePlayer(0, -10));
    downBtn.addEventListener("click", () => movePlayer(0, 10));
    leftBtn.addEventListener("click", () => movePlayer(-10, 0));
    rightBtn.addEventListener("click", () => movePlayer(10, 0));

    function handleWin() {
      subtitle.innerHTML = "🎉 Mantap Mikaa, kocengnya dah ditangkap semua";
      gameArea.style.transition = "opacity 0.8s ease";
      scoreDiv.style.transition = "opacity 0.8s ease";
      gameArea.style.opacity = 0; scoreDiv.style.opacity = 0;

      setTimeout(() => {
        gameArea.remove(); scoreDiv.remove();

        subtitle.innerHTML = "<strong>Cihuyy! Kamu mendapatkan hadiah 🎁</strong><br><br>Tekan <strong>A</strong> untuk AMBIL, <strong>B</strong> untuk TIDAK";

        function onRewardChoice(e) { if (e.key.toLowerCase() === "a") takeGift(); else if (e.key.toLowerCase() === "b") declineGift(); }
        function handleClickA() { takeGift(); }
        function handleClickB() { declineGift(); }

        document.addEventListener("keydown", onRewardChoice);
        btnA.addEventListener("click", handleClickA);
        btnB.addEventListener("click", handleClickB);

        function cleanupRewardEvents() { document.removeEventListener("keydown", onRewardChoice); btnA.removeEventListener("click", handleClickA); btnB.removeEventListener("click", handleClickB); }

        function takeGift() {
          cleanupRewardEvents();
          subtitle.innerHTML = "🎁 Widiiii dapat hadiah nihh";
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

          // Tampilkan YouTube
          screen.innerHTML = "";
          const ytContainer = document.createElement("div");
          ytContainer.style.width = "100%";
          ytContainer.style.height = "100%";
          ytContainer.style.display = "flex";
          ytContainer.style.justifyContent = "center";
          ytContainer.style.alignItems = "center";

          const ytFrame = document.createElement("iframe");
          ytFrame.src = "https://www.youtube.com/embed/3_QLj6S7cdQ?autoplay=1";
          ytFrame.style.width = "90%";
          ytFrame.style.height = "90%";
          ytFrame.style.border = "0";
          ytFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          ytFrame.allowFullscreen = true;
          ytFrame.style.borderRadius = "10px";

          ytContainer.appendChild(ytFrame);
          screen.appendChild(ytContainer);
        }

        function declineGift() {
          cleanupRewardEvents();
          subtitle.innerHTML = "Waduhh hadiahnya ketinggalan Mik";
        }

      }, 800);
    }

  }
});
