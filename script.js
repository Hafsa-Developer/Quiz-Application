const questions = [
    {
        question: "What is the correct way to declare a JavaScript variable?",
        answers: [
            { text: "variable name", correct: false },
            { text: "var name", correct: true },
            { text: "v name", correct: false },
            { text: "new name", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "text-style", correct: false },
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false }
        ]
    },
    {
        question: "Which HTML element is used for the largest heading?",
        answers: [
            { text: "&lt;h6&gt;", correct: false },
            { text: "&lt;heading&gt;", correct: false },
            { text: "&lt;h1&gt;", correct: true },
            { text: "&lt;head&gt;", correct: false }
        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            { text: "Automated Programming Interface", correct: false },
            { text: "Application Programming Interface", correct: true },
            { text: "Advanced Programming Interface", correct: false },
            { text: "Applied Programming Interface", correct: false }
        ]
    },
    {
        question: "Which method is used to select an HTML element by its id?",
        answers: [
            { text: "document.querySelector()", correct: false },
            { text: "document.getElementById()", correct: true },
            { text: "document.className()", correct: false },
            { text: "document.tagName()", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
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
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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

