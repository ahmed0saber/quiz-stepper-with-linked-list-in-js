let userScore = 0

const quizApp = new QuizStepper()

const addAllQuestions = () => {
    questions.forEach(question => {
        quizApp.addQuestion(question)
    })
}

const removeIsCheckedFormAllAnswers = () => {
    const answerWrappers = document.querySelectorAll(".answer-wrapper")
    answerWrappers.forEach(answerWrapper => {
        answerWrapper.classList.remove("is-checked")
    })
}

const handleAnswerWrapperClick = function () {
    removeIsCheckedFormAllAnswers()
    this.classList.add("is-checked")
}

const initAnswerWrappersEventListener = () => {
    const answerWrappers = document.querySelectorAll(".answer-wrapper")
    answerWrappers.forEach(answerWrapper => {
        answerWrapper.addEventListener("click", handleAnswerWrapperClick)
    })
}

const removeAnswerWrappersEventListener = () => {
    const answerWrappers = document.querySelectorAll(".answer-wrapper")
    answerWrappers.forEach(answerWrapper => {
        answerWrapper.removeEventListener("click", handleAnswerWrapperClick)
    })
}

const updateUserScore = () => {
    const scoreWrapper = document.querySelector(".score-wrapper")
    scoreWrapper.textContent = userScore
}

const checkUserAnswer = () => {
    const answerWrappers = document.querySelectorAll(".answer-wrapper")
    const checkedAnswer = document.querySelector(".answer-wrapper.is-checked")
    if (checkedAnswer === null) {
        alert("please check any answer first")
        return
    }

    const currentQuestion = quizApp.getCurrentQuestion()
    const correctAnswerIndex = currentQuestion.correctAnswerIndex
    const prevUserAnswerIndex = currentQuestion.userAnswerIndex
    const userAnswerIndex = checkedAnswer.dataset.index
    answerWrappers[correctAnswerIndex].classList.add("is-correct")
    if (correctAnswerIndex !== userAnswerIndex) {
        checkedAnswer.classList.add("is-wrong")
    } else if (prevUserAnswerIndex === null) {
        userScore += 5
        updateUserScore()
    }

    quizApp.setUserAnswerForCurrentQuestion(userAnswerIndex)
    removeAnswerWrappersEventListener()
}

const highlightAnswerIfPreviouslyAnswered = () => {
    const userAnswerIndex = quizApp.getCurrentQuestion().userAnswerIndex
    if (userAnswerIndex !== null) {
        const answerWrappers = document.querySelectorAll(".answer-wrapper")
        answerWrappers[userAnswerIndex].classList.add("is-checked")
        checkUserAnswer()
    }
}

const displayCurrentQuestion = () => {
    const currentQuestion = quizApp.getCurrentQuestion()
    const questionWrapper = document.querySelector(".question-wrapper")
    const answersContainer = document.querySelector(".answers-container")
    let answersHtmlContent = ""

    questionWrapper.innerHTML = currentQuestion.title
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        answersHtmlContent += `
            <div class="answer-wrapper" data-index="${i}">
                <p>${currentQuestion.answers[i]}</p>
            </div>
        `
    }
    answersContainer.innerHTML = answersHtmlContent

    initAnswerWrappersEventListener()
    highlightAnswerIfPreviouslyAnswered()
}

const goToNextQuestion = () => {
    if (quizApp.nextQuestionExists()) {
        quizApp.skipForward()
        displayCurrentQuestion()
        return
    }

    alert("you have answered all questions")
}

const handleNextBtnClick = () => {
    const currentUserAnswer = quizApp.getCurrentQuestion().userAnswerIndex
    if (currentUserAnswer === null) {
        checkUserAnswer()
        return
    }

    goToNextQuestion()
}

const goToPrevQuestion = () => {
    if (quizApp.prevQuestionExists()) {
        quizApp.skipBackward()
        displayCurrentQuestion()
        return
    }

    alert("you are at the first question, there is no prev question")
}

const handlePrevBtnClick = () => {
    const currentUserAnswer = quizApp.getCurrentQuestion().userAnswerIndex
    if (currentUserAnswer === null) {
        alert("please answer the current question first")
        return
    }

    goToPrevQuestion()
}

const initNavigationBtnsEventListener = () => {
    const nextBtn = document.querySelector(".next-btn")
    const prevBtn = document.querySelector(".prev-btn")
    nextBtn.addEventListener("click", handleNextBtnClick)
    prevBtn.addEventListener("click", handlePrevBtnClick)
}

const initQuizApp = () => {
    addAllQuestions()
    initNavigationBtnsEventListener()
    displayCurrentQuestion()
}

initQuizApp()
