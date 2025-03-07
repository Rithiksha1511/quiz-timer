let isTimerRunning = false; // Flag to prevent multiple selections

const questions = [
  "Which planet is known as the 'Red Planet'?",
  "What is the name of our galaxy?",
  "Which planet is known for its beautiful blue color and strong winds?",
  "What is the maximum number of overs in a One Day International (ODI) match per team?",
  "Which Tamil music composer is known for his background scores in movies like 'Vikram Vedha' and 'Kaithi'?",
  "Which is the smallest state in India by area?",
  "What is 15% of 200?",
  "What is the hardest natural substance on Earth?",
  "What is the name of India's first satellite?",
  "Which city is known as the 'Pink City' of India?",
  "What has hands but can’t clap?",
  "What runs but never walks?",
  "Which continent has the most countries?",
  "Which blood group is the universal donor?",
  "What has to be broken before you can use it?",
  "What can fill a room but takes up no space?",
  "Who led India to its first-ever World Cup win in 1983?",
  "Which cricketer is known for his aggressive batting and nickname 'Universal Boss'?",
  "What was the first Tamil film song to be released as a single before the movie’s release, starting the trend in Kollywood?",
  "Which country is considered the birthplace of cricket?",
  "Who wrote 'Romeo and Juliet'?",
  "Who was the first woman to win a Nobel Prize?",
  "What is the largest bird in the world?",
  "Who is known as the 'Father of Computers'?",
  "Which planet has the largest moon in our solar system?",
  "Who is the youngest music composer joining the film industry at the age of 16?",
  "What movie is 'Naana Thaana' song from?",
  "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
  "I can be cracked, made, told, and played. What am I?",
  "The more you have of me, the less you see. What am I?",
  "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?",
  "I am not alive, but I grow. I don’t have lungs, but I need air. I don’t have a mouth, and yet I drown. What am I?",
  "I have keys but open no locks. I have space but no room. You can enter, but you can’t go outside. What am I?",
  "State 15 vegetables.",
  "Say any 20 movies of Rajinikanth.",
  "Name 10 coding languages.",
  "Say any words in alphabetical order within 30 seconds.",
  "Say 15 car companies within 30 seconds.",
  "Name 10 movie directors within 10 seconds.",
  "Say 15 colors within 15 seconds.",
  "State 15 languages.",
  "Name any 10 things you see around this class within 10–15 seconds.",
  "Name 10 mobile manufacturing companies.",
  "Name 10 digital games (mobile or desktop games).",
  "List 10 apps you use daily.",
  "Name any 5 states in the USA.",
  "State 5 capital cities of any country.",
  "Say the names of 10 YouTubers worldwide.",
  "State any 7 trees.",
  "Say any 10 ECE subjects"
];

const answers = [
  "Mars", "Milky Way", "Neptune", "50 overs", "Sam CS", "Goa", "30", "Diamond", "Aryabhata", "Jaipur", "Clock", "Water/River", "Africa", "O negative (O-)", "Egg", "Light", "Kapil Dev", "Chris Gayle", "Why This Kolaveri Di?", "England", "William Shakespeare", "Marie Curie", "Ostrich", "Charles Babbage", "Jupiter", "Yuvan Shankar Raja", "TSK", "An echo", "A joke", "Darkness", "A cloud", "A fire", "A keyboard", "Anything", "Anything","Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything", "Anything"
];


const container = document.getElementById("card-container");
const questionBox = document.getElementById("question-box");
const timerDisplay = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");
let countdown;

// Create Answer Box
const answerBox = document.createElement("div");
answerBox.id = "answer-box";
answerBox.style.display = "none";
answerBox.style.marginTop = "20px";
answerBox.style.padding = "15px";
answerBox.style.fontSize = "20px";
answerBox.style.fontWeight = "bold";
answerBox.style.background = "#28a745";
answerBox.style.color = "#fff";
answerBox.style.borderRadius = "10px";
answerBox.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.3)";
document.body.appendChild(answerBox);

// Create View Answer Button
const viewAnswerButton = document.createElement("div");
viewAnswerButton.id = "view-answer-button";
viewAnswerButton.textContent = "View Answer";
viewAnswerButton.style.display = "none";
viewAnswerButton.style.marginTop = "20px";
viewAnswerButton.style.padding = "15px";
viewAnswerButton.style.fontSize = "20px";
viewAnswerButton.style.fontWeight = "bold";
viewAnswerButton.style.background = "#dc3545"; // Red color to distinguish
viewAnswerButton.style.color = "#fff";
viewAnswerButton.style.borderRadius = "10px";
viewAnswerButton.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.3)";
viewAnswerButton.style.cursor = "pointer";
viewAnswerButton.addEventListener("click", () => showAnswer(viewAnswerButton.dataset.index));
document.body.appendChild(viewAnswerButton);

for (let i = 0; i < questions.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = i + 1;
  card.dataset.index = i;
  card.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
          displayQuestion(this.dataset.index, this);
      }
  });
  container.appendChild(card);
}

function displayQuestion(index, card) {
  if (isTimerRunning) return; 
  
  clearInterval(countdown);
  isTimerRunning = true;

  questionBox.textContent = questions[index];
  card.classList.add("selected");
  answerBox.style.display = "none";
  viewAnswerButton.style.display = "block";
  viewAnswerButton.dataset.index = index;
  startTimer(index);
}

function startTimer(index) {
  let timeLeft = 30;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timerBar.style.width = "100%";

  countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
      timerBar.style.width = `${(timeLeft / 30) * 100}%`;

      if (timeLeft === 0) {
          clearInterval(countdown);
          timerDisplay.textContent = "⏰ Time's Up!";
          timerBar.style.width = "0%";
          showAnswer(index);
      }
  }, 1000);
}

function showAnswer(index) {
  answerBox.textContent = `Answer: ${answers[index]}`;
  answerBox.style.display = "block";
  viewAnswerButton.style.display = "none";
  isTimerRunning = false;
}
