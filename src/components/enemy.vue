<template>
  <div>
    <v-autocomplete
      v-model="selectedEnemy"
      :items="enemyList"
      item-title="Name"
      return-object
      :label="$t('t_system_emeny')"
    ></v-autocomplete>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';

  const emit = defineEmits(['update']);
  const props = defineProps({
    enemyList: Array,
    defaultEnemy: Object
  });

  const selectedEnemy = ref(null);

  watch(() => props.defaultEnemy, () => {
    if(selectedEnemy.value !== props.defaultEnemy) {
      selectedEnemy.value = props.defaultEnemy
    }
  })

  watch(() => selectedEnemy.value, () => {
    emit('update', selectedEnemy.value);
  })

</script>

<style scoped>
</style>
