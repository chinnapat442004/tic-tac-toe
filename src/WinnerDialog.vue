<script setup>
import { inject } from 'vue'
import { useTableStore } from './store/table'

const dialog = inject('dialog')
const tableStore = useTableStore()
async function clear() {
  await tableStore.clearTable()
  dialog.value = false
}
</script>
<template>
  <v-dialog v-model="dialog" width="550" persistent
    ><v-card height="310" color="#222831" style="border: 3px solid #e0e1dd; border-radius: 15px"
      ><div
        v-if="tableStore.empty === true"
        style="text-align: center; font-size: 60px; margin-top: 50px"
      >
        Winner is
        <strong :class="tableStore.winner === 'X' ? 'text-red-lighten-1' : 'text-cyan-lighten-1'">
          {{ tableStore.winner }}</strong
        >
      </div>
      <div v-else style="text-align: center; font-size: 60px; margin-top: 50px">Draw</div>
      <div style="text-align: center">
        <v-btn
          width="230"
          height="50"
          color="#9a8c98"
          @click="clear()"
          style="
            color: black;
            font-size: 27px;
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
