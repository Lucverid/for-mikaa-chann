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

  const btnA = document.querySelector(".circle:nth-child(1)");
  const btnB = document.querySelector(".circle:nth-child(2)");

  const btnMessage = document.getElementById('btn-message');
  const btnGallery = document.getElementById('btn-gallery');
  const btnMusic = document.getElementById('btn-music');
  const btnTetris = document.getElementById('btn-tetris');

  // 🎁 Pesan untuk MESSAGE
  const messages = [
    "🎈 Hari ini spesial banget karena kamu spesial!",
    "💪 Jangan lupa istirahat dan terus semangat ya!",
    "🌟 Kamu punya banyak potensi, percaya diri terus!",
    "🎂 Semoga ulang tahun kali ini membawa banyak berkah.",
    "❤️ Terima kasih sudah menjadi dirimu yang luar biasa!"
  ];

  // 📷 Data GALLERY
  const gallery = [
    { src: "https://i.imgur.com/SmY0XGv.jpeg", caption: "Cantiknyaaa kamu! 😍" },
    { src: "https://i.imgur.com/N92EjXz.jpeg", caption: "Mikaa & senyum manisnya ☀️" },
    { src: "https://i.imgur.com/YFvYa6R.jpeg", caption: "Pose andalan! 💃" },
    { src: "https://i.imgur.com/v4aBlch.jpeg", caption: "Tatapan mematikan 🔥" },
    { src: "https://i.imgur.com/rZSzcvw.jpeg", caption: "Candid tapi tetap kece 📸" }
  ];

  // EVENT: MESSAGE Button
  btnMessage.addEventListener('click', () => {
    subtitle.innerHTML = messages.map(msg => `<div style="margin-bottom:10px;">${msg}</div>`).join('');
    subtitle.scrollTop = 0;
  });

  // EVENT: GALLERY Button
  btnGallery.addEventListener('click', () => {
    subtitle.innerHTML = gallery.map(g =>
      `<div style="margin-bottom:10px;">
        <img src="${g.src}" style="width:100%;max-width:200px;border-radius:5px;"><br>
        <em>${g.caption}</em>
      </div>`
    ).join('');
    subtitle.scrollTop = 0;
  });

  // EVENT: MUSIC Button
  btnMusic.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      subtitle.innerHTML = "🎵 Musik diputar!";
    } else {
      bgMusic.pause();
      subtitle.innerHTML = "🎵 Musik dihentikan!";
    }
  });

  // EVENT: TETRIS Button
  btnTetris.addEventListener('click', () => {
    subtitle.innerHTML = "🧱 Tetris belum tersedia ya... Tunggu update berikutnya! 😆";
  });

  // EVENT: START
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

  // EVENT: RESET
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

  // FUNGSI SLIDE TEXT
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

  function handleClickA() {
    cleanupChoiceEvents();
    startCatGame();
  }

  function handleClickB() {
    cleanupChoiceEvents();
    subtitle.innerHTML = "😅 Wah parah si kalo nggak dilanjut!";
  }

  function cleanupChoiceEvents() {
    document.removeEventListener("keydown", onChoice);
    btnA.removeEventListener("click", handleClickA);
    btnB.removeEventListener("click", handleClickB);
  }

  // MINI GAME tetap pakai yang sebelumnya (startCatGame)
});
