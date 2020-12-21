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
        @click="signUp"
      >
        <v-icon class="mx-2">
          mdi-call
        </v-icon>
        SIGN UP
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Authentication',
  mounted () {
    this.$fireAuthStore.subscribe()
  },
  methods: {
    async loginWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      try {
        // const { additionalUserInfo, credential } = await this.$fire.auth.signInWithPopup(provider)
        // console.log({ additionalUserInfo, credential })

        await this.$fire.auth.signInWithPopup(provider)
      } catch (e) {
        console.error(e)
      }
    },
    async checkUser () {
      try {
        const res = await this.$axios.get('/auth/CheckUser')

        console.log('Check User', res)
      } catch (e) {
        console.error(e)
      }
    },
    async signUp () {
      try {
        const res = await this.$axios.get('/auth/SignUp')

        console.log('Sign Up', res)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
