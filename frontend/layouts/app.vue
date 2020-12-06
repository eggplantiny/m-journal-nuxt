<template>
  <v-app>
    <v-main class="main">
      <v-container>
        <nuxt />
      </v-container>
      <v-btn
        fab
        absolute
        bottom
        right
        dark
        color="indigo lighten-1"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
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
