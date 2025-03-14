const questions = [
  {
    question: "What is the most common dog breed in the world?",
    answers: [
      { text: "Chihuahua", correct: false },
      { text: "Labrador Retriever", correct: true },
      { text: "Golden Retriever", correct: false },
      { text: "Pomeranian", correct: false },
    ],
  },

  {
    question: "What is a common health issue for Chihuahuas?",
    answers: [
      { text: "Heart problems", correct: true },
      { text: "Joint problems", correct: false },
      { text: "Allergies", correct: false },
      { text: "Stomach issues", correct: false },
    ],
  },
  {
    question: "What is the primary function of a dog's tail?",
    answers: [
      { text: "To help balance while running", correct: false },
      { text: "To communicate with other dogs and animals", correct: true },
      { text: "To keep the dog warm", correct: false },
      { text: "To store extra energy", correct: false },
    ],
  },
  {
    question: "Which of the following is a hypoallergenic dog breed?",
    answers: [
      { text: "Chihuahua", correct: false },
      { text: "Dalmatian", correct: false },
      { text: "Poodle", correct: true },
      { text: "Beagle", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; //increases score
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
