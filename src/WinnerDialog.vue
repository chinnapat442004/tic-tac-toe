<script setup>
import { inject } from 'vue'

const dialog = inject('dialog')
const winner = inject('winner')
</script>
<template>
  <v-dialog v-model="dialog" width="600"
    ><v-card height="350" color="#222831" style="border: 3px solid #e0e1dd; border-radius: 15px"
      ><div style="text-align: center; font-size: 70px; margin-top: 50px">
        Winner is
        <strong :class="winner === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
          {{ winner }}</strong
        >
      </div>
      <div style="text-align: center">
        <v-btn
          width="250"
          height="60"
          color="#9a8c98"
          style="
            color: black;
            font-size: 30px;
            border: 5px solid #f2e9e4;
            border-radius: 15px;
            margin-top: 75px;
          "
        >
          Regeme</v-btn
        >
      </div>
    </v-card></v-dialog
  >
</template>
