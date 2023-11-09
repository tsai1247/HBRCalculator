<template>
  <div>
    <v-autocomplete
      v-model="result"
      :items="EnemyList"
      item-title="Name"
      return-object
      :label="$t('t_system_emeny')"
    ></v-autocomplete>
    <div v-if="false">{{ result }}</div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import script from '@/common/script'
  import EnemyList from '@/common/enemy';
  const props = defineProps({
    selectedEnemy: Object
  });

  const result = ref(null);

</script>

<style scoped>
  .right-bar {
    float: right;
  }
</style>
