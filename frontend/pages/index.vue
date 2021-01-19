<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-btn
        outlined
        x-large
        block
        :color="color"
        @click="startApp"
      >
        시작하기
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Root',
  layout: 'app',
  setup () {
    const { store, redirect } = useContext()
    const color = computed(() => store.getters['setting/color'])

    const startApp = () => {
      redirect('/Diary')
    }

    return {
      color,
      startApp
    }
  }
})

</script>
<style scoped lang="scss">
</style>
