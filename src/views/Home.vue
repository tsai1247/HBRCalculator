<template>
  <div>
    <div>
      <v-row>
        <v-col
          cols="2"
          class="ma-2"
        >
          <v-select
            :label="$t('t_system_chooseLanguage')"
            :items="['jp', 'en-US', 'zh-TW']"
            v-model="$i18n.locale"
            :width="100"
          ></v-select>
        </v-col>
      </v-row>
    </div>

    <set-team
      :value="setTeamDialog"
      v-on:update="updateTeam"
      v-on:close="showSetTeamDialog(false)"
    ></set-team>
    <team-view
      :characters="team"
      v-on:clicked="showSetTeamDialog(true)"
      v-on:setSkill="showSetSkillDialog"
    ></team-view>
    <v-row class="ma-1">
      <v-col cols="9">
        <set-skill
          :value="setSkillDialog"
          :allSkillList="skills"
          :characterId="selectedId"
          v-on:update="updateSkillList"
        ></set-skill>
      </v-col>
      <v-col cols="3">
        <enemy></enemy>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import characterInfo from '@/common/characterInfo';
import teamView from '@/components/teamView.vue';
import setTeam from '@/components/setTeam.vue';
import setSkill from '@/components/setSkill.vue';
import enemy from '@/components/enemy.vue';

const team = ref(characterInfo.basic.slice(0, 6));
import allSkillList from '@/common/skill.json'
const skills = ref(allSkillList);


const selectedId = ref("");
function updateTeam(newList) {
  team.value = newList;
  showSetSkillDialog("");
}

const setTeamDialog = ref(false);
function showSetTeamDialog(value = null) {
  setTeamDialog.value = value ?? !setTeamDialog.value;
}

const setSkillDialog = ref(false);
function showSetSkillDialog(id) {
  setSkillDialog.value = id !== "";
  selectedId.value = id;
}

function updateSkillList(id, skill, ability) {
  const idx = skills.value.findIndex(item => item.id === id)
  skills.value[idx].skills = skill;
  skills.value[idx].ability = ability;
}

</script>

<style scoped>
</style>
