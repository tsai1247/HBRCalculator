<template>
  <div v-if="props.value">

    <v-row
      class="ma-2"
      v-for="{count, name, description} in skillList"
      :key="name"
    >
      <v-col cols="1">
        <div>{{ count ?? 0 }}</div>
      </v-col>
      <v-col cols="4">
        <v-chip
          @click="selectSkill(name)"
          class="no-selectable"
        >
          <div>{{$t(name)}}</div>
          <div>{{$t(description)}}</div>
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue';
import allSkillList from '@/common/skill.json'
const props = defineProps({
  value: Boolean,
  characterId: String
});


const skillList = ref([]);

watch(() => props.characterId, () => {
  skillList.value = allSkillList.filter((item) => {
    return item.id === props.characterId
  })[0]?.skills;
})

function selectSkill(name) {
  const idx = skillList.value.findIndex(item => item.name === name);
  const count = skillList.value[idx].count ?? 0;
  skillList.value[idx].count = (count + 1) % 3;
}

</script>
<style scoped>
  .no-selectable {
    user-select: none;
  }
</style>
