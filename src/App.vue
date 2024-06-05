<script setup>
import { ref } from 'vue'
const table = ref([
  ['X', 'O', ''],
  ['', '', ''],
  ['', '', '']
])
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
        color: green;
        border: 3px solid white;
        background-color: #31363f;
      "
    >
      {{ col }}
    </v-card>
  </v-card>
</template>
