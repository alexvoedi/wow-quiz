<script setup lang="ts">
import { useQuizStore } from '../store/quiz'
import Data from '@/data/quotes.json'

const quizStore = useQuizStore()

quizStore.newGame()

const currentQuote = computed(() => {
  const { npcIndex, quoteIndex } = quizStore.game.questions[quizStore.game.currentQuestionIndex]

  const npc = Data[npcIndex]
  const quote = npc.quotes[quoteIndex]

  return quote.text.de.replace(npc.name.de, '???')
})

const answers = computed(() => {
  const { npcIndex } = quizStore.game.questions[quizStore.game.currentQuestionIndex]

  const npc = Data[npcIndex]

  const answers = [{
    quote: npc.name.de,
    npcId: npc.id,
  }]

  while (answers.length < 4) {
    const randomNpc = Data[Math.floor(Math.random() * Data.length)]

    const isDuplicate = answers.some(answer => answer.npcId === randomNpc.id)

    if (isDuplicate)
      continue

    answers.push({
      quote: randomNpc.name.de,
      npcId: randomNpc.id,
    })
  }

  return Array.from(answers).sort(() => Math.random() - 0.5)
})
</script>

<template>
  <div v-if="quizStore.game.countdown > 0">
    <span class="text-[30vh] font-extrabold line-height-none text-[#EDE944] text-shadow">{{ quizStore.game.countdown }}</span>
  </div>

  <Card v-else-if="quizStore.game.timer <= 0">
    <button @click="quizStore.nextQuestion()">
      Nächste Frage
    </button>
  </Card>

  <Card v-else>
    <div class="space-y-8">
      <h1 class="text-center text-2xl max-w-640px text-[#EDE944]">
        &raquo;{{ currentQuote }}&laquo;
      </h1>

      <div class="grid grid-cols-2 gap-6 text-lg">
        <button
          v-for="answer in answers"
          :key="answer.npcId"
          class="px-6 py-4 border-(~ black) rounded-xl bg-black bg-opacity-50 transition hover:(bg-opacity-80 text-[#EDE944])"
          @click="quizStore.selectAnswer(answer.npcId)"
        >
          {{ answer.quote }}
        </button>
      </div>

      <span class="font-bold line-height-none text-[#EDE944] text-shadow">{{ quizStore.game.timer.toFixed(1) }}</span>
    </div>
  </Card>
</template>

<style>

</style>
