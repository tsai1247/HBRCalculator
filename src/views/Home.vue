<template>
  <div>
    <set-team
      :value="setTeamDialog"
      v-on:update="updateTeam"
      v-on:close="showSetTeamDialog(false)"
    ></set-team>
    <team-view
      :characters="team"
      v-on:clicked="showSetTeamDialog(true)"
    ></team-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import characterList from '@/common/character.json'

import teamView from '@/components/teamView.vue';
import setTeam from '@/components/setTeam.vue';
const team = ref([characterList[0]]);

function updateTeam(newList) {
  team.value = newList;
}

const setTeamDialog = ref(true);
function showSetTeamDialog(value) {
  setTeamDialog.value = value;
}

</script>

<style scoped>
</style>
