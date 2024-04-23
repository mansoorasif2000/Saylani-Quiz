function showScores() {
    var userName = prompt("Please enter your name:");
    var rollNumber = prompt("Please enter your roll number:");
    let quizEndHTML =
        `<h1>Quiz completed</h1>
    <h2 id="score">Hello, ${userName} (Roll Number: ${rollNumber}), you scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat"><a href="index.html">Take Quiz again</a></div>`;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML =  quizEndHTML;
}

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber } of ${quiz.questions.length}`;
}

function showScores() {
    let quizEndHTML =
        `<h1>Question completed</h1>
    <h2 id="score">you scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat"><a href="index.html">Take Quiz again</a></div>`;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML =  quizEndHTML;
}

let questions = [
    new Question(
        "Hyper Text Markup Language stands for ?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
    ),
    new Question(
        "Cascading Style Sheet stands for ?", ["JQuery", "XHTML", "CSS", "HTML"], "CSS"
    ),
      
    new Question(
        "Which is a javascript framework ?", ["React", "Laravel", "Django", "Sass"], "React"
    ),
    new Question(
        "Which is a backend language ?", ["React", "CSS", "HTML", "PHP"], "PHP"
    ),
    new Question(
        "Which is best for Artificial Intelligence ?", ["React", "CSS", "HTML", "Python"], "Python"
    ),
    new Question(
        "What does SQL stand for?",
        ["Structured Query Language", "JavaScript", "C++", "Python"],
        "Structured Query Language"
    ),
    new Question(
        "Which programming language is often used for web development?",
        ["Python", "Java", "Ruby", "JavaScript"],
        "JavaScript"
    ),
    
    new Question(
        "What is the purpose of Git?",
        ["Version Control", "Database Management", "Graphic Design", "Web Development"],
        "Version Control"
    ),
    new Question(
        "Which technology is used for creating responsive web designs?",
        ["Bootstrap", "Angular", "Vue.js", "jQuery"],
        "Bootstrap"
    ),
    new Question(
        "What is the primary function of a CDN?",
        ["Content Delivery", "Database Management", "Server Hosting", "Search Engine Optimization"],
        "Content Delivery"
    )
    
];
let quiz = new Quiz(questions);

displayQuestion();

let time = 2;
let quizTimeInMinute = time * 60 * 60;
let quizTime = quizTimeInMinute / 60;
let counting = document.getElementById("count-down");

function StartCountDown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        }
        else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
StartCountDown();
