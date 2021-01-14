<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-btn
        outlined
        x-large
        block
        color="indigo lighten-1"
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
  methods: {
    startApp () {
      this.$router.replace('/Diary')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
