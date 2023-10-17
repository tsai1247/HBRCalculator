<template>
  <div v-if="props.value">
    <v-navigation-drawer location="right">
      <v-btn @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-list-item
        title="選擇角色"
        :subtitle="`${selectedCount} / 6`"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="{id, name, src} in characterInfo.basic"
        :key="id"
        :class="isSelectedClass(id)"
        :disabled="isDisabled(id)"
        @click="characterClicked(id, name, src)"
      >
        {{ $t(name) }}
        <v-spacer></v-spacer>
        <img
          width="100"
          :src="script.getImageUrl(src)"
        >
        <h2 v-if="selectedIndex(id) > 0">{{selectedIndex(id)}}</h2>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script setup>

import { ref, computed, defineEmits, defineProps, watch } from 'vue';
import characterInfo from '@/common/characterInfo'
import script from '@/common/script'

const emit = defineEmits(['close', 'update']);
const props = defineProps({
  value: Boolean,
});

const selectedCharacters = ref([characterInfo.basic[0]]);
watch(() => selectedCharacters.value, () => {
  emit('update', selectedCharacters.value)
}, {deep: true})

const selectedCount = computed( () => {
  return selectedCharacters.value.length
})

function characterClicked(id, name, src) {
  const idx = selectedCharacters.value.findIndex(item => item.id === id);

  if(idx === -1) {
    selectedCharacters.value.push({
      id, name, src
    })
  }
  else {
    selectedCharacters.value.splice(idx, 1);
  }
}

function isSelectedClass(id) {
  const target = selectedCharacters.value.find(item => item.id === id);
  return target ? 'selected' : '';
}

function closeDialog() {
  console.log('close');
  emit('close');
}

function selectedIndex(id) {
  return selectedCharacters.value.findIndex(item => item.id === id) + 1
}

function isDisabled(id){
  const target = selectedCharacters.value.find(item => item.id === id);
  return selectedCount.value >= 6 && !target || selectedCount.value == 1 && target;
}

</script>
<style scoped>
  .selected {
    background: rgb(218, 218, 218);
  }
</style>
