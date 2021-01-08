<template>
  <v-app-bar
    app
    dark
    elevate-on-scroll
    elevation="0"
    color="indigo lighten-1"
  >
    <div class="app-bar">
      <v-toolbar-title>
        <template v-if="userInfo === null">
          하루일기
        </template>
        <template v-else>
          {{ userInfo.nickName }} 님의 하루일기
        </template>
      </v-toolbar-title>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  computed: {
    userInfo () {
      return this.$store.getters['auth/user'] || null
    }
  }
}
</script>

<style scoped lang="scss">
.app-bar {
  max-width: 576px;
  width: 100%;
  margin: auto;
}
</style>
