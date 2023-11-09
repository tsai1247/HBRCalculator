<template>
  <div v-if="props.value">
    <v-row>
      <v-col
        cols="4"
        v-if="skillList && skillList.length"
      >
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
      <v-col
        cols="4"
        class="ma-4"
        v-else
      >
        <v-btn rounded> {{ $t("t_system_noSkillList") }} </v-btn>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.DP"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_DP')"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.HP"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_HP')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.STR"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_STR')"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.DEX"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_DEX')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.CON"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_CON')"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.SPR"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_SPR')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.WIS"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_WIS')"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              v-model="ability.LUK"
              @change="updateStatus"
              min="1"
              max="2000"
              :label="$t('t_system_LUK')"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';

const emit = defineEmits(['update']);
const props = defineProps({
  value: Boolean,
  characterId: String,
  allSkillList: Array
});


const skillList = ref([]);
const ability = ref({});

watch(() => props.characterId, () => {
  const character = props.allSkillList.filter((item) => {
    return item.id === props.characterId
  })[0];

  skillList.value = character?.skills;
  ability.value = character?.ability ?? {
    DP: 1,
    HP: 1,
    STR: 1,
    DEX: 1,
    CON: 1,
    SPR: 1,
    WIS: 1,
    LUK: 1
  };
})


function selectSkill(name, step = 1) {
  const idx = skillList.value.findIndex(item => item.name === name);
  const count = skillList.value[idx].count ?? 0;
  skillList.value[idx].count = (count + 3 + step) % 3;
  emit('update', props.characterId, skillList.value, ability.value);
}

function updateStatus() {
  emit('update', props.characterId, skillList.value, ability.value);
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
