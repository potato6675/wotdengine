const words = [
    { word: "acme", definition: "The highest point." },
    { word: "amplify", definition: "To make larger, greater, or louder." },
    { word: "appease", definition: "To make calm." },
    { word: "attest", definition: "To bear witness." },
    { word: "awry", definition: "In a turned or twisted position." },
    { word: "bland", definition: "Gentle, soothing." },
    { word: "curt", definition: "Short, rude, brief." },
    { word: "caustic", definition: "Able to burn away." },
    { word: "deface", definition: "To destroy the surface of." },
    { word: "dexterous", definition: "Skillful in the use of hands." },
    { word: "disarming", definition: "Charming, tending to soften unfriendliness." },
    { word: "disgruntled", definition: "Discontented." },
    { word: "dovetail", definition: "To fit together exactly." },
    { word: "dregs", definition: "The last remaining part." },
    { word: "endow", definition: "To furnish or equip." },
    { word: "estrange", definition: "To drift apart." },
    { word: "exasperate", definition: "To anger or annoy." },
    { word: "fiasco", definition: "A complete collapse." },
    { word: "forlorn", definition: "Completely abandoned." },
    { word: "forthright", definition: "Frank or direct." },
    { word: "flaunt", definition: "To wave or flutter showily." },
    { word: "haggard", definition: "Thin, pale, careworn." },
    { word: "gaunt", definition: "Thin and bony." },
    { word: "inert", definition: "Lifeless, unable to move." },
    { word: "infinite", definition: "Exceedingly great." },
    { word: "engross", definition: "To occupy the complete attention of." },
    { word: "jaunty", definition: "Lively, carefree." },
    { word: "judicious", definition: "Using or showing good judgment." },
    { word: "menial", definition: "A person who does the humble and unpleasant tasks." },
    { word: "naive", definition: "Innocent." },
    { word: "nauseate", definition: "To make sick to the stomach." },
    { word: "negligent", definition: "Marked by carelessness." },
    { word: "obliterate", definition: "To blot out completely." },
    { word: "oblivion", definition: "Forgetfulness." },
    { word: "ostracize", definition: "To exclude from the group." },
    { word: "outlandish", definition: "Strange, freakish, weird." },
    { word: "pertinent", definition: "Related to the matter at hand." },
    { word: "pithy", definition: "Short but full of meaning." },
    { word: "purge", definition: "To wash away impurities." },
    { word: "ramshackle", definition: "Appearing ready to collapse." },
    { word: "rankle", definition: "To cause anger." },
    { word: "renown", definition: "Fame, glory." },
    { word: "resolute", definition: "Bold, determined, firm." },
    { word: "scoff", definition: "To make fun of." },
    { word: "shiftless", definition: "Lazy." },
    { word: "solvent", definition: "Financially stable." },
    { word: "steadfast", definition: "Firmly fixed." },
    { word: "stint", definition: "To limit, be sparing or frugal." },
    { word: "tawdry", definition: "Showy and flashy, but not in good taste." },
    { word: "tractable", definition: "Easily managed." },
    { word: "trepidation", definition: "Fear, fright, trembling." },
    { word: "teem", definition: "To become filled to overflowing." },
    { word: "turncoat", definition: "A person who switches to an opposite party." },
    { word: "unflagging", definition: "Tireless." },
    { word: "vendor", definition: "A person who sells things." },
    { word: "vex", definition: "To annoy or anger." },
    { word: "vilify", definition: "To abuse unjustly." },
    { word: "whimsical", definition: "Subject to odd ideas." },
    { word: "wry", definition: "Twisted, turned to one side." },
  { word: "anguish", definition: "Great mental suffering" },
  { word: "aloof", definition: "withdrawn" },
  { word: "volatile", definition: "highly changable" },
  { word: "plebeian", definition: "common, belonging to the lower class" },
  { word: "facetious", definition: "humorous, not meant seriously" },
  { word: "propagate", definition: "to bring forth offspring" },
  { word: "staid", definition: "serious and dignified" },
  { word: "peruse", definition: "to read thoroughly and carefully" },
  { word: "oust", definition: "to remove or drive out" },
  { word: "ornate", definition: "elaborately decorated" },
  { word: "deplore", definition: "to feel or express regret" },
  { word: "bolster", definition: "to support, give a boost to" },
  { word: "skittish", definition: "extremely nervous and easily frieghtened" },
  { word: "perturb", definition: "to trouble, make uneasy" },
  { word: "myriad", definition: "in great numbers" },
  { word: "instigate", definition: "to urge on" },
  { word: "elite", definition: "a choiced part of a group" },
  { word: "comply", definition: "to yield to a request or command" },
  { word: "amass", definition: "to bring together, collect, gather" },
  { word: "venerate", definition: "to regard with reverance" },
  { word: "enterprising", definition: "energetic, able to start something new" },
  { word: "conjested", definition: "overcrowded" },
  { word: "banter", definition: "to exchange playful remarks" },
];

let currentWordIndex = 0;
let streak = 0;
let tally = 0;
let isSpecial = false;
let timer;
let timeLeft = 30;
const button = document.getElementById("submitBtn");
const streakBox = document.querySelector(".streak-box");
const tallyBox = document.querySelector(".tally-box");
const timerDisplay = document.getElementById("timer");
const timerBox = document.querySelector(".timer-box");

// 🔀 Shuffle words randomly
function shuffleWords(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleWords(words);

// Start timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timerBox.classList.remove("warning");

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerBox.classList.add("warning"); // Turns red when time is low
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            handleWrongAnswer(); // Auto-fail if time runs out
        }
    }, 1000);
}

// Load first word
function loadWord() {
    document.getElementById("definition").classList.remove("special");

    // 🎲 35% chance to make a question "special"
    isSpecial = Math.random() < 0.35;
    
    document.getElementById("definition").textContent = words[currentWordIndex].definition;
    
    if (isSpecial) {
        document.getElementById("definition").classList.add("special");
    }

    document.getElementById("guessInput").value = "";
    document.getElementById("message").textContent = "";
    button.textContent = "Submit";
    button.className = ""; 
    button.onclick = checkAnswer;

    startTimer(); // Start new timer for each question
}

// Check Answer
function checkAnswer() {
    clearInterval(timer); // Stop timer when answered
    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "Correct!";
        streak++;
        document.getElementById("streak").textContent = streak;
        streakBox.classList.add("glow");
        setTimeout(() => streakBox.classList.remove("glow"), 300);

        if (isSpecial) {
            tally++;
            document.getElementById("tally").textContent = tally;
            tallyBox.classList.add("glow");
            setTimeout(() => tallyBox.classList.remove("glow"), 300);
        }

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// Handle Wrong Answer (including time running out)
function handleWrongAnswer() {
    document.getElementById("message").textContent = `Tally Reset! The answer was: ${words[currentWordIndex].word}`;
    
    // Reset streak & tally
    streak = 0;
    tally = 0;
    document.getElementById("streak").textContent = streak;
    document.getElementById("tally").textContent = tally;

    button.textContent = "Skip";
    button.className = "wrong";
    button.onclick = nextWord;
}

// Load Next Word (Loops Forever)
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    loadWord();
}

// Initialize the game
document.addEventListener("DOMContentLoaded", loadWord);

let points = 20; // Currency for shop purchases

// Toggle Shop with Animation
function toggleShop() {
    let shopContainer = document.querySelector(".shop-container");
    shopContainer.classList.toggle("show");
    updateShopButtons(); // Disable buttons if not enough tallies
}

// Update Shop Buttons (Disable if not enough tallies)
function updateShopButtons() {
    document.getElementById("buyHintBtn").disabled = tally < 2;
    document.getElementById("buySkipBtn").disabled = tally < 5;
    document.getElementById("buyGloomWaterBtn").disabled = tally < 3;
}

// ✅ Buy Hint (Now Shows Word Length Properly)
function buyHint() {
    if (tally >= 2) {
        tally -= 2;
        let word = words[currentWordIndex].word; // Get current word
        let hint = generateHint(word); // Generate formatted hint
        document.getElementById("message").textContent = `Hint: ${hint}`;
        document.getElementById("tally").textContent = tally;
        updateShopButtons();
    }
}

// ✅ Generate a Properly Formatted Hint
function generateHint(word) {
    let firstLetter = word[0]; // First letter
    let penultimateLetter = word[word.length - 2] || "_"; // Second-to-last letter
    let hintArray = Array(word.length).fill("_"); // Start with underscores

    hintArray[0] = firstLetter; // Reveal first letter
    if (word.length > 2) {
        hintArray[word.length - 2] = penultimateLetter; // Reveal second-to-last letter
    }

    return hintArray.join(" "); // Format hint properly
}


// Buy Skip (Costs 5 Tallies)
function buySkip() {
    if (tally >= 5) {
        tally -= 5;
        nextWord();
        updateTally();
    }
}

// ✅ Buy Extra Time (+10 Seconds)
function buyExtraTime() {
    if (tally >= 4) {
        tally -= 4; // 💰 Deduct 4 Tallies
        timeLeft += 10; // ⏳ Add 10 seconds
        document.getElementById("tally").textContent = tally; // Update UI
        document.getElementById("timer").textContent = timeLeft; // Update Timer UI
        document.getElementById("message").textContent = "⏳ +10 seconds added!";
        
        updateShopButtons(); // Disable buttons if not enough Tallies
    } else {
        document.getElementById("message").textContent = "❌ Not enough tallies!";
    }
}

// ✅ Update Shop Buttons to Disable If Not Enough Tallies
function updateShopButtons() {
    document.getElementById("buyTimeBtn").disabled = tally < 4;
    document.getElementById("buyHintBtn").disabled = tally < 2;
    document.getElementById("buySkipBtn").disabled = tally < 5;
    document.getElementById("buyGloomWaterBtn").disabled = tally < 3;
}


function buyGloomWater() {
    if (tally >= 3) {
        tally -= 3;
        document.getElementById("tally").textContent = tally;
        document.getElementById("message").textContent = "💧 You feel a deep, unsettling gloom...";

        updateShopButtons();

        // 🌙 Trigger Gloom Moon instantly when buying Gloom Water!
        if (!isGloomMoon) {
            activateGloomMoon();
        } else {
            // If Gloom Moon is already active, extend it by 3 more rounds!
            gloomMoonRounds += 3;
            document.getElementById("message").innerHTML = "🌙 The Gloom Moon grows stronger... Tallies remain doubled!";
        }
    }
}

// 🌙 Activate Gloom Moon (Lasts 3 Rounds)
function activateGloomMoon() {
    isGloomMoon = true;
    gloomMoonRounds = 3; // Start with 3 rounds
    document.body.classList.add("gloom-moon");
    document.getElementById("message").innerHTML = "🌙 The Gloom Moon rises... Tallies are doubled for 3 questions!";
    document.getElementById("message").classList.add("gloom-moon-glow");
}

// ❌ End Gloom Moon Mode
function deactivateGloomMoon() {
    isGloomMoon = false;
    document.body.classList.remove("gloom-moon");
    document.getElementById("message").classList.remove("gloom-moon-glow");
}

// Update Tally Count and Disable Shop Buttons if Needed
function updateTally() {
    document.getElementById("tally").textContent = tally;
    updateShopButtons();
}

// Award Tallies for Correct Answers
function checkAnswer() {
    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "Correct!";
        streak++;
        document.getElementById("streak").textContent = streak;
        
        if (isSpecial) {
            tally++;
            document.getElementById("tally").textContent = tally;
            updateShopButtons();
        }

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// Reset Tallies & Streak on Wrong Answer
function handleWrongAnswer() {
    document.getElementById("message").textContent = `❌ Incorrect! The answer was: ${words[currentWordIndex].word}`;
    
    // Reset streak & tallies
    streak = 0;
    tally = 0;
    document.getElementById("streak").textContent = streak;
    document.getElementById("tally").textContent = tally;

    button.textContent = "Skip";
    button.className = "wrong";
    button.onclick = nextWord;

    updateShopButtons(); // Disable all shop items after reset
}

let isGloomMoon = false;   // 🌙 Tracks if Gloom Moon is active
let gloomMoonRounds = 0;   // How many rounds Gloom Moon lasts
let isBloodMoon = false;   // 🩸 Tracks if Blood Moon is active
let bloodMoonRounds = 0;   // 🩸 How many questions Blood Moon lasts
let bloodMoonTimer = 5;    // Timer for Blood Moon (5 seconds)

function loadWord() {
    document.getElementById("definition").classList.remove("special", "blood-moon-glow");

    // 🌙🌕 Only trigger an event if neither is active
    if (!isBloodMoon && !isGloomMoon) {  
    if (Math.random() < 0.05) {  // 🔥 10% chance for Blood Moon
        activateBloodMoon();
    } else if (Math.random() < 0.2) {  // 🌙 20% chance for Gloom Moon
        activateGloomMoon();
    }
}


    // 🌙 Keep Gloom Moon running
    if (isGloomMoon) {
        gloomMoonRounds--;
        if (gloomMoonRounds <= 0) {
            deactivateGloomMoon();
        }
    }

    // 🩸 Keep Blood Moon running for 6 questions
    if (isBloodMoon) {
        bloodMoonRounds--;
        if (bloodMoonRounds <= 0) {
            deactivateBloodMoon();
        }
    }

    // 🎲 35% chance for special questions (always special during Gloom Moon)
    isSpecial = isGloomMoon || Math.random() < 0.35;  

    document.getElementById("definition").textContent = words[currentWordIndex].definition;
    
    if (isSpecial) {
        document.getElementById("definition").classList.add("special");
    }

    document.getElementById("guessInput").value = "";
    button.textContent = "Submit";
    button.className = ""; 
    button.onclick = checkAnswer;

    startTimer();
}

// 🌙 Activate Gloom Moon (Lasts 3 Rounds)
function activateGloomMoon() {
    if (isBloodMoon) return;  // 🚫 Do NOT activate if Blood Moon is active

    isGloomMoon = true;
    gloomMoonRounds = 3;
    document.body.classList.add("gloom-moon");
    document.getElementById("message").innerHTML = "🌙 The Gloom Moon rises... Tallies are doubled for 3 questions!";
    document.getElementById("message").classList.add("gloom-moon-glow");
}

// ❌ End Gloom Moon Mode
function deactivateGloomMoon() {
    isGloomMoon = false;
    document.body.classList.remove("gloom-moon");
    document.getElementById("message").classList.remove("gloom-moon-glow");
}

// 🩸 Activate Blood Moon Mode (Lasts 6 Questions)
function activateBloodMoon() {
    if (isGloomMoon) return;  // 🚫 Do NOT activate if Gloom Moon is active

    isBloodMoon = true;
    bloodMoonRounds = 6;  // 🩸 Blood Moon lasts 6 rounds now!
    document.body.classList.add("blood-moon");
    document.getElementById("message").textContent = "🩸 The Blood Moon rises... Time is short!";
    document.getElementById("message").classList.add("blood-moon-glow");
}

// ❌ End Blood Moon Mode
function deactivateBloodMoon() {
    isBloodMoon = false;
    document.body.classList.remove("blood-moon");
    document.getElementById("message").classList.remove("blood-moon-glow");
}

// ✅ Modify startTimer() to use the 5-second Blood Moon timer
function startTimer() {
    clearInterval(timer);
    timeLeft = isBloodMoon ? bloodMoonTimer : 30;  // 🩸 Blood Moon = 5 seconds, otherwise 30

    timerDisplay.textContent = timeLeft;
    timerBox.classList.remove("warning");

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 2) {
            timerBox.classList.add("warning"); // Turns red when time is low
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            handleWrongAnswer();
        }
    }, 1000);
}

// ✅ Trigger Gloom Moon Event
function activateGloomMoon() {
    isGloomMoon = true;
    gloomMoonRounds = 3; // 🌙 Make it last for 3 rounds
    document.body.classList.add("gloom-moon");

    let message = document.getElementById("message");
    message.innerHTML = "🌙 The Gloom Moon rises... Tallies are doubled for 3 questions!";
    message.classList.add("gloom-moon-glow");
}

// ❌ End Gloom Moon Mode
function deactivateGloomMoon() {
    isGloomMoon = false;
    document.body.classList.remove("gloom-moon");
    document.getElementById("message").classList.remove("gloom-moon-glow");
}

// ✅ Modify checkAnswer() to apply double tallies if Gloom Moon is active
function checkAnswer() {
    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "✅ Correct!";
        streak++;
        document.getElementById("streak").textContent = streak;
        
        let tallyEarned = isSpecial ? 1 : 0;
        if (isGloomMoon) tallyEarned *= 2; // 🌙 Double the tallies during Gloom Moon

        tally += tallyEarned;
        document.getElementById("tally").textContent = tally;
        updateShopButtons();

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// 🎨 Add cool animations and effects
const style = document.createElement('style');
style.innerHTML = `
    /* 🌙 Gloom Moon Mode - Blue Aura */
    .gloom-moon {
        background: linear-gradient(135deg, #0d1b2a, #1b263b, #415a77);
        transition: background 0.8s ease-in-out;
        animation: gloomGlow 3s infinite alternate;
    }
    
    /* 🌟 Glowing Effect */
    @keyframes gloomGlow {
        0% { box-shadow: 0 0 10px rgba(0, 191, 255, 0.3); }
        100% { box-shadow: 0 0 30px rgba(0, 191, 255, 0.6); }
    }

    .gloom-moon .game-box, 
    .gloom-moon .shop-panel {
        box-shadow: 0 0 25px rgba(0, 191, 255, 0.8);
        border: 2px solid rgba(0, 191, 255, 0.9);
        animation: gloomPulse 2s infinite alternate;
    }

    /* 🌀 Subtle Pulsing Effect */
    @keyframes gloomPulse {
        0% { transform: scale(1); }
        100% { transform: scale(1.02); }
    }

    .gloom-moon #timer {
        color: cyan;
        font-weight: bold;
    }

    .gloom-moon button {
        box-shadow: 0 0 15px cyan;
    }

    /* 💙 Message Glow Effect */
    .gloom-moon-glow {
        color: cyan !important;
        text-shadow: 0 0 10px cyan;
        animation: messageGlow 1.5s infinite alternate;
    }

    @keyframes messageGlow {
        0% { opacity: 1; }
        100% { opacity: 0.6; }
    }
`;
document.head.appendChild(style);

function loadWord() {
    document.getElementById("definition").classList.remove("special", "blood-moon-glow");

    // 🌙🌕 Only trigger an event if neither is active
    if (!isBloodMoon && !isGloomMoon) {  
        if (Math.random() < 0.1) {
            activateBloodMoon();
        } else if (Math.random() < 0.2) {
            activateGloomMoon();
        }
    }

    // 🌙 Keep Gloom Moon running
    if (isGloomMoon) {
        gloomMoonRounds--;
        if (gloomMoonRounds <= 0) {
            deactivateGloomMoon();
        }
    }

    // 🩸 Keep Blood Moon running for 6 questions
    if (isBloodMoon) {
        bloodMoonRounds--;
        if (bloodMoonRounds <= 0) {
            deactivateBloodMoon();
        }
    }

    // ❌ Clear previous messages when loading a new word
    document.getElementById("message").textContent = "";

    // 🎲 35% chance for special questions (always special during Gloom Moon)
    isSpecial = isGloomMoon || Math.random() < 0.35;  

    document.getElementById("definition").textContent = words[currentWordIndex].definition;
    
    if (isSpecial) {
        document.getElementById("definition").classList.add("special");
    }

    document.getElementById("guessInput").value = "";
    button.textContent = "Submit";
    button.className = ""; 
    button.onclick = checkAnswer;

    startTimer();
}

// ✅ Check Answer (Stops Timer on Submission)
function checkAnswer() {
    clearInterval(timer);  // ⏳❌ STOP TIMER when submitting

    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "✅ Correct!";
        streak++;
        document.getElementById("streak").textContent = streak;
        
        let tallyEarned = isSpecial ? 1 : 0;
        if (isGloomMoon) tallyEarned *= 2; // 🌙 Double the tallies during Gloom Moon

        tally += tallyEarned;
        document.getElementById("tally").textContent = tally;
        updateShopButtons();

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// ❌ Handle Wrong Answer (Stops Timer)
function handleWrongAnswer() {
    clearInterval(timer);  // ⏳❌ STOP TIMER on incorrect answer

    document.getElementById("message").textContent = `❌ Incorrect! The answer was: ${words[currentWordIndex].word}`;

    // Reset streak & tally
    streak = 0;
    tally = 0;
    document.getElementById("streak").textContent = streak;
    document.getElementById("tally").textContent = tally;

    button.textContent = "Skip";
    button.className = "wrong";
    button.onclick = nextWord;

    updateShopButtons(); // Disable all shop items after reset
}

// 🔄 Load Next Word (Clears Message + Starts New Question)
function nextWord() {
    document.getElementById("message").textContent = ""; // ❌ Clear message when moving to next question
    currentWordIndex = (currentWordIndex + 1) % words.length;
    loadWord();
}

// ✅ Modify startTimer() to use the 5-second Blood Moon timer
function startTimer() {
    clearInterval(timer);
    timeLeft = isBloodMoon ? bloodMoonTimer : 30;  // 🩸 Blood Moon = 5 seconds, otherwise 30

    timerDisplay.textContent = timeLeft;
    timerBox.classList.remove("warning");

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 2) {
            timerBox.classList.add("warning"); // Turns red when time is low
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            handleWrongAnswer();
        }
    }, 1000);
}

function loadWord() {
    document.getElementById("definition").classList.remove("special", "blood-moon-glow");

    // 🌙🌕 Only trigger an event if neither is active
    if (!isBloodMoon && !isGloomMoon) {  
        if (Math.random() < 0.1) {
            activateBloodMoon();
        } else if (Math.random() < 0.2) {
            activateGloomMoon();
        }
    }

    // 🌙 Keep Gloom Moon running
    if (isGloomMoon) {
        gloomMoonRounds--;
        if (gloomMoonRounds <= 0) {
            deactivateGloomMoon();
        }
    }

    // 🩸 Keep Blood Moon running for 6 questions
    if (isBloodMoon) {
        bloodMoonRounds--;
        if (bloodMoonRounds <= 0) {
            deactivateBloodMoon();
        }
    }

    // ❌ Clear previous messages when loading a new word
    document.getElementById("message").textContent = "";

    // 🎲 35% chance for special questions (always special during Gloom Moon)
    isSpecial = isGloomMoon || Math.random() < 0.35;  

    let definitionText = words[currentWordIndex].definition;
    
    if (isSpecial) {
        document.getElementById("definition").classList.add("special");
    }

    document.getElementById("guessInput").value = "";
    button.textContent = "Submit";
    button.className = ""; 
    button.onclick = checkAnswer;

    startTypingAnimation(definitionText); // ⌨️ Start typing animation

    startTimer();
}

// ⌨️ Typing Animation Function (Now Prevents Glitching!)
let typingInterval; // 🔧 Stores the typing animation interval

function startTypingAnimation(text) {
    let definitionElement = document.getElementById("definition");
    definitionElement.textContent = ""; // Clear previous text

    // 🔥 STOP any existing typing animation before starting a new one!
    if (typingInterval) {
        clearInterval(typingInterval);
    }

    let index = 0;

    typingInterval = setInterval(() => {
        if (index < text.length) {
            definitionElement.textContent += text[index]; // Type letter by letter
            index++;
        } else {
            clearInterval(typingInterval); // Stop animation when text is fully typed
        }
    }, 35); // ⏳ Adjust typing speed (lower = faster)
}

// 🔄 Load Next Word (Now Also Clears Typing Animation)
function nextWord() {
    clearInterval(typingInterval);  // ❌ STOP typing animation if it's running!
    document.getElementById("message").textContent = ""; // Clear correct/wrong message
    currentWordIndex = (currentWordIndex + 1) % words.length;
    loadWord();
}

// ❌ Handle Wrong Answer (Stops Timer & Resets Streak/Tallies)
function handleWrongAnswer() {
    clearInterval(timer);  // ⏳❌ STOP TIMER on incorrect answer

    document.getElementById("message").textContent = `❌ Tally Reset. The answer was: ${words[currentWordIndex].word}`;

    // Flash Red Before Resetting Streak & Tally
    let streakBox = document.querySelector(".streak-box");
    let tallyBox = document.querySelector(".tally-box");

    streakBox.classList.add("flash-red");
    tallyBox.classList.add("flash-red");

    setTimeout(() => {
        streak = 0;
        tally = 0;
        document.getElementById("streak").textContent = streak;
        document.getElementById("tally").textContent = tally;
        
        streakBox.classList.remove("flash-red");
        tallyBox.classList.remove("flash-red");
    }, 500); // 🔥 Flash for 0.5 seconds before resetting

    button.textContent = "Skip";
    button.className = "wrong";
    button.onclick = nextWord;

    updateShopButtons(); // Disable all shop items after reset
}




// ✅ Show MASSIVE Image for 5 Seconds, Pause Timer, and Resume After
function triggerMassiveMode() {
    let overlay = document.getElementById("massiveOverlay");
    overlay.classList.add("show"); // Show image

    // ⏸️ Pause Timer
    clearInterval(timer);
    timerPaused = true;

    setTimeout(() => {
        overlay.classList.remove("show"); // Hide after 5 seconds

        // ▶️ Resume Timer
        if (timerPaused) {
            startTimer();
            timerPaused = false;
        }
    }, 5000);
}





let massiveActive = false; // 🚨 Track if MASSIVE Mode is active

// ✅ Show MASSIVE Image for 5 Seconds, Then Move to Next Question
function triggerMassiveMode() {
    let overlay = document.getElementById("massiveOverlay");
    overlay.classList.add("show"); // Show image
    massiveActive = true; // 🚨 MASSIVE Mode is Active

    // ⏸️ Pause Timer
    clearInterval(timer);
    timerPaused = true;

    setTimeout(() => {
        overlay.classList.remove("show"); // Hide after 5 seconds
        massiveActive = false; // ✅ MASSIVE Mode Ends

        // 🔄 Move to Next Question Automatically
        nextWord();
    }, 5000);
}

// ✅ Modify checkAnswer() to Ignore "MASSIVE" & Prevent Bugs
function checkAnswer() {
    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    // 🔥 MASSIVE Mode Activation (Does NOT Count as an Answer)
    if (userGuess === "massive") {
        triggerMassiveMode(); // Start MASSIVE Mode
        message.textContent = "You know what else is massive?";
        document.getElementById("guessInput").value = ""; // Clear input
        return;
    }

    // 🚨 Prevent Answer Submission While MASSIVE Mode is Active
    if (massiveActive) {
        message.textContent = "LOWWWW TAPER FADE!!!";
        return;
    }

    // ✅ Normal Answer Checking
    clearInterval(timer); // ⏳❌ STOP TIMER on submission

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "✅ Correct!";
        streak++;
        document.getElementById("streak").textContent = streak;
        
        let tallyEarned = isSpecial ? 1 : 0;
        if (isGloomMoon) tallyEarned *= 2; // 🌙 Double the tallies during Gloom Moon

        tally += tallyEarned;
        document.getElementById("tally").textContent = tally;
        updateShopButtons();

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// ✅ Disable All Shop Items When Losing
function disableShop() {
    document.querySelectorAll(".shop-item button").forEach(button => {
        button.disabled = true; // 🔒 Disable all buttons
    });
}

// ✅ Enable Shop Items Based on Tally Count
function updateShopButtons() {
    document.getElementById("buyTimeBtn").disabled = tally < 4;
    document.getElementById("buyHintBtn").disabled = tally < 2;
    document.getElementById("buySkipBtn").disabled = tally < 5;
    document.getElementById("buyGloomWaterBtn").disabled = tally < 3;
}

// ❌ Handle Wrong Answer (Now Fully Locks Shop)
function handleWrongAnswer() {
    clearInterval(timer); // ⏳❌ STOP TIMER on incorrect answer

    document.getElementById("message").textContent = `❌ Incorrect! The answer was: ${words[currentWordIndex].word}`;

    // Flash Red Before Resetting Streak & Tally
    let streakBox = document.querySelector(".streak-box");
    let tallyBox = document.querySelector(".tally-box");

    streakBox.classList.add("flash-red");
    tallyBox.classList.add("flash-red");

    setTimeout(() => {
        streak = 0;
        tally = 0;
        document.getElementById("streak").textContent = streak;
        document.getElementById("tally").textContent = tally;
        
        streakBox.classList.remove("flash-red");
        tallyBox.classList.remove("flash-red");

        disableShop(); // 🔒 Lock shop completely when losing
    }, 500);

    button.textContent = "Skip";
    button.className = "wrong";
    button.onclick = nextWord;
}

// ✅ Modify Functions That Affect Tallies to Enable Items When Enough Tallies Are Earned
function buyExtraTime() {
    if (tally >= 4) {
        tally -= 4;
        timeLeft += 10;
        document.getElementById("tally").textContent = tally;
        document.getElementById("timer").textContent = timeLeft;
        document.getElementById("message").textContent = "⏳ +10 seconds added!";
        updateShopButtons(); // 🔄 Update shop buttons
    }
}



let revealedLetters = 0; // 🧩 Tracks how many letters have been revealed per word

// ✅ Buy Hint (Now Stacks with Previous Hints)
function buyHint() {
    if (tally >= 2) {
        tally -= 2;
        revealedLetters++; // 🔄 Reveal one more letter
        let word = words[currentWordIndex].word;
        let hint = generateHint(word, revealedLetters); // Generate updated hint
        document.getElementById("message").textContent = `💡 Hint: ${hint}`;
        document.getElementById("tally").textContent = tally;
        updateShopButtons();
    }
}

// ✅ Generate a Stacking Hint (Reveals More Each Time)
function generateHint(word, revealedCount) {
    let firstLetter = word[0];
    let penultimateLetter = word[word.length - 2] || "_";
    let hintArray = Array(word.length).fill("_"); // Start with underscores

    hintArray[0] = firstLetter; // Always show first letter
    if (word.length > 2) {
        hintArray[word.length - 2] = penultimateLetter; // Always show penultimate letter
    }

    // 🧩 Reveal additional letters based on how many hints were bought
    let revealIndex = 1; // Start revealing after the first letter
    let revealed = 0;

    while (revealed < revealedCount && revealIndex < word.length - 2) {
        hintArray[revealIndex] = word[revealIndex];
        revealIndex++;
        revealed++;
    }

    return hintArray.join(" "); // Format hint properly
}

// 🔄 Reset Hints When Moving to Next Word
function nextWord() {
    revealedLetters = 0; // Reset hint progression
    document.getElementById("message").textContent = ""; // Clear previous hints
    currentWordIndex = (currentWordIndex + 1) % words.length;
    loadWord();
}

function buySkip() {
    if (tally >= 5) {
        tally -= 5;
        nextWord();
        updateShopButtons();
    }
}

function buyGloomWater() {
    if (tally >= 3) {
        tally -= 3;
        document.getElementById("message").textContent = "Gloom water go brrrr";
        updateShopButtons();
    }
}


// 🎯 Listen for "Enter" key press
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // ⛔ Prevent accidental form submissions

        // Simulate button click on the current action button
        button.click();
    }
});

function checkAnswer() {
    clearInterval(timer); // ⏳❌ Stop Timer when submitting
    let userGuess = document.getElementById("guessInput").value.trim().toLowerCase();
    let message = document.getElementById("message");

    if (userGuess === words[currentWordIndex].word) {
        message.textContent = "Correct";
        streak++;
        document.getElementById("streak").textContent = streak;

        let tallyEarned = isSpecial ? 1 : 0;
        if (isGloomMoon) tallyEarned *= 2; // 🌙 Double tallies during Gloom Moon

        tally += tallyEarned;
        document.getElementById("tally").textContent = tally;
        
        disableShop(); // 🚫 Disable Shop After Answering

        button.textContent = "Next Question";
        button.className = "correct";
        button.onclick = nextWord;
    } else {
        handleWrongAnswer();
    }
}

// 🚫 Disable all shop buttons
function disableShop() {
    document.querySelectorAll(".shop-item button").forEach(button => {
        button.disabled = true;
    });
}

// ✅ Enable shop buttons (only if enough tallies)
function enableShop() {
    document.getElementById("buyTimeBtn").disabled = tally < 4;
    document.getElementById("buyHintBtn").disabled = tally < 2;
    document.getElementById("buySkipBtn").disabled = tally < 5;
    document.getElementById("buyGloomWaterBtn").disabled = tally < 3;
}

function nextWord() {
    document.getElementById("message").textContent = ""; // Clear message
    currentWordIndex = (currentWordIndex + 1) % words.length;
    
    enableShop(); // ✅ Re-enable shop for the next question

    loadWord();
}

let bombCountdown;
let bombsDefused = 0;
let isBombActive = false;

// 🛑 Trigger a Bomb Event (15% Chance)
function maybeTriggerBombEvent() {
    if (Math.random() < 0.10) { // 15% chance per question
        triggerBombEvent();
    }
}


// 💣 Trigger the Bomb Defusal Event
function triggerBombEvent() {
    if (isBombActive) return; // Prevent multiple bombs at once
    isBombActive = true;
    bombsDefused = 0;

    let gameBox = document.querySelector(".game-box");
    let bombContainer = document.createElement("div");
    bombContainer.classList.add("bomb-container");
    document.body.appendChild(bombContainer);

    let gameBoxRect = gameBox.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
        let bomb = document.createElement("img");
        bomb.src = "https://pngimg.com/d/potato_PNG7080.png"; // 💣 Bomb Icon
        bomb.classList.add("bomb");

        // ✅ Randomly spawn bombs AROUND the game box
        let randomX = Math.random() * (window.innerWidth - 80);
        let randomY = Math.random() * (window.innerHeight - 80);

        // Ensure they spawn **around** the game box, not inside
        if (
            randomX > gameBoxRect.left - 100 && randomX < gameBoxRect.right + 100 &&
            randomY > gameBoxRect.top - 100 && randomY < gameBoxRect.bottom + 100
        ) {
            randomX = Math.random() < 0.5 ? gameBoxRect.left - 120 : gameBoxRect.right + 20;
            randomY = Math.random() < 0.5 ? gameBoxRect.top - 120 : gameBoxRect.bottom + 20;
        }

        bomb.style.left = `${randomX}px`;
        bomb.style.top = `${randomY}px`;

        bomb.onclick = defuseBomb;
        bombContainer.appendChild(bomb);
    }

    // ⏳ Start Countdown (5 Seconds) - Now Positioned Above the Game
    let timer = 5;
    let timerText = document.createElement("p");
    timerText.classList.add("bomb-timer");
    timerText.textContent = `💣 Defuse in ${timer}s!`;
    document.body.appendChild(timerText);

    bombCountdown = setInterval(() => {
        timer--;
        timerText.textContent = `💣 Defuse in ${timer}s!`;
        if (timer <= 0) {
            bombExplodes();
        }
    }, 1000);
}

// ✅ Defuse a Bomb
function defuseBomb(event) {
    event.target.remove(); // Remove bomb from screen
    bombsDefused++;

    if (bombsDefused === 3) {
        clearInterval(bombCountdown);
        document.querySelector(".bomb-container").remove();
        document.querySelector(".bomb-timer").remove();
        isBombActive = false;
    }
}

// 💥 Bomb Explodes! Lose All Tallies & Streak
function bombExplodes() {
    clearInterval(bombCountdown);
    document.querySelector(".bomb-container").remove();
    document.querySelector(".bomb-timer").remove();
    tally = 0;
    streak = 0;
    document.getElementById("tally").textContent = tally;
    document.getElementById("streak").textContent = streak;
    document.getElementById("message").textContent = "You got 5 big booms. tally reset.";
    isBombActive = false;
}

// ✅ Call "maybeTriggerBombEvent()" whenever a new question starts
function nextWord() {
    document.getElementById("message").textContent = "";
    currentWordIndex = (currentWordIndex + 1) % words.length;
    maybeTriggerBombEvent();
    loadWord();
}