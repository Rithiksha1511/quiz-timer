let isTimerRunning = false; // Flag to prevent multiple selections

const questions = [
  "What is the capital of France?",
  "Who wrote 'To Kill a Mockingbird'?",
  "What is the square root of 144?",
  "Which planet is known as the Red Planet?",
  "Who discovered penicillin?",
  "What is the boiling point of water?",
  "Who painted the Mona Lisa?",
  "What is the largest ocean on Earth?",
  "What is the hardest natural substance?",
  "Which element has the chemical symbol O?",
  "What is the speed of light?",
  "Who developed the theory of relativity?",
  "What is the longest river in the world?",
  "Which gas do plants use for photosynthesis?",
  "What is the smallest country in the world?",
  "Who invented the telephone?",
  "What is the capital of Japan?",
  "Which bird is known for its ability to mimic sounds?",
  "What is the chemical formula for water?",
  "Which continent is the largest by area?",
  "What is the tallest mountain in the world?",
  "What is the freezing point of water?",
  "Who is the author of '1984'?",
  "Which planet has the most moons?",
  "What is the national flower of India?",
  "What is the main ingredient in chocolate?",
  "What is the currency of the UK?",
  "What does DNA stand for?",
  "What is the largest mammal on Earth?",
  "Which gas makes up most of Earth's atmosphere?",
  "Who was the first person to step on the moon?",
  "What is the chemical symbol for gold?",
  "Which country is famous for the Great Wall?",
  "What is the capital of Canada?",
  "Which animal is known as the King of the Jungle?",
  "What is the main ingredient in bread?",
  "Who painted 'Starry Night'?",
  "Which language has the most native speakers?",
  "What is the longest bone in the human body?",
  "Which organ pumps blood in the human body?",
  "What is the hottest planet in the solar system?",
  "Which animal is known for changing its color?",
  "What is the capital of Australia?",
  "Which planet is closest to the Sun?",
  "Who was the first President of the USA?",
  "What is the national sport of Canada?",
  "Which instrument has 88 keys?",
  "Which metal is used in electrical wiring?",
  "What is the study of living organisms called?",
  "Which country produces the most coffee?"
];

const answers = [
  "Paris", "Harper Lee", "12", "Mars", "Alexander Fleming", "100°C",
  "Leonardo da Vinci", "Pacific Ocean", "Diamond", "Oxygen",
  "299,792,458 m/s", "Albert Einstein", "Nile River", "Carbon Dioxide",
  "Vatican City", "Alexander Graham Bell", "Tokyo", "Lyrebird", "H2O",
  "Asia", "Mount Everest", "0°C", "George Orwell", "Jupiter", "Lotus",
  "Cocoa", "Pound Sterling", "Deoxyribonucleic Acid", "Blue Whale",
  "Nitrogen", "Neil Armstrong", "Au", "China", "Ottawa", "Lion",
  "Flour", "Vincent van Gogh", "Mandarin Chinese", "Femur", "Heart",
  "Venus", "Chameleon", "Canberra", "Mercury", "George Washington",
  "Lacrosse", "Piano", "Copper", "Biology", "Brazil"
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

for (let i = 0; i < 50; i++) {
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
  if (isTimerRunning) return; // Prevent selecting another question
  
  clearInterval(countdown);
  isTimerRunning = true; // Block new selections

  questionBox.textContent = questions[index];
  card.classList.add("selected");
  answerBox.style.display = "none"; // Hide previous answer
  startTimer(index);
}


function startTimer(index) {
  let timeLeft = 30; // Set timer to 30 seconds
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timerBar.style.width = "100%";
  let beepPlayed = false; // Prevent multiple beeps
  let blinkingStarted = false; // Prevent multiple blinking starts

  countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
      timerBar.style.width = `${(timeLeft / 30) * 100}%`;

      // Play beep sound and start blinking when 3 seconds are left
      if (timeLeft === 3 && !beepPlayed) {
          beepPlayed = true;
          let beep = new Audio('beep.mp3'); // Ensure this file is in the same directory
          beep.play();
      }

      if (timeLeft === 3 && !blinkingStarted) {
          blinkingStarted = true;
          questionBox.style.animation = "timeUp 0.5s ease-in-out infinite"; // Start blinking
      }

      if (timeLeft === 0) {
          clearInterval(countdown);
          timerDisplay.textContent = "⏰ Time's Up!";
          timerBar.style.width = "0%";
          questionBox.style.animation = "none"; // Stop blinking
          showAnswer(index);
      }
  }, 1000);
}

// Show Answer After Timer Ends
function showAnswer(index) {
  setTimeout(() => {
      answerBox.textContent = `Answer: ${answers[index]}`;
      answerBox.style.display = "block";
      isTimerRunning = false; // Allow selecting a new question
  }, 500);
}

