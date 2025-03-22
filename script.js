const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Transfer Markup Language",
            "Hyper Text Markup Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the square root of 16?",
        options: ["2", "4", "8", "16"],
        answer: "4"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1900", "1912", "1920", "1930"],
        answer: "1912"
    },
    {
        question: "Who is the author of 'Harry Potter'?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "C.S. Lewis"],
        answer: "J.K. Rowling"
    }
];


const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hide");
    nextBtn.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.innerText = option;
        li.addEventListener("click", () => selectAnswer(li, option));
        optionsEl.appendChild(li);
    });

    updateProgress();
}

function resetState() {
    feedbackEl.innerText = "";
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";
}

function selectAnswer(selectedOption, selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
        selectedOption.style.background = "#c8e6c9";
        feedbackEl.innerText = "Correct!";
        score++;
    } else {
        selectedOption.style.background = "#ffcdd2";
        feedbackEl.innerText = `Wrong! The correct answer is: ${currentQuestion.answer}`;
    }

    Array.from(optionsEl.children).forEach(option => {
        option.style.pointerEvents = "none";
    });

    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    resultContainer.classList.remove("hide");
    resultText.innerText = `You scored ${score} out of ${questions.length}!`;

    // Check if the user answered all questions correctly
    if (score === questions.length) {
        showPartyPopper(); // Show the party popper when all answers are correct
    }

    document.getElementById("quiz").classList.add("hide");
}

function updateProgress() {
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

// Show SweetAlert Party Popper when all answers are correct
function showPartyPopper() {
    Swal.fire({
        title: 'Congratulations!',
        text: 'You answered all questions correctly! 🎉🎉🎉',
        icon: 'success',
        showClass: {
            popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
            popup: 'animate__animated animate__bounceOut'
        },
        timer: 3000, // Auto close after 3 seconds
        background: '#f8f9fa',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Start New Quiz',
    }).then((result) => {
        if (result.isConfirmed) {
            startQuiz(); // Restart quiz after party popper animation
        }
    });
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => {
    document.getElementById("quiz").classList.remove("hide");
    startQuiz();
});

startQuiz();