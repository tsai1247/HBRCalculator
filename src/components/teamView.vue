<template>
  <div>
    <v-footer app="true">
      <div
        v-for="{id, src} in props.characters"
        :key="id"
        class="ma-2"
      >
        <v-list-item
          @mousedown="character_mousedown"
          @drag="character_drag"
          @mouseup="character_mouseup"
          @click="null"
        >
          <img
            width="100"
            :src="script.getImageUrl(src)"
          >
        </v-list-item>
      </div>
    </v-footer>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import script from '@/common/script'

  const emit = defineEmits(['clicked', 'setSkill']);
  const props = defineProps({
    characters: Array
  });

  watch( () => props.characters, () => {
  })

  const timeOutEvent = ref(0);
  function character_mousedown() {
    timeOutEvent.value = setTimeout(() => {
      longPress()
    }, 400);
    return false;
  }

  const showSetSkillDialog = ref(false);
  function character_mouseup() {
    clearTimeout(timeOutEvent.value);
    if(timeOutEvent.value != 0) {
      showSetSkillDialog.value = !showSetSkillDialog.value;
      emit('setSkill');
    }
    return false;
  }

  function character_drag() {
    clearTimeout(timeOutEvent.value);
    timeOutEvent.value = 0;
  }

  function longPress() {
    timeOutEvent.value = 0
    emit('clicked');
  }
</script>

<style scoped>
  .right-bar {
    float: right;
  }
</style>
