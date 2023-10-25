<template>
  <div>
    <v-header app="true">
      <v-row>
        <v-col
          cols="2"
          class="ma-2"
        >
          <v-select
            :label="$t('choose_language')"
            :items="['jp', 'en-US', 'zh-TW']"
            v-model="$i18n.locale"
            :width="100"
          ></v-select>
        </v-col>
      </v-row>
    </v-header>

    <set-team
      :value="setTeamDialog"
      v-on:update="updateTeam"
      v-on:close="showSetTeamDialog(false)"
    ></set-team>
    <team-view
      :characters="team"
      v-on:clicked="showSetTeamDialog()"
    ></team-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import characterInfo from '@/common/characterInfo';
import teamView from '@/components/teamView.vue';
import setTeam from '@/components/setTeam.vue';
const team = ref([characterInfo.basic[0]]);

function updateTeam(newList) {
  team.value = newList;
}

const setTeamDialog = ref(true);
function showSetTeamDialog(value = null) {
  setTeamDialog.value = value ?? !setTeamDialog.value;
}

</script>

<style scoped>
</style>
