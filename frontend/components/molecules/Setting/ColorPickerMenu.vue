<template>
  <v-menu
    v-model="menu"
    max-width="600"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :color="model"
        elevation="1"
        large
        block
        dark
        v-on="on"
      >
        {{ model }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        테마 색상 변경
      </v-card-title>
      <v-color-picker
        v-model="model"
        canvas-height="300"
        class="ma-auto"
      />
    </v-card>
  </v-menu>
</template>

<script>
import { model } from '~/mixins'

export default {
  name: 'ColorPickerMenu',
  mixins: [model],
  data () {
    return {
      menu: false
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
