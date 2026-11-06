// Data poznania: 1 października 2026, godzina 12:00.
// Jeśli pamiętacie inną godzinę, zmień 12, 0, 0 na właściwą.
const startDate = new Date(2026, 9, 1, 12, 0, 0);

const heartButton = document.getElementById("heartButton");
const heartIcon = document.getElementById("heartIcon");
const hint = document.getElementById("hint");
const counterCard = document.getElementById("counterCard");
const surpriseCard = document.getElementById("surpriseCard");
const toast = document.getElementById("toast");

let isOpen = false;
let toastTimer;

function updateCounter() {
  const now = new Date();
  const difference = now - startDate;

  if (difference < 0) {
    document.getElementById("days").textContent = "—";
    document.getElementById("hours").textContent = "—";
    document.getElementById("minutes").textContent = "—";
    document.getElementById("seconds").textContent = "—";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days.toLocaleString("pl-PL");
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

function showToast() {
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

heartButton.addEventListener("click", () => {
  isOpen = !isOpen;
  counterCard.classList.toggle("show", isOpen);
  surpriseCard.classList.toggle("show", isOpen);
  heartIcon.textContent = isOpen ? "💖" : "❤️";
  hint.textContent = isOpen
    ? "Nasza historia jest najpiękniejsza 💞"
    : "Kliknij serduszko, kochanie";

  if (isOpen) {
    updateCounter();
    showToast();
    launchHearts(18);
  }
});

function launchHearts(amount = 1) {
  const holder = document.getElementById("floatingHearts");
  const symbols = ["💗", "💕", "💖", "💘", "♡"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "floating-heart";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}vw`;
    item.style.fontSize = `${14 + Math.random() * 24}px`;
    item.style.animationDuration = `${5 + Math.random() * 5}s`;
    item.style.animationDelay = `${Math.random() * 1.2}s`;
    holder.appendChild(item);
    item.addEventListener("animationend", () => item.remove());
  }
}

// Delikatne serduszka unoszą się w tle.
setInterval(() => launchHearts(1), 650);
setInterval(() => {
  if (isOpen) updateCounter();
}, 1000);

updateCounter();
