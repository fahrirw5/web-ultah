window.addEventListener("DOMContentLoaded", () => {
  // Ambil elemen-elemen penting
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  const video = document.getElementById("videoDelia");
  const lagu1 = document.getElementById("lagu1");
  const lagu2 = document.getElementById("lagu2");
  const hbd = document.querySelector('.hbd');
  const notePopup = document.getElementById("notePopup");
  const closeNote = document.getElementById("closeNote");
  const hbdBanner = document.querySelector(".hbd-banner");
  

  // Fungsi spawn pita
  function spawnRibbons() {
    const ribbonCount = 15; // jumlah pita
    for (let i = 0; i < ribbonCount; i++) {
      createRibbon(i * 300); // delay tiap 300ms
    }
  }

  function createRibbon(delay) {
    setTimeout(() => {
      const ribbon = document.createElement('div');
      ribbon.classList.add('ribbon');

      // Pilih kiri atau kanan acak
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const posX = Math.random() * (window.innerWidth / 2 - 30);

      ribbon.style[side] = posX + 'px';
      ribbon.style.top = '-40px';
      ribbon.style.animationDuration = (3 + Math.random() * 3) + 's';

      document.body.appendChild(ribbon);

      setTimeout(() => {
        ribbon.remove();
        createRibbon(0); // ulang terus
      }, parseFloat(ribbon.style.animationDuration) * 1000);
    }, delay);
  }

  // Fungsi buka halaman 2 setelah klik amplop
  window.openPage2 = function(el) {
    el.classList.add("envelope-clicked");

    setTimeout(() => {
      document.getElementById("page1").classList.remove("active");
      document.getElementById("page2").classList.add("active");

      spawnRibbons();

      if (lagu1 && lagu2) {
      lagu1.volume = 0.2;
      lagu2.volume = 0.2;

      // Mulai mainkan lagu1 setelah klik amplop
      lagu1.play().catch(err => console.log("Lagu 1 error:", err));

      // Saat lagu1 selesai, mainkan lagu2 yang loop
      const onLagu1Ended = () => {
        lagu2.play().catch(err => console.log("Lagu 2 error:", err));
        lagu1.removeEventListener("ended", onLagu1Ended);
      };
      lagu1.addEventListener("ended", onLagu1Ended);
    }

    if (hbd) {
      hbd.classList.add('animate');
    }
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
