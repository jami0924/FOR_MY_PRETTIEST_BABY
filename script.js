// 1. Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const passwordInput = document.getElementById("password-input");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const surveyContainer = document.getElementById("survey-container");
const questionText = document.getElementById("question-text");
const surveyButtons = document.getElementById("survey-buttons");
const surveyNext = document.getElementById("survey-next");
const surveyTitle = document.getElementById("survey-question");

// Audio Elements
const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");
bgMusic.volume = 0.2;
clickSound.volume = 0.4;

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// 2. SURVEY LOGIC
const surveyData = [
    { q: "1. Where does the Seal Kab lives?", a: "Bacoor", b: "Muntinlupa", correct: "Bacoor" },
    { q: "2. Where does the Duck Kab studies now?", a: "PUP", b: "ADU", correct: "ADU" },
    { q: "3. Who has the perfect body with a perfect smile?", a: "Seal Kab", b: "Duck Kab", correct: "Seal Kab" },
    { q: "4. Who has faffy cheks?", a: "Seal Kab", b: "Duck Kab", correct: "Duck Kab" },
    { q: "5. Who's the prettiest, beautiful, stunning, sexiest, hottest person ever?", a: "Seal Kab", b: "Seal Kab ", correct: "Seal Kab" }
];

let currentQuestion = 0;

function checkPass() {
    playClick();
    if (passwordInput.value === "0924") {
        document.getElementById("passcode-container").style.display = "none";
        surveyContainer.style.display = "flex";
        startSurvey();
    } else {
        alert("Try again, my mahal! ❤️");
        passwordInput.value = "";
    }
}

function startSurvey() {
    currentQuestion = 0;
    surveyTitle.textContent = "QUICK survey to see if you're really my kabab!";
    surveyButtons.style.display = "flex";
    surveyNext.style.display = "none";
    showQuestion();
}

function showQuestion() {
    const data = surveyData[currentQuestion];
    questionText.textContent = data.q;
    surveyButtons.innerHTML = `
        <button class="keypad-btn" onclick="handleSurvey('${data.a}')">${data.a}</button>
        <button class="keypad-btn" onclick="handleSurvey('${data.b}')">${data.b}</button>
    `;
}

function handleSurvey(choice) {
    playClick();
    if (choice.trim() === surveyData[currentQuestion].correct) {
        currentQuestion++;
        if (currentQuestion < surveyData.length) {
            showQuestion();
        } else {
            surveyTitle.textContent = "Yay! You passed!";
            questionText.textContent = "since you got it all right here's an invitation!";
            surveyButtons.style.display = "none";
            surveyNext.style.display = "block";
        }
    } else {
        surveyTitle.textContent = "I promise you'll like it";
        questionText.textContent = "i made it only for you";
        surveyButtons.innerHTML = `<button class="keypad-btn" onclick="startSurvey()">ANOTHER CHANCE</button>`;
    }
}

function showEnvelope() {
    playClick();
    surveyContainer.style.display = "none";
    envelope.style.display = "block";
}

envelope.addEventListener("click", () => {
    playClick();
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => { document.querySelector(".letter-window").classList.add("open"); }, 50);
});

// 4. VALENTINE INTERACTIONS
let clickCount = 0;
let yesScale = 1;

noBtn.addEventListener("click", () => {
    playClick();
    clickCount++;

    if (clickCount < 6) {
        // 1. Grow the Yes button
        yesScale += 0.6;
        yesBtn.style.transform = `scale(${yesScale})`;

        // 2. Move the No button more to the right
        // We calculate a position that shifts it right based on the click count
        let moveX = clickCount * 50; // Increases the "right" push each click
        let moveY = (clickCount % 2 === 0) ? 20 : -20; // Slight up/down wiggle

        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

        // 3. Update the dialogue text
        const phrases = ["No", "Sure?", "Really?", "Pwease?", "Think again!", "Last chance!"];
        title.textContent = phrases[clickCount - 1];
    } else {
        // BOOM Logic
        buttons.style.display = "none";
        catImg.src = "elgatitolover-cat.gif";
        catImg.style.width = "400px";
        setTimeout(() => {
            catImg.style.display = "none";
            title.style.display = "none";
            yesBtn.style.display = "block";
            buttons.style.display = "flex";
            yesBtn.classList.add("takeover");
        }, 2000);
    }
});

yesBtn.addEventListener("click", () => {
    playClick();
    if (yesBtn.classList.contains("takeover") || clickCount < 6) {
        buttons.style.display = "none"; 
        title.style.display = "block";
        title.textContent = "Yippeeee!";
        catImg.style.display = "block";
        catImg.src = "cat_dance.gif";
        finalText.style.display = "block";
        setInterval(createHeart, 100);
    }
});

// UTILS
function appendNum(n) { 
    if (bgMusic.paused) bgMusic.play();
    playClick();
    passwordInput.value += n; 
}
function clearPass() { playClick(); passwordInput.value = ""; }

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart-particle";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".passcode-photo");
setInterval(() => {
    if(slides.length > 0){
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add("active");
    }
}, 1800);