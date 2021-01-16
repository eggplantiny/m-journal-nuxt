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

<script>
export default {
  name: 'Root',
  layout: 'app',
  data () {
    return {
    }
  },
  computed: {
    color () {
      return this.$store.getters['setting/color']
    }
  },
  methods: {
    startApp () {
      this.$router.replace('/Diary')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
