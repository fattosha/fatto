
if (window.location.search) {
    const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanURL }, '', cleanURL);
}
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
const text = [
  "Menna Khalid",
  "Nickname: Fattosh",
  "3rd Year • CIS • Mansoura",
  "IT Student"
];

const typingText = document.getElementById("typing-text");
let line = 0;
let char = 0;

function type() {
  if (line >= text.length) return;

  if (char < text[line].length) {
    typingText.innerHTML += text[line][char];
    char++;
    setTimeout(type, 55);
  } else if (line < text.length - 1) {

        typingText.innerHTML += "<br>";

        line++;
        char = 0;

        setTimeout(type, 250);

    } else {

        return;
    }
}


type();
const aboutSection = document.querySelector(".fattosh-about");



const fattoshFlip = document.getElementById("fattoshFlip");

if (fattoshFlip) {
  fattoshFlip.addEventListener("click", function () {
    this.classList.toggle("is-flipped");
  });
}

const track = document.querySelector(".certificates-track");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = index;

  if (track) {
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
  }

  dots.forEach(function (dot, i) {
    if (i === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

let sliderTimer = setInterval(function () {
  currentSlide++;

  if (currentSlide >= dots.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}, 3500);

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    showSlide(index);

    clearInterval(sliderTimer);

    sliderTimer = setInterval(function () {
      currentSlide++;

      if (currentSlide >= dots.length) {
        currentSlide = 0;
      }

      showSlide(currentSlide);
    }, 3500);
  });
});

const journeyItems = document.querySelectorAll(".journey-item");
const journeyDots = document.querySelectorAll(".journey-line span");

journeyItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    journeyItems.forEach((el) => {
      el.classList.remove("active");
    });

    journeyDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    item.classList.add("active");

    if (journeyDots[index]) {
      journeyDots[index].classList.add("active");
    }
  });
});

    // Contact Form
let form = document.getElementById("contactForm");
let successMessage = document.querySelector(".success-message");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // no reload

        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let subjectInput = document.getElementById("subject");
        let messageInput = document.getElementById("message");
        let sendButton = form.querySelector(".send-button");

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let subject = subjectInput.value.trim();
        let message = messageInput.value.trim();

        let isNameValid = /^[A-Za-z\u0600-\u06FF\s]{3,30}$/.test(name);
        let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        let isSubjectValid = subject.length >= 3;
        let isMessageValid = message.length >= 10 && message.length <= 500;

        // Clear previous errors
        form.querySelectorAll(".error-message").forEach(function (error) {
            error.textContent = "";
        });

        if (!isNameValid) {
            nameInput.nextElementSibling.textContent =
                "Name must contain only letters and be 3-30 characters.";
            nameInput.focus();
            return;
        }

        if (!isEmailValid) {
            emailInput.nextElementSibling.textContent =
                "Please enter a valid email address.";
            emailInput.focus();
            return;
        }

        if (!isSubjectValid) {
            subjectInput.nextElementSibling.textContent =
                "Subject must be at least 3 characters.";
            subjectInput.focus();
            return;
        }

        if (!isMessageValid) {
            messageInput.nextElementSibling.textContent =
                "Message must be between 10 and 500 characters.";
            messageInput.focus();
            return;
        }

        sendButton.disabled = true;
        sendButton.innerHTML = "<span>SENDING...</span><b>↗</b>";

        fetch("https://formsubmit.co/ajax/mnhk32134@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(function (response) {
            return response.json().then(function (data) {
                if (!response.ok || data.success === false) {
                    throw new Error(data.message || "Something went wrong.");
                }

                return data;
            });
        })
        .then(function () {

            if (successMessage) {
                successMessage.innerHTML =
                    "<span>✦</span> Your message has been sent successfully.";

                successMessage.classList.add("show");

                setTimeout(function () {
                    successMessage.classList.remove("show");
                }, 5000);
            }

            form.reset();
        })
        .catch(function (error) {

            console.error("FormSubmit Error:", error);

            if (successMessage) {
                successMessage.innerHTML =
                    "<span>✦</span> Something went wrong. Please try again.";

                successMessage.classList.add("show");

                setTimeout(function () {
                    successMessage.classList.remove("show");
                }, 5000);
            }
        })
        .finally(function () {

            sendButton.disabled = false;
            sendButton.innerHTML = "<span>SEND IT</span><b>↗</b>";
        });
    });
}

const whatsappLink = document.querySelector('.footer-links a[href*="wa.me"]');

if (whatsappLink) {
  whatsappLink.addEventListener("click", function (e) {
    e.preventDefault();

    const message =
      "Hi! I came across your portfolio and I'd love to discuss a project with you.";

    const whatsappUrl =
      "https://wa.me/201206175080?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const services = document.querySelectorAll(".service");

  services.forEach((service) => {
    service.addEventListener("click", () => {

      if (service.classList.contains("active")) {
        service.classList.remove("active");
        document.body.classList.remove("service-open");

        const placeholder = service._placeholder;

        if (placeholder) {
          placeholder.parentNode.insertBefore(service, placeholder);
          placeholder.remove();
          service._placeholder = null;
        }

        service.style.position = "";
        service.style.left = "";
        service.style.top = "";
        service.style.width = "";
        service.style.height = "";
        service.style.zIndex = "";

        return;
      }

      services.forEach((item) => {
        if (item !== service) {
          item.classList.remove("active");

          if (item._placeholder) {
            item._placeholder.parentNode.insertBefore(
              item,
              item._placeholder
            );

            item._placeholder.remove();
            item._placeholder = null;
          }

          item.style.position = "";
          item.style.left = "";
          item.style.top = "";
          item.style.width = "";
          item.style.height = "";
          item.style.zIndex = "";
        }
      });

      const rect = service.getBoundingClientRect();

      const placeholder = document.createElement("div");

      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;

      service.parentNode.insertBefore(placeholder, service);
      service._placeholder = placeholder;

      document.body.appendChild(service);

      service.style.position = "fixed";
      service.style.left = "50%";
      service.style.top = "50%";
      service.style.width = "min(500px, 85vw)";
      service.style.height = "";
      service.style.zIndex = "10001";

      document.body.classList.add("service-open");

      requestAnimationFrame(() => {
        service.classList.add("active");
      });
    });
  });
});
const langEn = document.getElementById("lang-en");
const langAr = document.getElementById("lang-ar");

function setLanguage(lang) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) {
        setTimeout(() => setLanguage(lang), 300);
        return;
    }

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    langEn.classList.toggle("active", lang === "en");
    langAr.classList.toggle("active", lang === "ar");

    localStorage.setItem("language", lang);
}

langEn.addEventListener("click", () => {
    setLanguage("en");
});

langAr.addEventListener("click", () => {
    setLanguage("ar");
});

function setLanguage(lang) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) {
        setTimeout(() => setLanguage(lang), 500);
        return;
    }

    select.value = lang === "ar" ? "ar" : "en";
    select.dispatchEvent(new Event("change"));

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    langEn.classList.toggle("active", lang === "en");
    langAr.classList.toggle("active", lang === "ar");
}
document.getElementById("lang-ar").addEventListener("click", () => {
    document.documentElement.lang = "ar";
    document.documentElement.classList.remove("notranslate");

    const meta = document.querySelector('meta[name="google"][content="notranslate"]');
    if (meta) meta.remove();

    setLanguage("ar");
});
const customTranslations = {
    "Nickname:": "الاسم المستعار:",
    "CIS": "الحاسبات و المعلومات",
}
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("about-ignite");
                    observer.unobserve(aboutSection);
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    aboutObserver.observe(aboutSection);
}
const sushiBoard = document.getElementById("sushi-board");
const sushi = document.getElementById("sushi-player");
const paddle = document.getElementById("sushi-paddle");
const scoreElement = document.getElementById("sushi-score");
const livesElement = document.getElementById("sushi-lives");
const gameOverScreen = document.getElementById("sushi-game-over");
const restartButton = document.getElementById("sushi-restart");

let score = 0;
let lives = 3;
let gameRunning = true;

let sushiX = 0;
let sushiY = 80;

let velocityX = 3;
let velocityY = 3;

let paddleX = 0;
let animationFrame;

const sushiSize = 42;

function resetGame() {
    const boardWidth = sushiBoard.clientWidth;

    score = 0;
    lives = 3;
    gameRunning = true;

    scoreElement.textContent = score;
    livesElement.textContent = lives;

    sushiX = boardWidth / 2 - sushiSize / 2;
    sushiY = 80;

    velocityX = Math.random() > 0.5 ? 3 : -3;
    velocityY = 3;

    paddleX = boardWidth / 2 - paddle.offsetWidth / 2;
    paddle.style.left = `${paddleX}px`;
    paddle.style.transform = "none";

    sushi.style.left = `${sushiX}px`;
    sushi.style.top = `${sushiY}px`;

    gameOverScreen.classList.remove("show");

    cancelAnimationFrame(animationFrame);
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    const boardWidth = sushiBoard.clientWidth;
    const boardHeight = sushiBoard.clientHeight;
    const paddleWidth = paddle.offsetWidth;

    sushiX += velocityX;
    sushiY += velocityY;

    if (sushiX <= 0) {
        sushiX = 0;
        velocityX *= -1;
    }

    if (sushiX + sushiSize >= boardWidth) {
        sushiX = boardWidth - sushiSize;
        velocityX *= -1;
    }

    if (sushiY <= 0) {
        sushiY = 0;
        velocityY *= -1;
    }

    const paddleTop = boardHeight - 22 - paddle.offsetHeight;

    const sushiBottom = sushiY + sushiSize;
    const sushiCenterX = sushiX + sushiSize / 2;

    if (
        velocityY > 0 &&
        sushiBottom >= paddleTop &&
        sushiY <= paddleTop + paddle.offsetHeight &&
        sushiCenterX >= paddleX &&
        sushiCenterX <= paddleX + paddleWidth
    ) {
        sushiY = paddleTop - sushiSize;
        velocityY *= -1;

        score++;
        scoreElement.textContent = score;

        const speed = 3 + Math.min(score * 0.08, 3);

        velocityX = velocityX > 0 ? speed : -speed;
        velocityY = -Math.abs(velocityY);

        if (Math.abs(velocityY) < speed) {
            velocityY = -speed;
        }
    }

    if (sushiY > boardHeight) {
        lives--;
        livesElement.textContent = lives;

        if (lives <= 0) {
            endGame();
            return;
        }

        sushiX = boardWidth / 2 - sushiSize / 2;
        sushiY = 80;

        velocityX = Math.random() > 0.5 ? 3 : -3;
        velocityY = 3;
    }

    sushi.style.left = `${sushiX}px`;
    sushi.style.top = `${sushiY}px`;

    animationFrame = requestAnimationFrame(gameLoop);
}

function movePaddle(clientX) {
    const rect = sushiBoard.getBoundingClientRect();
    const paddleWidth = paddle.offsetWidth;

    paddleX = clientX - rect.left - paddleWidth / 2;

    const maxX = sushiBoard.clientWidth - paddleWidth;

    paddleX = Math.max(0, Math.min(paddleX, maxX));

    paddle.style.left = `${paddleX}px`;
}

document.addEventListener("keydown", function (event) {
    if (!gameRunning) return;

    const step = 35;

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePaddle(
            sushiBoard.getBoundingClientRect().left +
            paddleX +
            paddle.offsetWidth / 2 -
            step
        );
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        movePaddle(
            sushiBoard.getBoundingClientRect().left +
            paddleX +
            paddle.offsetWidth / 2 +
            step
        );
    }
});

sushiBoard.addEventListener("pointermove", function (event) {
    if (event.pointerType === "touch" || event.pointerType === "mouse") {
        movePaddle(event.clientX);
    }
});

sushiBoard.addEventListener("touchmove", function (event) {
    event.preventDefault();

    if (event.touches.length > 0) {
        movePaddle(event.touches[0].clientX);
    }
}, { passive: false });

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationFrame);
    gameOverScreen.classList.add("show");
}

restartButton.addEventListener("click", resetGame);

window.addEventListener("resize", function () {
    const maxX = sushiBoard.clientWidth - paddle.offsetWidth;

    paddleX = Math.max(0, Math.min(paddleX, maxX));
    paddle.style.left = `${paddleX}px`;
});

resetGame();
