<template>
  <v-row>
    <v-col>
      <v-card
        flat
        outlined
        elevation="0"
        max-width="400"
        class="mx-auto"
      >
        <v-card-title>
          로그인
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="primary"
            large
            block
            outlined
            @click="loginWithGoogle"
          >
            <v-icon class="mx-2">
              mdi-google
            </v-icon>
            구글로 로그인 하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    async loginWithGoogle () {
      //  구글 로그인 시도
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        await this.$fire.auth.signInWithPopup(provider)
        const idToken = await this.$fire.auth.currentUser.getIdToken()
        this.$axios.setToken(idToken, 'Bearer')
      } catch (e) {
        this.$dialog.notify.error(e)
      }

      try {
        const { userInfo, exists } = await this.$store.dispatch('auth/fetchUser')

        if (exists) {
          const { uid } = userInfo
          await this.$router.replace(`/Diary/${uid}`)
        } else {
          return this.$router.push('/a/SignUp')
        }
      } catch (e) {
        return this.$dialog.notify.error(e)
      }
    }
  },
  head () {
    return {
      title: '로그인'
    }
  }
}
</script>

<style scoped>

</style>
