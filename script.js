
/* =========================================
   ELEMENTOS PRINCIPALES
   BODA CELINA Y FRANCO
========================================= */

const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const welcomeScreen = document.getElementById("welcomeScreen");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicToggle");
const weddingVideo = document.getElementById("weddingVideo");


/* =========================================
   FUNCIONES DE CONTROL DE MUSICA
========================================= */

function updateMusicButton() {
    if (!musicButton || !music) return;

    musicButton.classList.toggle("playing", !music.paused);

    musicButton.setAttribute(
        "aria-label",
        music.paused ? "Reproducir música" : "Pausar música"
    );
}

function pauseMusic() {
    if (!music) return;

    music.pause();
    updateMusicButton();
}

function playMusic() {
    if (!music || document.hidden) return;

    music.play()
        .then(() => {
            updateMusicButton();
        })
        .catch(error => {
            console.error("No se pudo reproducir la música:", error);
            updateMusicButton();
        });
}


/* =========================================
   APERTURA DEL SOBRE Y MUSICA
========================================= */

if (envelope) {

    envelope.addEventListener("click", function () {
        if (envelope.classList.contains("open")) return;
        createGoldParticles();

        if (envelope.classList.contains("open")) return;

        // Reproducir música al abrir el sobre
        if (music) {
            music.volume = 0.35;
            playMusic();
        }

        // Animación del sobre
        envelope.classList.add("open");

        setTimeout(() => {

            if (envelopeScreen) {
                envelopeScreen.style.opacity = "0";
            }

            setTimeout(() => {

                if (envelopeScreen) {
                    envelopeScreen.remove();
                }

                if (welcomeScreen) {
                    welcomeScreen.style.display = "flex";
                    welcomeScreen.classList.add("show");
                }

                document.body.classList.add("invitation-open");
                window.scrollTo(0, 0);

            }, 1000);

        }, 1800);

    });

}


/* =========================================
   VISOR DE FOTOGRAFIAS
========================================= */

(() => {

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    const counter = document.getElementById("lightboxCounter");

    const photos = Array.from(
        document.querySelectorAll('[data-gallery="true"]')
    );

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !prevButton ||
        !nextButton ||
        !counter ||
        photos.length === 0
    ) {
        return;
    }

    let currentIndex = 0;

    function showPhoto(index) {

        currentIndex = (index + photos.length) % photos.length;

        const selectedPhoto = photos[currentIndex];

        lightboxImage.src = selectedPhoto.src;
        lightboxImage.alt = selectedPhoto.alt;

        counter.textContent =
            `${currentIndex + 1} de ${photos.length}`;

    }

    function openGallery(index) {

        showPhoto(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }

    function closeGallery() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

    photos.forEach((photo, index) => {

        photo.addEventListener("click", () => {
            openGallery(index);
        });

    });

    closeButton.addEventListener("click", closeGallery);

    prevButton.addEventListener("click", () => {
        showPhoto(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showPhoto(currentIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeGallery();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeGallery();
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

    });

})();


/* =========================================
   CUENTA REGRESIVA
   BODA CELINA Y FRANCO
========================================= */

(() => {

    const weddingDate = new Date(
        "2026-12-19T14:00:00-04:00"
    ).getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    function updateCountdown() {

        const now = Date.now();
        const difference = weddingDate - now;

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            const heading = document.querySelector(
                ".countdown-heading"
            );

            if (heading) {
                heading.textContent =
                    "¡Hoy celebramos nuestro amor!";
            }

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

})();


/* =========================================
   CONFIRMACION POR WHATSAPP
   CELINA Y FRANCO
========================================= */

(() => {

    const form = document.getElementById("rsvpForm");

    if (!form) return;

    const whatsappButtons = document.querySelectorAll(
        ".whatsapp-button"
    );

    const contacts = {
        franco: "59175626193",
        celina: "59163550258"
    };

    whatsappButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name = document
                .getElementById("guestName")
                .value.trim();

            const attendance = document
                .getElementById("attendance")
                .value;

            const guestCount = document
                .getElementById("guestCount")
                .value;

            if (!name || !attendance || !guestCount) {

                alert(
                    "Por favor, completa todos los campos antes de confirmar."
                );

                return;
            }

            const contact = button.dataset.contact;
            const phone = contacts[contact];

            if (!phone) return;

            const message =
                `¡Hola! Soy ${name}.\n\n` +
                `Confirmación para la boda de Celina y Franco:\n` +
                `Asistencia: ${attendance}\n` +
                `Cantidad de personas: ${guestCount}\n\n` +
                `¡Muchas gracias!`;

            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    });

})();


/* =========================================
   CONTROL DEL BOTON DE MUSICA
========================================= */

if (music && musicButton) {

    musicButton.addEventListener("click", () => {

        if (music.paused) {
            playMusic();
        } else {
            pauseMusic();
        }

    });

}


/* =========================================
   CONTROL DE MUSICA Y VIDEO
========================================= */

let musicWasPlayingBeforeVideo = false;

if (music && weddingVideo) {

    // Cuando comienza el video
    weddingVideo.addEventListener("play", () => {

        musicWasPlayingBeforeVideo = !music.paused;

        pauseMusic();

    });

    // Función para reanudar la música
    function resumeBackgroundMusic() {

        if (
            musicWasPlayingBeforeVideo &&
            !document.hidden
        ) {
            playMusic();
        }

        musicWasPlayingBeforeVideo = false;

    }

    // Cuando termina el video
    weddingVideo.addEventListener("ended", () => {
        resumeBackgroundMusic();
    });

    // Cuando el visitante pausa el video
    weddingVideo.addEventListener("pause", () => {

        // Esperar para comprobar si terminó
        if (weddingVideo.ended) return;

        resumeBackgroundMusic();

    });

}


/* =========================================
   DETENER MUSICA AL SALIR O CAMBIAR DE PESTAÑA
========================================= */

// Al ocultar la página, detener la música.
document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        // Guardar si la música estaba sonando
        musicWasPlayingBeforeVideo = music && !music.paused;

        pauseMusic();

    } else {

        // Reanudar al regresar si estaba sonando
        // y no hay un video reproduciéndose
        if (
            music &&
            musicWasPlayingBeforeVideo &&
            (!weddingVideo || weddingVideo.paused)
        ) {
            playMusic();
        }

    }

});

// Al abandonar o descargar la página.
window.addEventListener("pagehide", () => {

    pauseMusic();

});

// Respaldo para navegación o cierre de página.
window.addEventListener("beforeunload", () => {

    pauseMusic();

});


/* =========================================
   SISTEMA DE ANIMACIONES AL DESPLAZARSE
   BODA CELINA Y FRANCO
========================================= */

(() => {

    const revealGroups = [
        ".history-heading",
        ".history-description",
        ".history-photo-frame",
        ".history-names",
        ".history-message",
        ".history-date",

        ".gallery-heading",
        ".gallery-featured",
        ".gallery-item",
        ".gallery-note-card",
        ".gallery-footer",

        ".video-heading",
        ".video-frame",
        ".video-footer",

        ".event-heading",
        ".event-date",
        ".countdown-heading",
        ".countdown-item",
        ".event-card",
        ".event-footer",

        ".rsvp-heading",
        ".rsvp-card",
        ".thanks-container"
    ];

    // Preparar los elementos para la animación
    revealGroups.forEach(selector => {

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.classList.add("reveal-item");

            // Aparición escalonada
            const delay = Math.min(index * 110, 550);

            element.style.setProperty(
                "--reveal-delay",
                `${delay}ms`
            );

        });

    });

    const revealItems = document.querySelectorAll(".reveal-item");

    // Compatibilidad con navegadores sin IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    // Detectar cuándo entra cada elemento en pantalla
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                // Animar solamente la primera vez
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
    });

    revealItems.forEach(element => {
        observer.observe(element);
    });

})();


/* =====================================
   PARTICULAS DORADAS AL ABRIR EL SOBRE
===================================== */

function createGoldParticles() {
    const container = document.getElementById("goldParticles");

    if (!container) return;

    const numberOfParticles = 35;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("span");

        particle.classList.add("gold-particle");

        const angle = Math.random() * Math.PI * 2;
        const distance = 70 + Math.random() * 180;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        particle.style.setProperty("--move-x", `${moveX}px`);
        particle.style.setProperty("--move-y", `${moveY}px`);
        particle.style.setProperty("--size", `${3 + Math.random() * 5}px`);
        particle.style.setProperty("--duration", `${1.5 + Math.random() * 1.5}s`);

        container.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        });
    }
}
