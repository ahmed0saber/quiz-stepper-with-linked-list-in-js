class Question {
    constructor({ title, answers, correctAnswerIndex }) {
        this.title = title
        this.answers = answers
        this.correctAnswerIndex = correctAnswerIndex
        this.userAnswerIndex = null
        this.next = null
        this.prev = null
    }
}

class QuizStepper {
    constructor() {
        this.head = null
        this.tail = null
        this.current = null
        this.length = 0
    }

    addQuestion(title, answers, correctAnswerIndex) {
        const newQuestion = new Question(title, answers, correctAnswerIndex)

        if (this.head) {
            newQuestion.prev = this.tail
            this.tail.next = newQuestion
            this.tail = newQuestion
        } else {
            this.head = newQuestion
            this.tail = newQuestion
            this.current = newQuestion
        }

        this.length++
    }

    getCurrentQuestion() {
        return this.current
    }

    nextQuestionExists() {
        return !!this.current.next
    }

    skipForward() {
        this.current = this.current.next
    }

    prevQuestionExists() {
        return !!this.current.prev
    }

    skipBackward() {
        this.current = this.current.prev
    }

    setUserAnswerForCurrentQuestion(answer) {
        this.current.userAnswerIndex = answer
    }
}
