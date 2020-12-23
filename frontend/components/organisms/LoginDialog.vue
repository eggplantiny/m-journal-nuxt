<template>
  <v-dialog
    v-model="model"
    max-width="480"
    transition="fade"
    overlay-opacity="0.1"
  >
    <v-card
      flat
      outlined
      elevation="0"
    >
      <v-card-title>
        로그인
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'LoginDialog',
  computed: {
    model: {
      get () {
        return this.$store.getters['loginDialog/model']
      },
      set (value) {
        if (value === true) {
          this.$store.dispatch('loginDialog/openDialog')
        } else {
          this.$store.dispatch('loginDialog/closeDialog')
        }
      }
    }
  },
  methods: {
    async loginWithGoogle () {
      //  구글 로그인 시도
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        await this.$fire.auth.signInWithPopup(provider)
        const idToken = await this.$fire.auth.currentUser.getIdToken()
        this.$axios.setToken(idToken, 'Bearer')
      } catch (e) {
        console.error(e)
        await this.$dialog.notify.error('에러가 발생했어요 😲')
        this.model = false
      }

      try {
        const { data } = await this.$axios.get('/auth/CheckUser')
        console.log(data)
      } catch (e) {
        await this.$dialog.notify.error('에러가 발생했어요 😲')
        console.error(e)
      }

      this.model = false
    }
  }
}
</script>

<style scoped>

</style>
