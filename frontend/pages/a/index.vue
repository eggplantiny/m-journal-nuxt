<template>
  <v-row justify="center">
    <v-col cols="12" sm="4">
      <v-btn
        color="blue lighten-2"
        elevation="0"
        block
        large
        dark
        @click="loginWithGoogle"
      >
        <v-icon class="mx-2">
          mdi-google
        </v-icon>
        구글로 로그인 하기
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        color="red lighten-2"
        elevation="0"
        block
        large
        dark
        @click="checkUser"
      >
        <v-icon class="mx-2">
          mdi-call
        </v-icon>
        CHECK USER
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        color="red lighten-2"
        elevation="0"
        block
        large
        dark
        @click="openDialog"
      >
        <v-icon class="mx-2">
          mdi-call
        </v-icon>
        openDialog
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Authentication',
  middleware: ['auth'],
  methods: {
    async loginWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth.signInWithPopup(provider)
    },
    async checkUser () {
      const { userInfo, exists } = await this.$axios.get('/auth/CheckUser').then(({ data }) => data.result)
      if (exists) {
        return this.$dialog.notify.info(JSON.stringify(userInfo))
      }
      return this.$dialog.notify.error('유저정보가 없습니다.')
    },
    openDialog () {
      this.$store.dispatch('dialog/loginOpen')
    }
  }
}
</script>

<style scoped>

</style>
