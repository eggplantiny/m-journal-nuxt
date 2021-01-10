<template>
  <v-row>
    <v-col />
  </v-row>
</template>

<script>
export default {
  name: 'UserIndex',
  middleware: ['auth'],
  layout: 'app',
  mounted () {
    const { uid } = this.$store.getters['auth/user']
    this.$router.replace(`/Diary/${uid}`)
  },
  meta: {
    title: '다이어리'
  }
}
</script>

<style scoped>

</style>
