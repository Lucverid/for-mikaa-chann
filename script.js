document.addEventListener("DOMContentLoaded", function() {

  // ------------- DATA -------------
  const slides = [
    "Jyaa Mikaa Chann :)",
    "Ekhem sudah tanggal 17 September aja Nih",
    "Mwhehe Maaf ya Mikaa, aku ngga bisa ngerayain langsung. Tapi.. semoga dengan hadiah dan perayaan kecil ini bisa ngebuat Mikaa seneng",
    "I'm proud of you, and I always will be"
  ];

 const messages = [
  "🎈 <strong>Happy Birthday!!</strong><br>Selamat mencari jati diri, hehehe -Tidak tahu ni punya siapa :v",
  "💪 Hari yang dinantikan sudah tiba,<br><strong>Happy Birthday Mikaa chann!</strong><br>Semoga apa yang kamu harap dan yang kamu tuju selalu dilancarkan.",
  "🌟 Jangan terlalu banyak pikiran Mika chann,<br>biar tidurnya bisa nyenyak.",
  "✝️ <em>Mazmur 20:4</em> Kiranya diberikan-Nya kepadamu apa yang diinginkan hatimu dan dijadikan-Nya berhasil segala rencanamu.",
  "👾 Kalo kamu lagi kangen (ya walau mustahil sih 😅),<br>Mika boleh chat atau call. Semoga aja bisa ketemu bareng lagi.",
  "😊 Maaf Mik,<br>Saya tidak bisa menyanggupi keinginan kamu untuk resignnya di bulan selanjutnya saja.",
  "😊 Maaf Mik,<br>saya ngga bisa ngerayain langsung ulang tahun kamu yang ke-18.<br> Tapi semoga aja dengan hadiah kecil ini, kamu bisa seneng.",
  "👍 Teruntuk Mikhaela Nazaretha,<br><strong>kamu itu perempuan yang paling tegar dan berani.</strong><br>Jangan lupa berterimakasih ke dirimu, karena sudah berhasil sampai detik ini.",
  "😁 Terimakasih Mika sudah pernah hadir di kehidupan saya.<br>Meskipun sebentar<br>Setiap momen saya catat, jadi tidak akan lupa.",
  "😇 <strong>Jangan lupa terimakasih ke mama kamu, dan bilangin bika ambonnya enak pisan</strong><br>",
"🥳 <strong>Happy Birthday Mikhaela Nazaretha Kurniawan</strong><br>🎂",
  ""
];

   const gallery = [
    { src: "https://i.imgur.com/s0s6WrA.jpeg", caption: "kwowko sumimasen, ni lucuu parah si🤣" },
    { src: "https://i.imgur.com/hvz0i3B.jpeg", caption: "Pemandangannya tenang dan orangnya juga lagi santuy" },
    { src: "https://i.imgur.com/495N7Z1.jpeg", caption: "Inii.. ini kamuu? beneran?🥶" },
    { src: "https://i.imgur.com/wYShwsy.jpeg", caption: "Ini foto terfavorit, you look so pretty" },
    { src: "https://i.imgur.com/Mw1Wz9Q.jpeg", caption: "Parah ngg diajak, okee okee" },
    { src: "https://i.imgur.com/DqjSlvd.jpeg", caption: "Adek kalo tahu 15 tahun kedepan, adek jadi kakak-kakak yang baik, cantik, dan kadang ngeselin sumpah." },
    { src: "https://i.imgur.com/vbxDOiB.jpeg", caption: "Nih Cepek, ngg usah bilang makasih " },
    { src: "", caption: "" },
    
    
  ];

  let currentSlide = 0, slideStarted = false, typingInterval = null, nextSlideTimeout = null, finalQuestionTimeout = null;

  // ------------- LOGIN -------------
  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", ()=>{
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error-msg");
    if(user === "Mikhaela Nazaretha Kurniawan" && pass === "200805") {
      document.getElementById("login-screen").style.display = "none";
      document.getElementById("main-app").style.display = "block";
      initMainApp();
    } else {
      error.textContent = "Username atau password salah!";
    }
  });

  // ------------- MAIN APP -------------
  function initMainApp() {
    const startBtn = document.getElementById("start");
    const selectBtn = document.getElementById("select");
    const subtitle = document.querySelector(".subtitle");
    const screen = document.querySelector(".screen");
    const title = document.querySelector(".screen h1");
    const bgMusic = document.getElementById("bg-music");
    const btnMessage = document.getElementById('btn-message');
    const btnGallery = document.getElementById('btn-gallery');
    const btnMusic = document.getElementById('btn-music');
    const btnGuide = document.getElementById('btn-guide');
    const btnA = document.getElementById("btnA");
    const btnB = document.getElementById("btnB");

    btnMessage.addEventListener('click', () => {
      subtitle.innerHTML = messages.map(msg => `<div>${msg}</div>`).join('');
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
      if(bgMusic.paused){ 
        bgMusic.play().then(()=>{ subtitle.innerHTML="🎵 Musik diputar!"; }).catch(()=>{subtitle.innerHTML="⚠️ Tidak bisa memutar musik!"}); 
      } else { 
        bgMusic.pause(); 
        subtitle.innerHTML="🎵 Musik dihentikan!"; 
      }
    });

    btnGuide.addEventListener('click', ()=>{
      subtitle.innerHTML = `<div style="font-size:6px; text-align:left; line-height:1.6;">
        <p>📘 Arahan cara penggunaan biar Mika tidak pusing : </p>
        <ol style="padding-left:15px;">
          <li> Jangan klik tombol <strong>START</strong> sebelum tombol mesage dan gallery dan music</li>
          <li> Jika bagian slide sudah dibaca <strong> Mesage & Galery</strong> Maka <strong> Klik START</strong> untuk memulai </li>
          <li> Jangan klik tombol <strong> 
START</strong> secara berulang</li>
          <li> Jika sudah memenangkan <strong>MINI GAME</strong> Silahkan klik tombol A</li>
          <li> Jika muncul <strong>HADIAHNYA</strong> klik tombol Music untuk mematikannya</li>
          <li> Web ini <strong>TIDAK AKAN HILANG</strong> jadi bisa buat kenang-kenangan juga 🔁.</li>
        </ol></div>`;
      subtitle.scrollTop = 0;
    });

    startBtn.addEventListener("click", ()=>{
      if(slideStarted) return;
      slideStarted = true;
      bgMusic.play();
      title.style.display="none";
      subtitle.innerText="";
      const countdown = document.createElement("div");
      countdown.className="countdown";
      screen.appendChild(countdown);
      let count = 3;
      countdown.innerText=count;
      const timer = setInterval(()=>{
        count--;
        if(count>0) countdown.innerText=count;
        else{
          clearInterval(timer);
          countdown.innerText="🎉";
          setTimeout(()=>{ countdown.remove(); showSlide(slides[currentSlide]); },800);
        }
      },1000);
    });

    selectBtn.addEventListener("click", ()=>{
      clearInterval(typingInterval);
      clearTimeout(nextSlideTimeout);
      clearTimeout(finalQuestionTimeout);
      slideStarted=false;
      currentSlide=0;
      title.style.display="block";
      subtitle.innerText="Press Start Button 👾";
      subtitle.style.whiteSpace="";
      subtitle.style.overflowY="unset";
      subtitle.style.maxHeight="";
      subtitle.scrollTop=0;
      bgMusic.pause(); bgMusic.currentTime=0;
    });

    function showSlide(text){
      subtitle.innerText="";
      subtitle.style.whiteSpace="normal";
      subtitle.style.overflowY="auto";
      subtitle.style.maxHeight="100px";
      const words=text.split(" ");
      let i=0;
      typingInterval = setInterval(()=>{
        if(!slideStarted){ clearInterval(typingInterval); return; }
        if(i<words.length){ subtitle.innerHTML+=words[i]+" "; i++; subtitle.scrollTop=subtitle.scrollHeight; }
        else{
          clearInterval(typingInterval);
          if(!slideStarted) return;
          if(currentSlide<slides.length-1){
            nextSlideTimeout=setTimeout(()=>{ currentSlide++; showSlide(slides[currentSlide]); },1500);
          } else{
            finalQuestionTimeout=setTimeout(()=>{
              subtitle.innerHTML += "<br><br><strong>Mau main mini games?</strong><br>Tekan <strong>A</strong> untuk YA, <strong>B</strong> untuk TIDAK.";
              initChoiceEvents();
            },1500);
          }
        }
      },300);
    }

    function initChoiceEvents(){
      btnA.addEventListener("click", handleClickA);
      btnB.addEventListener("click", handleClickB);
      document.addEventListener("keydown", onChoice);
    }

    function onChoice(e){ 
      if(!slideStarted) return; 
      if(e.key.toLowerCase()==="a") handleClickA(); 
      else if(e.key.toLowerCase()==="b") handleClickB(); 
    }

    function handleClickA(){ cleanupChoiceEvents(); startCatGame(); }
    function handleClickB(){ cleanupChoiceEvents(); subtitle.innerHTML="Wah parah si kalo nggak dilanjut-_-!"; }

    function cleanupChoiceEvents(){ 
      document.removeEventListener("keydown", onChoice); 
      btnA.removeEventListener("click", handleClickA); 
      btnB.removeEventListener("click", handleClickB); 
    }

    function startCatGame(){
      const screen = document.querySelector(".screen");
      const subtitle = document.querySelector(".subtitle");
      screen.innerHTML="";
      subtitle.innerText="";
      const gameArea = document.createElement("div");
      gameArea.style.position="relative"; gameArea.style.width="100%"; gameArea.style.height="120px";
      gameArea.style.background="#000"; gameArea.style.border="2px solid #00ffff"; gameArea.style.borderRadius="10px";
      screen.appendChild(gameArea);
      const scoreDiv = document.createElement("div");
      scoreDiv.style.color="#00ffcc"; scoreDiv.style.marginTop="10px"; screen.appendChild(scoreDiv);
      const player = document.createElement("div"); player.innerText="😾"; player.style.position="absolute"; player.style.left="10px"; player.style.top="50px"; player.style.fontSize="24px"; gameArea.appendChild(player);
      const cat = document.createElement("div"); cat.innerText="🐱"; cat.style.position="absolute"; cat.style.fontSize="24px"; gameArea.appendChild(cat);

      let score=0, target=5, gameOver=false;
      function updateScore(){ scoreDiv.innerText=`Tangkap: ${score}/${target}`; }
      function randomCatPosition(){ const maxX=gameArea.clientWidth-24; const maxY=gameArea.clientHeight-24; cat.style.left=Math.floor(Math.random()*maxX)+"px"; cat.style.top=Math.floor(Math.random()*maxY)+"px"; }
      randomCatPosition(); updateScore();

      const catInterval = setInterval(()=>{
        if(!gameOver) randomCatPosition();
      },1000);

      function movePlayer(dx,dy){
        if(gameOver) return;
        const newX=Math.min(Math.max(player.offsetLeft+dx,0), gameArea.clientWidth-24);
        const newY=Math.min(Math.max(player.offsetTop+dy,0), gameArea.clientHeight-24);
        player.style.left=newX+"px"; player.style.top=newY+"px";
        if(Math.abs(newX-cat.offsetLeft)<24 && Math.abs(newY-cat.offsetTop)<24){
          score++; updateScore();
          if(score>=target){ gameOver=true; clearInterval(catInterval); handleWin(); }
          else randomCatPosition();
        }
      }

      document.addEventListener("keydown", function(e){
        if(e.key==="ArrowUp") movePlayer(0,-10);
        else if(e.key==="ArrowDown") movePlayer(0,10);
        else if(e.key==="ArrowLeft") movePlayer(-10,0);
        else if(e.key==="ArrowRight") movePlayer(10,0);
      });

      document.querySelector(".dpad .up").onclick = ()=>movePlayer(0,-10);
      document.querySelector(".dpad .down").onclick = ()=>movePlayer(0,10);
      document.querySelector(".dpad .left").onclick = ()=>movePlayer(-10,0);
      document.querySelector(".dpad .right").onclick = ()=>movePlayer(10,0);

      function handleWin(){
        subtitle.innerHTML="🎉 Mantap Mikaa, kocengnya dah ditangkap semua";
        gameArea.style.transition="opacity 0.8s ease"; scoreDiv.style.transition="opacity 0.8s ease";
        gameArea.style.opacity=0; scoreDiv.style.opacity=0;
        setTimeout(()=>{
          gameArea.remove(); scoreDiv.remove();
          subtitle.innerHTML="<strong>Cihuyy! Kamu mendapatkan hadiah 🎁</strong><br><br>Tekan <strong>A</strong> untuk AMBIL, <strong>B</strong> untuk TIDAK";
          function onRewardChoice(e){ if(e.key.toLowerCase()==="a") takeGift(); else if(e.key.toLowerCase()==="b") declineGift(); }
          function handleClickA(){ takeGift(); }
          function handleClickB(){ declineGift(); }
          document.addEventListener("keydown", onRewardChoice);
          btnA.addEventListener("click", handleClickA);
          btnB.addEventListener("click", handleClickB);
          function cleanupRewardEvents(){ document.removeEventListener("keydown",onRewardChoice); btnA.removeEventListener("click",handleClickA); btnB.removeEventListener("click",handleClickB); }
          function takeGift(){ cleanupRewardEvents(); subtitle.innerHTML="🎁 Widiiii dapat hadiah nihh"; confetti({particleCount:100,spread:70,origin:{y:0.6}}); screen.innerHTML=""; 
            const ytContainer=document.createElement("div"); ytContainer.style.width="100%"; ytContainer.style.height="100%"; ytContainer.style.display="flex"; ytContainer.style.justifyContent="center"; ytContainer.style.alignItems="center";
            const ytFrame=document.createElement("iframe");
            ytFrame.src="https://www.youtube.com/embed/3_QLj6S7cdQ?autoplay=1";
            ytFrame.style.width="90%"; ytFrame.style.height="90%"; ytFrame.style.border="0"; ytFrame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            ytFrame.allowFullscreen=true; ytFrame.style.borderRadius="10px";
            ytContainer.appendChild(ytFrame); screen.appendChild(ytContainer);
          }
          function declineGift(){ cleanupRewardEvents(); subtitle.innerHTML="Waduhh hadiahnya ketinggalan Mik"; }
        },800);
      }
    }

  }

});
