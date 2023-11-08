<template>
  <div v-if="props.value">
    <v-virtual-scroll
      height="100%"
      width="100%"
      :items="skillList"
    >
      <template v-slot:default="{ item }">
        <v-row class="ma-2">
          <v-col cols="1">
            <div>{{ item.count ?? 0 }}</div>
          </v-col>
          <v-col>

            <v-tooltip :text="$t(item.description)">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  @click="selectSkill(item.name)"
                  @contextmenu.prevent="selectSkill(item.name, -1)"
                  rounded
                  text
                  height="100%"
                >
                  <div class="text-left">
                    <span class="text-h6 font-weight-bold">{{$t(item.name)}}</span>
                    <v-spacer />

                    <v-chip
                      v-for="tag in item.tags"
                      :key="tag"
                      class="ma-2"
                      color="purple"
                      text-color="white"
                    > {{ $t(tag) }} </v-chip>
                  </div>

                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
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

function selectSkill(name, step = 1) {
  const idx = skillList.value.findIndex(item => item.name === name);
  const count = skillList.value[idx].count ?? 0;
  skillList.value[idx].count = (count + 3 + step) % 3;
}

</script>
<style scoped>
</style>
