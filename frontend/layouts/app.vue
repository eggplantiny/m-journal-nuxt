<template>
  <v-app app>
    <app-bar />
    <drawer-menu />
    <v-main class="main">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/organisms/AppBar'
import DrawerMenu from '@/components/organisms/DrawerMenu'
export default {
  name: 'AppLayout',
  components: { DrawerMenu, AppBar }
}
</script>

<style scoped>
.main {
  max-width: 600px;
  width: 100%;
  margin: auto;
}
</style>
