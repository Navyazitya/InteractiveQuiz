const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    document.getElementById('question').innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct === 'true') {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        endQuiz();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct === 'true') {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
    updateScore();
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score} / ${shuffledQuestions.length}`;
}

function endQuiz() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');

    const percentage = (score / shuffledQuestions.length) * 100;
    
    // Create a new score card element
    const scoreCard = document.createElement('div');
    scoreCard.classList.add('score-card');

    // Display the score and percentage
    scoreCard.innerHTML = `
        <h2>Your Score</h2>
        <p>Score: ${score} / ${shuffledQuestions.length}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
    `;

    // Append the score card to the body
    document.body.appendChild(scoreCard);
}


const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: 'false' },
            { text: 'Madrid', correct: 'false' },


            { text: 'Paris', correct: 'true' },
            { text: 'Rome', correct: 'false' }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: 'true' },
            { text: 'Venus', correct: 'false' },
            { text: 'Jupiter', correct: 'false' },
            { text: 'Saturn', correct: 'false' }
        ]
    },
    {
        question: 'What is the largest mammal in the world?',
        answers: [
            { text: 'Elephant', correct: 'false' },
            { text: 'Blue Whale', correct: 'true' },
            { text: 'Giraffe', correct: 'false' },
            { text: 'Hippopotamus', correct: 'false' }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'Charles Dickens', correct: 'false' },
            { text: 'William Shakespeare', correct: 'true' },
            { text: 'Jane Austen', correct: 'false' },
            { text: 'Leo Tolstoy', correct: 'false' }
        ]
    },
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Seoul', correct: 'false' },
            { text: 'Beijing', correct: 'false' },
            { text: 'Tokyo', correct: 'true' },
            { text: 'Bangkok', correct: 'false' }
        ]
    }
];

