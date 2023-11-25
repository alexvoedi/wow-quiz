import { defineStore } from 'pinia'
import type { Question } from '../interfaces/Question'
import Data from '@/data/quotes.json'

export interface QuizStore {
  settings: {
    questionCount: number
    timeToAnswer: number
  }
  game: {
    questions: Question[]
    currentQuestionIndex: number
    correctAnswers: number
    timer: number
    timerId: number
    countdown: number
    countdownId: number
  }
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizStore => ({
    settings: {
      questionCount: 3,
      timeToAnswer: 15,
    },
    game: {
      questions: [],
      currentQuestionIndex: 0,
      correctAnswers: 0,
      timer: 1005,
      timerId: 0,
      countdown: 3,
      countdownId: 0,
    },
  }),

  actions: {
    newGame() {
      this.game.currentQuestionIndex = 0
      this.loadQuestions()
      this.runCountdown()
    },

    loadQuestions() {
      const questions: Question[] = []

      for (let i = 0; i < this.settings.questionCount; i++) {
        const npcIndex = Math.floor(Math.random() * Data.length)

        const npc = Data[npcIndex]

        if (!npc.quotes.length) {
          i--
          continue
        }

        const quoteIndex = Math.floor(Math.random() * npc.quotes.length)

        // check if question already exists
        const questionExists = questions.some(
          question =>
            question.npcIndex === npcIndex && question.quoteIndex === quoteIndex,
        )

        if (questionExists) {
          i--
          continue
        }

        questions.push({
          npcIndex,
          quoteIndex,
        })
      }

      this.game.questions = questions
    },

    nextQuestion() {
      if (this.game.currentQuestionIndex === this.settings.questionCount - 1)
        return

      this.game.currentQuestionIndex++
      this.game.countdown = 3
      this.game.timer = 15

      this.runCountdown()
    },

    runCountdown() {
      this.game.countdownId = setInterval(() => {
        this.game.countdown--

        if (this.game.countdown === 0) {
          clearInterval(this.game.countdownId)
          this.runTimer()
        }
      }, 1000)
    },

    runTimer() {
      this.game.timerId = setInterval(() => {
        this.game.timer -= 0.1

        if (this.game.timer === 0)
          clearInterval(this.game.timerId)
      }, 100)
    },

    selectAnswer(npcId: number) {
      clearInterval(this.game.timerId)
      this.game.timer = 0

      const question = this.game.questions[this.game.currentQuestionIndex]

      const npcIndex = Data.findIndex(npc => npc.id === npcId)

      const isCorrect = npcIndex === question.npcIndex

      if (isCorrect)
        this.game.correctAnswers++
    },
  },
})
