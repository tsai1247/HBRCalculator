<template>
  <div>
    <v-footer app="true">
      <div
        v-for="{id, src} in props.characters"
        :key="id"
        class="ma-2"
      >
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
        <v-list-item @click="characterClicked">
          <img
            width="100"
            :src="script.getImageUrl(src)"
          >
        </v-list-item>
      </div>
    </v-footer>
  </div>
</template>

<script setup>
  import { watch } from 'vue';
  import script from '@/common/script'

  const emit = defineEmits(['clicked']);
  const props = defineProps({
    characters: Array
  });

  watch( () => props.characters, () => {
  })

  function characterClicked() {
    emit('clicked');
  }
</script>

<style scoped>
  .right-bar {
    float: right;
  }
</style>
