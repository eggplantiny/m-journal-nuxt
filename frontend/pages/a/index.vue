<template>
  <v-row justify="center">
    <v-col />
  </v-row>
</template>

<script>

export default {
  name: 'Authentication',
  middleware: ['auth'],
  mounted () {
    this.$router.replace('/Diary')
  }
}
</script>

<style scoped>

</style>
