<template>
  <div>
    <v-footer>
      <v-list-item
        v-for="{id, src} in props.characters"
        :key="id"
        @click="characterClicked"
      >
        <img
          width="100"
          :src="script.getImageUrl(src)"
        >
      </v-list-item>
    </v-footer>
  </div>
</template>

<script setup>
  import { watch, defineEmits, defineProps } from 'vue';
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
