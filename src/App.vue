<script setup>
import { ref } from 'vue'
const currentPlayer = ref('X')
const winner = ref()

const table = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
])

function checkRow() {
  for (let row = 0; row < 3; row++) {
    if (
      table.value[row][0] === currentPlayer.value &&
      table.value[row][1] === currentPlayer.value &&
      table.value[row][2] === currentPlayer.value
    )
      winner.value = currentPlayer.value
  }
}

function checkCol() {
  for (let col = 0; col < 3; col++) {
    if (
      table.value[0][col] === currentPlayer.value &&
      table.value[1][col] === currentPlayer.value &&
      table.value[2][col] === currentPlayer.value
    )
      winner.value = currentPlayer.value
  }
}

function checkX() {
  if (
    table.value[0][0] === currentPlayer.value &&
    table.value[1][1] === currentPlayer.value &&
    table.value[2][2] === currentPlayer.value
  ) {
    winner.value = currentPlayer.value
  } else if (
    table.value[0][2] === currentPlayer.value &&
    table.value[1][1] === currentPlayer.value &&
    table.value[2][0] === currentPlayer.value
  ) {
    winner.value = currentPlayer.value
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
      @click="getCurrentPlayer(x, y)"
    >
      <strong :class="col === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
        {{ col }}</strong
      >
    </v-card>
  </v-card>
  <div v-if="winner" style="text-align: center; font-size: 72px; margin-top: 50px">
    winner is {{ winner }}
  </div>
  <div v-else style="text-align: center; font-size: 72px; margin-top: 50px">
    Player {{ currentPlayer === 'X' ? 'O' : 'X' }}
  </div>
</template>
