<template>
  <v-app-bar
    :color="color"
    app
    dark
    elevate-on-scroll
    elevation="0"
  >
    <div class="app-bar">
      <v-app-bar-nav-icon
        v-if="userInfo"
        @click="openDialog"
      />
      <span class="app-bar-title">
        <template v-if="userInfo === null">
          하루일기
        </template>
        <template v-else>
          {{ userInfo.nickName }} 님의 하루일기
        </template>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  computed: {
    userInfo () {
      return this.$store.getters['auth/user'] || null
    },
    color () {
      return this.$store.getters['setting/color']
    }
  },
  methods: {
    openDialog () {
      this.$store.dispatch('drawer/open')
    }
  }
}
</script>

<style scoped lang="scss">
.app-bar {
  max-width: 600px;
  width: 100%;
  margin: auto;
}

span.app-bar-title {
  font-size: 1em;
  padding-left: 4px;
}
</style>
