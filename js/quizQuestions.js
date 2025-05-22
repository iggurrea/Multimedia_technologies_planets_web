const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Earth", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "How many moons does Earth have?",
    options: ["1", "2", "3", "None"],
    answer: "1",
  },
  {
    question: "Which planet has the most prominent ring system?",
    options: ["Uranus", "Jupiter", "Saturn", "Neptune"],
    answer: "Saturn"
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    answer: "Mercury"
  },
  {
    question: "How many planets are in our solar system?",
    options: ["8", "9", "10", "7"],
    answer: "8"
  },
  {
    question: "Which planet has a day that lasts longer than its year?",
    options: ["Venus", "Mercury", "Neptune", "Mars"],
    answer: "Venus"
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mars", "Pluto", "Mercury", "Earth"],
    answer: "Mercury"
  },
  {
    question: "Which planet is tilted on its side, causing extreme seasons?",
    options: ["Uranus", "Neptune", "Saturn", "Venus"],
    answer: "Uranus"
  },
  {
    question: "What is the name of the fifth planet from the Sun?",
    options: ["Mars", "Saturn", "Jupiter", "Uranus"],
    answer: "Jupiter"
  },
  {
    question: "Which planet is known for its Great Red Spot, a massive storm?",
    options: ["Neptune", "Mars", "Saturn", "Jupiter"],
    answer: "Jupiter"
  },
  {
    question: "Which two planets do not have moons?",
    options: ["Mercury and Venus", "Earth and Mars", "Jupiter and Saturn", "Uranus and Neptune"],
    answer: "Mercury and Venus"
  },
  {
    question: "What is the name of the dwarf planet that was once considered the ninth planet?",
    options: ["Eris", "Pluto", "Ceres", "Haumea"],
    answer: "Pluto"
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");

function showQuestion(index) {
  const q = questions[index];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    <ul>
      ${q.options
        .map(
          (opt) => `
        <li>
          <label>
            <input type="radio" name="answer" value="${opt}" 
              ${userAnswers[index] === opt ? "checked" : ""}>
            ${opt}
          </label>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  prevBtn.style.display = index > 0 ? "inline-block" : "none";
  nextBtn.style.display =
    index < questions.length - 1 ? "inline-block" : "none";
  submitBtn.style.display =
    index === questions.length - 1 ? "inline-block" : "none";
  resultContainer.innerHTML = "";
}

function storeAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (selected) {
    userAnswers[currentQuestionIndex] = selected.value;
  }
}

nextBtn.addEventListener("click", () => {
  storeAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
});

prevBtn.addEventListener("click", () => {
  storeAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
});

submitBtn.addEventListener("click", () => {
  storeAnswer();
  let correct = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) correct++;
  });

  let message =
    correct === questions.length
      ? "🚀 Excellent explorer! All answers correct!"
      : correct >= questions.length / 2
      ? "🛰️ Not bad! You’re on your way to the stars."
      : "☄️ Keep learning! The universe is waiting.";

  resultContainer.innerHTML = `
    <h3>${message}</h3>
    <p>You got ${correct} out of ${questions.length} correct.</p>
    <button onclick="location.href='./quiz.html'">Go Back to Start</button>
  `;

  questionContainer.innerHTML = "";
  document.querySelector(".quiz-controls").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  showQuestion(currentQuestionIndex);
});
