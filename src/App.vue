<script setup>
import { provide } from 'vue'
import { ref } from 'vue'
import WinnerDialog from './WinnerDialog.vue'

const currentPlayer = ref('O')
const winner = ref()
const dialog = ref(false)
const empty = ref(true)

provide('dialog', dialog)
provide('winner', winner)
const table = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
])
provide('table', table)
async function clearTable() {
  table.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  winner.value = null
  currentPlayer.value = await 'O'
}
async function checkDraw() {
  if (!winner.value) {
    outerLoop: for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(i, j, table.value[i][j])
        if (table.value[i][j] === '') {
          empty.value = await true
          break outerLoop
        } else {
          empty.value = false
        }
      }
    }
  }
}

function checkRow() {
  for (let row = 0; row < 3; row++) {
    if (
      table.value[row][0] === currentPlayer.value &&
      table.value[row][1] === currentPlayer.value &&
      table.value[row][2] === currentPlayer.value
    ) {
      winner.value = currentPlayer.value
      dialog.value = true
    }
  }
}

function checkCol() {
  for (let col = 0; col < 3; col++) {
    if (
      table.value[0][col] === currentPlayer.value &&
      table.value[1][col] === currentPlayer.value &&
      table.value[2][col] === currentPlayer.value
    ) {
      winner.value = currentPlayer.value
      dialog.value = true
    }
  }
}

function checkX() {
  if (
    table.value[0][0] === currentPlayer.value &&
    table.value[1][1] === currentPlayer.value &&
    table.value[2][2] === currentPlayer.value
  ) {
    winner.value = currentPlayer.value
    dialog.value = true
  } else if (
    table.value[0][2] === currentPlayer.value &&
    table.value[1][1] === currentPlayer.value &&
    table.value[2][0] === currentPlayer.value
  ) {
    winner.value = currentPlayer.value
    dialog.value = true
  }
}

async function getCurrentPlayer(x, y) {
  if (table.value[x][y] === '') {
    if (currentPlayer.value === 'X') {
      currentPlayer.value = 'O'
    } else {
      currentPlayer.value = 'X'
    }
    table.value[x][y] = currentPlayer.value
  }
  //Calculate winner

  checkRow()
  checkCol()
  checkX()
  checkDraw()
}
</script>

<template>
  <div style="font-size: 80px; text-align: center; margin-bottom: 50px">TIC TAC TOE</div>

  <v-card
    v-for="(row, x) in table"
    :key="x"
    style="
      display: flex;
      justify-content: center;
      background-color: #222831;
      margin: auto;
      width: 495px;
    "
  >
    <v-card
      v-for="(col, y) in row"
      :key="y"
      height="165"
      width="165"
      style="
        border-radius: 0;
        text-align: center;
        align-items: center;
        font-size: 100px;

        border: 3px solid white;
        background-color: #31363f;
      "
      @click="!winner ? getCurrentPlayer(x, y) : ''"
    >
      <strong :class="col === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
        {{ col }}</strong
      >
    </v-card>
  </v-card>

  <div style="text-align: center; font-size: 72px; margin-top: 50px">
    Player :
    <strong
      v-if="!winner"
      :class="currentPlayer === 'O' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'"
    >
      {{ currentPlayer === 'O' ? 'X' : 'O' }}</strong
    >
    <strong v-else :class="currentPlayer === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
      {{ currentPlayer }}</strong
    >
  </div>
  <div style="text-align: center">
    <v-btn
      width="200"
      height="50"
      color="#9a8c98"
      @click="clearTable()"
      style="
        color: black;
        font-size: 30px;
        border: 5px solid #f2e9e4;
        border-radius: 15px;
        margin-top: 30px;
      "
      >reset</v-btn
    >
  </div>
  <WinnerDialog></WinnerDialog>
</template>
