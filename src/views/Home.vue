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
    <set-skill
      :value="setSkillDialog"
      :characterId="selectedId"
    ></set-skill>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import characterInfo from '@/common/characterInfo';
import teamView from '@/components/teamView.vue';
import setTeam from '@/components/setTeam.vue';
import setSkill from '@/components/setSkill.vue';
const team = ref(characterInfo.basic.slice(0, 6));


const selectedId = ref("");
function updateTeam(newList) {
  team.value = newList;
  showSetSkillDialog(selectedId.value);
}

const setTeamDialog = ref(false);
function showSetTeamDialog(value = null) {
  setTeamDialog.value = value ?? !setTeamDialog.value;
}

const setSkillDialog = ref(false);
function showSetSkillDialog(id) {
  setSkillDialog.value = selectedId.value !== id;
  selectedId.value = selectedId.value !== id ? id : "";
}


</script>

<style scoped>
</style>
