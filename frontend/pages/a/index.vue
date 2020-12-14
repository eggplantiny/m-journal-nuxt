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
  </v-row>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Authentication',
  methods: {
    async loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      try {
        const res = await this.$fire.auth.signInWithPopup(provider)
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
