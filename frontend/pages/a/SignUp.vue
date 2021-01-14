<template>
  <v-row>
    <v-col cols="12">
      <v-card
        flat
        outlined
        max-width="400"
        class="mx-auto"
      >
        <v-card-title class="justify-center">
          회원가입
        </v-card-title>
        <div class="px-4 pb-2">
          <v-text-field
            v-model="nickName"
            flat
            outlined
            solo
            hide-details="auto"
            label="닉네임"
          />
        </div>
        <v-card-actions class="px-4 pb-4">
          <v-btn
            color="primary"
            large
            block
            outlined
            @click="signUp"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      nickName: ''
    }
  },
  methods: {
    async signUp () {
      const { nickName } = this
      const dark = false
      const color = '#e3f6f5'

      if (nickName.length < 2) {
        return this.$dialog.notify.error('닉네임은 2글자 이상 입력해주세요 😊')
      }

      const { uid } = await this.$axios.post('/auth/SignUp', { nickName, dark, color }).then(({ data }) => data.result)
      this.$dialog.notify.success(`반갑습니다 ${nickName} 님 😀`).then(() => {})
      return this.$router.replace(`/Diary/${uid}`)
    }
  },
  head () {
    return {
      title: '회원가입'
    }
  }
}
</script>

<style scoped>

</style>
