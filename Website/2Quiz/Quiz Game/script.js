const questions = [
    {
        question: "What is the main cause of climate change?",
        options: ["Deforestation", "Burning fossil fuels", "Agriculture", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which gas is most responsible for global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "What renewable energy source is the most widely used globally?",
        options: ["Solar", "Wind", "Hydropower", "Geothermal"],
        answer: "Hydropower"
    },
    {
        question: "What is the primary effect of greenhouse gases?",
        options: ["Cooling the Earth", "Trapping heat in the atmosphere", "Increasing oxygen levels", "Reducing pollution"],
        answer: "Trapping heat in the atmosphere"
    },
    {
        question: "Which sector is the largest contributor to global greenhouse gas emissions?",
        options: ["Transportation", "Agriculture", "Energy production", "Manufacturing"],
        answer: "Energy production"
    }
];

let currentQuestion = 0;
let score = 0;
let results = [];
let timeLeft = 30;
let timer;

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next").addEventListener("click", nextQuestion);

function startQuiz() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    startTimer();
    document.getElementById("next").style.display = "none";
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    results.push({
        question: questions[currentQuestion].question,
        selected: selectedOption,
        correct: correctAnswer
    });
    document.getElementById("next").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").textContent = `Your Score: ${score} / ${questions.length}`;
    document.getElementById("score").style.display = "block";
    
    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = "";
    resultsElement.style.display = "block";

    results.forEach(result => {
        const questionReview = document.createElement("div");
        questionReview.classList.add("question-review");
        questionReview.innerHTML = `
            <strong>${result.question}</strong><br>
            Your answer: <span class="${result.selected === result.correct ? 'correct' : 'incorrect'}">${result.selected}</span><br>
            Correct answer: <span class="correct">${result.correct}</span><br><br>
        `;
        resultsElement.appendChild(questionReview);
    });
}
