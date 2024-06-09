// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useTableStore = defineStore('table', () => {
  const table = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])

  const currentPlayer = ref('O')
  const winner = ref()

  const empty = ref(true)

  async function clearTable() {
    table.value = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    winner.value = null
    currentPlayer.value = await 'O'
  }

  return { table, currentPlayer, winner, empty, clearTable }
})
