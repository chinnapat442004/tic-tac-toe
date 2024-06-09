<script setup>
import { provide } from 'vue'
import WinnerDialog from './WinnerDialog.vue'
import { useTableStore } from './store/table'
import { ref } from 'vue'
const tableStore = useTableStore()

const dialog = ref(false)

provide('dialog', dialog)

async function checkDraw() {
  if (!tableStore.winner) {
    outerLoop: for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tableStore.table[i][j] === '') {
          tableStore.empty = await true

          break outerLoop
        } else {
          tableStore.empty = false
        }
      }
    }
  }
}

function checkRow() {
  for (let row = 0; row < 3; row++) {
    if (
      tableStore.table[row][0] === tableStore.currentPlayer &&
      tableStore.table[row][1] === tableStore.currentPlayer &&
      tableStore.table[row][2] === tableStore.currentPlayer
    ) {
      tableStore.winner = tableStore.currentPlayer
      dialog.value = true
    }
  }
}

function checkCol() {
  for (let col = 0; col < 3; col++) {
    if (
      tableStore.table[0][col] === tableStore.currentPlayer &&
      tableStore.table[1][col] === tableStore.currentPlayer &&
      tableStore.table[2][col] === tableStore.currentPlayer
    ) {
      tableStore.winner = tableStore.currentPlayer
      dialog.value = true
    }
  }
}

function checkX() {
  if (
    tableStore.table[0][0] === tableStore.currentPlayer &&
    tableStore.table[1][1] === tableStore.currentPlayer &&
    tableStore.table[2][2] === tableStore.currentPlayer
  ) {
    tableStore.winner = tableStore.currentPlayer
    dialog.value = true
  } else if (
    tableStore.table[0][2] === tableStore.currentPlayer &&
    tableStore.table[1][1] === tableStore.currentPlayer &&
    tableStore.table[2][0] === tableStore.currentPlayer
  ) {
    tableStore.winner = tableStore.currentPlayer
    dialog.value = true
  }
}

async function getCurrentPlayer(x, y) {
  if (tableStore.table[x][y] === '') {
    if (tableStore.currentPlayer === 'X') {
      tableStore.currentPlayer = 'O'
    } else {
      tableStore.currentPlayer = 'X'
    }
    tableStore.table[x][y] = tableStore.currentPlayer
  }
  //Calculate winner

  checkRow()
  checkCol()
  checkX()
  await checkDraw()
  console.log(tableStore.empty)
  if (tableStore.empty === false) {
    dialog.value = true
  }
}
</script>

<template>
  <div style="font-size: 60px; text-align: center; margin: 20px 0px 20px 0px">TIC TAC TOE</div>

  <v-card
    v-for="(row, x) in tableStore.table"
    :key="x"
    elevation="0"
    style="display: flex; justify-content: center; background-color: #222831; margin: auto"
  >
    <v-card
      v-for="(col, y) in row"
      :key="y"
      height="125"
      width="125"
      style="
        border-radius: 0;
        text-align: center;
        align-items: center;
        font-size: 90px;

        border: 3px solid white;
        background-color: #31363f;
      "
      @click="!tableStore.winner ? getCurrentPlayer(x, y) : ''"
    >
      <strong :class="col === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
        {{ col }}</strong
      >
    </v-card>
  </v-card>

  <div style="text-align: center; font-size: 58px; margin-top: 25px">
    Player :
    <strong
      v-if="!tableStore.winner"
      :class="tableStore.currentPlayer === 'O' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'"
    >
      {{ tableStore.currentPlayer === 'O' ? 'X' : 'O' }}</strong
    >
    <strong
      v-else
      :class="tableStore.currentPlayer === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'"
    >
      {{ tableStore.currentPlayer }}</strong
    >
  </div>
  <div style="text-align: center">
    <v-btn
      width="200"
      height="43"
      color="#9a8c98"
      @click="tableStore.clearTable()"
      style="
        color: black;
        font-size: 25px;
        border: 5px solid #f2e9e4;
        border-radius: 15px;
        margin-top: 15px;
      "
      >reset</v-btn
    >
  </div>

  <WinnerDialog></WinnerDialog>
</template>
