<template>
  <div v-if="props.value">
    <v-row>
      <v-col cols="4">
        <v-virtual-scroll
          height="400px"
          :items="skillList"
        >
          <template v-slot:default="{ item }">
            <div class="ma-4">
              <v-tooltip class="tooltip">
                <template v-slot:default>
                  <div>
                    <div>
                      {{$t(item.description)}}
                    </div>
                    <div
                      v-if="item.count"
                      class="selected"
                    >
                      已選擇 {{item.count}} 次
                    </div>
                    <div
                      v-else
                      class="noselected"
                    >
                      已選擇 0 次
                    </div>
                  </div>
                </template>
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
                      <span class="text-h6 font-weight-bold">
                        {{$t(item.name)}}
                        <span
                          v-for="n in item.count"
                          :key="n"
                          class="ml-1 purple"
                        >●</span>
                      </span>
                      <v-spacer />
                      <v-chip
                        v-for="tag in item.tags"
                        :key="tag"
                        class="ma-2"
                        color="purple"
                        text-color="white"
                      > {{ $t(tag) }} </v-chip>
                      <v-chip
                        v-if="item.hits"
                        class="ma-2"
                        color="purple"
                        text-color="white"
                      > {{item.hits}}{{ $t('t_tags_hits') }}</v-chip>
                    </div>

                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue';
import i18n from '@/plugins/i18n'
const { t } = i18n.global

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
  .tooltip {
    user-select: none;
  }

  .purple {
    color: purple;
  }

  .selected {
    color: lightgreen;
  }

  .noselected {
    color: gray;
  }
</style>
