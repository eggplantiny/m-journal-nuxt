<template>
  <v-dialog
    v-model="model"
    max-width="480"
    transition="fade"
    overlay-opacity="0.1"
    persistent
  >
    <!-- 로그인 버튼 -->
    <v-card
      flat
      outlined
      elevation="0"
    >
      <template v-if="step === 'login'">
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
      </template>
      <template v-else-if="step === 'sign_up'">
        <v-card-title>
          회원가입
        </v-card-title>
        <div class="px-4 mb-2">
          <v-text-field
            v-model="nickName"
            flat
            outlined
            solo
            hide-details="auto"
            label="닉네임"
          />
        </div>
        <v-card-actions class="px-4">
          <v-btn
            color="primary"
            large
            block
            outlined
            @click="signUp"
          >
            회원가입
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'LoginDialog',
  data () {
    return {
      step: 'login',
      nickName: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.$store.getters['dialog/loginDialog']
      },
      set (value) {
        if (value === true) {
          this.$store.dispatch('dialog/loginOpen')
        } else {
          this.$store.dispatch('dialog/loginClose')
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
    },
    async signUp () {
      const { nickName } = this
      const dark = false
      const color = '#e3f6f5'

      if (nickName.length < 2) {
        return this.$dialog.notify.error('닉네임은 2글자 이상 입력해주세요 😊')
      }

      try {
        const { uid } = await this.$axios.post('/auth/SignUp', { nickName, dark, color }).then(({ data }) => data.result)
        this.$dialog.notify.success(`반갑습니다 ${nickName} 님 😀`)
        this.$router.push(`/u/${uid}`)
      } catch (e) {
        return this.$dialog.notify.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
