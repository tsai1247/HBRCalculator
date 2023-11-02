<template>
  <div v-if="props.value">
    <v-autocomplete
      :items=" [
            '增強',
            '臥龍演武斬',
            '軟化',
            '萬紫千紅'
          ]"
      multiple
      chips
    >
    </v-autocomplete>
  </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
  value: Boolean,
});

function closeDialog() {
  emit('close');
}

</script>
<style scoped>
  .selected {
    background: rgb(218, 218, 218);
  }
</style>
