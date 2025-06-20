window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  const video = document.getElementById("videoDelia");
  const lagu1 = document.getElementById("lagu1");
  const lagu2 = document.getElementById("lagu2");
  const hbd = document.querySelector('.hbd');
  const notePopup = document.getElementById("notePopup");
  const closeNote = document.getElementById("closeNote");
  const hbdBanner = document.querySelector(".hbd-banner");

  // Fungsi spawn ribbons
  function spawnRibbons() {
    const ribbonCount = 15;
    for (let i = 0; i < ribbonCount; i++) {
      createRibbon(i * 300);
    }
  }

  function createRibbon(delay) {
    setTimeout(() => {
      const ribbon = document.createElement('div');
      ribbon.classList.add('ribbon');

      const side = Math.random() > 0.5 ? 'left' : 'right';
      const posX = Math.random() * (window.innerWidth / 2 - 30);

      ribbon.style[side] = posX + 'px';
      ribbon.style.top = '-40px';
      ribbon.style.animationDuration = (3 + Math.random() * 3) + 's';

      document.body.appendChild(ribbon);

      setTimeout(() => {
        ribbon.remove();
        createRibbon(0);
      }, parseFloat(ribbon.style.animationDuration) * 1000);
    }, delay);
  }

  // Deteksi iOS untuk fallback tombol play manual
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // Buat tombol play manual dan sembunyikan dulu
    const btnPlay = document.createElement('button');
    btnPlay.textContent = "Tap to Play Music 🎵";
    Object.assign(btnPlay.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px 30px',
      fontSize: '18px',
      background: '#ff85c0',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      zIndex: 9999,
      display: 'none',
    });
    document.body.appendChild(btnPlay);

    btnPlay.addEventListener('click', () => {
      lagu1.play().then(() => {
        btnPlay.style.display = 'none';
        console.log("Lagu1 started by manual tap");
      }).catch(console.error);
    });

    window.showManualPlayButton = () => {
      btnPlay.style.display = 'block';
    };
  } else {
    window.showManualPlayButton = () => {}; // no-op for non-iOS
  }

  // Fungsi openPage2 dipanggil saat klik amplop
  window.openPage2 = function(el) {
    el.classList.add("envelope-clicked");

    // Coba mainkan lagu langsung di sini tanpa delay
    if (lagu1 && lagu2) {
      lagu1.volume = 0.2;
      lagu2.volume = 0.2;

      lagu1.play().then(() => {
        console.log("Lagu1 started");
      }).catch(err => {
        console.log("Autoplay error, show manual play button");
        window.showManualPlayButton();
      });

      lagu1.addEventListener("ended", () => {
        lagu2.play().catch(err => console.log("Lagu2 error:", err));
      });
    }

    setTimeout(() => {
      document.getElementById("page1").classList.remove("active");
      document.getElementById("page2").classList.add("active");
      spawnRibbons();

      if (hbd) hbd.classList.add('animate');
    }, 1500);
  };


  // Fungsi show popup dengan fade in/out
  window.showPopup = function() {
    popup.style.display = "flex";
    popup.classList.remove("fade-out");

    // Hilangkan popup setelah 10 detik dengan efek fade out
    setTimeout(() => {
      popup.classList.add("fade-out");
    }, 10000);
  };

  // Event tombol close popup (pastikan ada tombol close di HTML dengan id closePopup)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.add("fade-out");
    });
  }

  // Event setelah animasi fadeOut selesai, sembunyikan popup
  if (popup) {
    popup.addEventListener("animationend", (e) => {
      if (e.animationName === "fadeOut" && popup.classList.contains("fade-out")) {
        popup.style.display = "none";
        popup.classList.remove("fade-out");
      }
    });
  }

  // Setup video loop manual
  if (video) {
    video.play().catch(err => console.log("Autoplay error:", err));

    video.addEventListener("ended", () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 50);
    });
  }

  // Sticky Note muncul saat gambar Happy Birthday diklik
  if (hbdBanner) {
    hbdBanner.addEventListener("click", () => {
      notePopup.style.display = "block";
      notePopup.classList.remove("fade-out");
      notePopup.style.animation = "noteIn 0.4s ease-out forwards";
    });
  }

  if (closeNote) {
    closeNote.addEventListener("click", () => {
      notePopup.style.animation = "noteOut 0.3s ease-in forwards";
    });
  }

  if (notePopup) {
    notePopup.addEventListener("animationend", (e) => {
      if (e.animationName === "noteOut") {
        notePopup.style.display = "none";
      }
    });
  }

});
