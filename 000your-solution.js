let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const submitButton = document.getElementById('submit');
const resultsElement = document.getElementById('results');
const restartButton = document.getElementById('restart');

function displayQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer, question.correct));
        answersElement.appendChild(button);
    });
    submitButton.style.display = 'none';
}

function selectAnswer(selectedAnswer, correctAnswer) {
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedAnswer) {
            button.classList.add('wrong');
        }
    });
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
        submitButton.style.display = 'inline';
    } else {
        showResults();
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

function showResults() {
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';
    submitButton.style.display = 'none';
    resultsElement.style.display = 'block';
    resultsElement.textContent = `Your score: ${score} out of ${quizQuestions.length}`;
    restartButton.style.display = 'inline';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionElement.style.display = 'block';
    answersElement.style.display = 'block';
    resultsElement.style.display = 'none';
    restartButton.style.display = 'none';
    displayQuestion(currentQuestionIndex);
}

displayQuestion(currentQuestionIndex);

submitButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);