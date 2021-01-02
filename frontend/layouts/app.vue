<template>
  <v-app>
    <app-bar />
    <v-main class="main">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '~/components/organisms/AppBar'
export default {
  name: 'AppLayout',
  components: { AppBar }
}
</script>

<style scoped>
.main {
  max-width: 600px;
  width: 100%;
  margin: auto;
}
</style>
