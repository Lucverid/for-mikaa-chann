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

  startBtn.addEventListener("click", () => {
    if (slideStarted) return;
    slideStarted = true;

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

  selectBtn.addEventListener("click", () => {
    // ✅ Bersihkan semua interval & timeout
    clearInterval(typingInterval);
    clearTimeout(nextSlideTimeout);
    clearTimeout(finalQuestionTimeout);
    document.removeEventListener("keydown", onChoice);

    // ✅ Reset semua status
    slideStarted = false;
    currentSlide = 0;

    // ✅ Reset tampilan
    title.style.display = "block";
    subtitle.innerText = "Press Start Button 🥞";
    subtitle.style.whiteSpace = "";
    subtitle.style.overflowY = "unset";
    subtitle.style.maxHeight = "";
    subtitle.scrollTop = 0;
  });

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

  function initChoiceEvents() {
    document.addEventListener("keydown", onChoice);
  }

  function onChoice(e) {
    if (!slideStarted) return;

    if (e.key.toLowerCase() === "a") {
      alert("Kamu pilih YA — Mini Game loading...");
      document.removeEventListener("keydown", onChoice);
    } else if (e.key.toLowerCase() === "b") {
      alert("Oke deh, maybe next time 😄");
      document.removeEventListener("keydown", onChoice);
    }
  }
});
