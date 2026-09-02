
if (window.location.search) {
    const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanURL }, '', cleanURL);
}
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

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

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true
  });

  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const successMessage = form.querySelector(".success-message");
  const sendButton = form.querySelector(".send-button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    clearErrors();

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required.");
      isValid = false;
    } else if (
      !/^[A-Za-z\u0600-\u06FF\s]{3,30}$/.test(nameInput.value.trim())
    ) {
      showError(
        nameInput,
        "Name must contain only letters and be 3-30 characters."
      );
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required.");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())
    ) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    if (subjectInput.value.trim() === "") {
      showError(subjectInput, "Subject is required.");
      isValid = false;
    } else if (subjectInput.value.trim().length < 3) {
      showError(subjectInput, "Subject must be at least 3 characters.");
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      showError(messageInput, "Please leave a message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters.");
      isValid = false;
    } else if (messageInput.value.trim().length > 500) {
      showError(messageInput, "Message cannot exceed 500 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    sendButton.disabled = true;
    sendButton.innerHTML = "<span>SENDING...</span><b>↗</b>";

    fetch("https://formsubmit.co/ajax/mnhk32134@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      })
    })
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => {
        console.error("Error sending message:", error);
      })
      .finally(() => {
        sendButton.disabled = false;
        sendButton.innerHTML = "<span>SEND IT</span><b>↗</b>";
      });
  });

  function showError(input, message) {
    if (!input) return;

    input.classList.add("is-invalid");

    const field = input.closest(".field");

    if (!field) return;

    field.classList.add("error");

    const error = field.querySelector(".error-message");

    if (error) {
      error.textContent = message;
    }
  }

  function clearErrors() {
    form.querySelectorAll(".error-message").forEach(function (error) {
      error.textContent = "";
    });

    form.querySelectorAll(".field").forEach(function (field) {
      field.classList.remove("error");
    });

    form.querySelectorAll("input,textarea").forEach(function (input) {
      input.classList.remove("is-invalid");
    });
  }

  form.querySelectorAll("input,textarea").forEach(function (input) {
    input.addEventListener("input", function () {
      const field = this.closest(".field");

      if (field) {
        field.classList.remove("error");

        const error = field.querySelector(".error-message");

        if (error) {
          error.textContent = "";
        }
      }

      this.classList.remove("is-invalid");
    });
  });
});

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
