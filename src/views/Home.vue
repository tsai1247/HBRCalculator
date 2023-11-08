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
      v-on:close="showSetSkillDialog(false)"
    ></set-skill>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import characterInfo from '@/common/characterInfo';
import teamView from '@/components/teamView.vue';
import setTeam from '@/components/setTeam.vue';
import setSkill from '@/components/setSkill.vue';
const team = ref([characterInfo.basic[0]]);

function updateTeam(newList) {
  team.value = newList;
}

const setTeamDialog = ref(false);
function showSetTeamDialog(value = null) {
  setTeamDialog.value = value ?? !setTeamDialog.value;
}

const setSkillDialog = ref(false);
function showSetSkillDialog(value = null) {
  setSkillDialog.value = value ?? !setSkillDialog.value;
}

</script>

<style scoped>
</style>
