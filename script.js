const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");

const question = document.getElementById("question");
const success = document.getElementById("success");
const hint = document.getElementById("hint");

let yesScale = 1;
let noAttempts = 0;

const messages = [
    "Are you really sure? 🥺",
    "Think about it again! 💗",
    "Come on, give me a chance! 😭",
    "That button is getting shy! 🙈",
    "You know you want to say YES! 💕"
];

function dodgeNoButton() {
    noAttempts++;

    const area = document.querySelector(".buttons");
    const maxX = area.clientWidth - noButton.offsetWidth;
    const maxY = 55;

    noButton.style.position = "absolute";

    noButton.style.left =
        Math.random() * Math.max(0, maxX) + "px";

    noButton.style.top =
        (Math.random() * maxY - 12) + "px";

    yesScale = Math.min(1 + noAttempts * 0.13, 2.15);

    yesButton.style.transform = `scale(${yesScale})`;

    hint.textContent =
        messages[Math.min(noAttempts - 1, messages.length - 1)];
}

noButton.addEventListener("pointerenter", dodgeNoButton);

noButton.addEventListener("click", (e) => {
    e.preventDefault();
    dodgeNoButton();
});

noButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodgeNoButton();
}, { passive: false });

yesButton.addEventListener("click", () => {

    question.classList.add("hidden");
    success.classList.remove("hidden");

    document.getElementById("card").style.minHeight = "420px";

    launchConfetti(150);

    setInterval(createFloatingHeart, 500);
});

function launchConfetti(amount) {

    const colors = [
        "#ff2865",
        "#ffbd2e",
        "#9b5de5",
        "#00bbf9",
        "#70e000",
        "#ff85a1"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("i");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.setProperty(
            "--drift",
            (Math.random() * 220 - 110) + "px"
        );

        piece.style.animationDuration =
            (2.5 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            Math.random() * 1.2 + "s";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 7000);
    }
}

function createFloatingHeart() {

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent = ["❤️", "💗", "💕", "💖"][
        Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (16 + Math.random() * 24) + "px";

    heart.style.animationDuration =
        (3 + Math.random() * 2) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5500);
}