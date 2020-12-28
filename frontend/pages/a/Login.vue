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
        this.model = false
        this.$dialog.notify.error(e)
      }

      try {
        const { userInfo, exists } = await this.$axios.get('/auth/CheckUser').then(({ data }) => data.result)

        if (exists) {
          const { uid, nickName } = userInfo
          this.model = false
          this.$dialog.notify.success(`안녕하세요 ${nickName} 님 😊`)
          return this.$router.push(`/u/${uid}`)
        } else {
          this.$dialog.notify.warning('회원가입이 필요합니다 😊')
          this.step = 'sign_up'
        }
      } catch (e) {
        return this.$dialog.notify.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
