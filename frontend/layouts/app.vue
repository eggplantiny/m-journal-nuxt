<template>
  <v-app>
    <v-main class="main">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style scoped>
.main {
  max-width: 800px;
}
</style>
