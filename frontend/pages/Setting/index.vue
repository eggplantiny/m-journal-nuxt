<template>
  <v-row justify="center">
    <v-form
      ref="form"
      class="setting-form"
      lazy-validation
    >
      <v-col
        cols="12"
        sm="12"
        class="py-0"
      >
        <v-text-field
          v-model="inputs.nickName"
          label="닉네임"
          outlined
          solo
          flat
          hide-details="auto"
          :rules="rules.required"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        class="py-0"
      >
        <v-checkbox
          v-model="inputs.detail"
          label="일기 자세히보기"
          hide-details="auto"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        class="py-0"
      >
        <v-checkbox
          v-model="inputs.dark"
          label="다크모드"
          hide-details="auto"
        />
      </v-col>
    </v-form>
    <v-col cols="12">
      <v-btn
        class="mt-8"
        block
        dark
        large
        color="indigo lighten-2"
        @click="submit"
      >
        저장
      </v-btn>
    </v-col>
    <v-col cols="12">
      <div class="text-center">
        Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Setting',
  layout: 'app',
  middleware: ['auth'],
  data () {
    return {
      inputs: {
        nickName: '',
        dark: false,
        detail: false,
        color: ''
      },
      rules: {
        required: [
          v => !!v || '입력해주세요 😉'
        ]
      }
    }
  },
  beforeMount () {
    const userInfo = this.$store.getters['auth/user']
    const { dark, nickName, detail, color } = userInfo

    this.inputs.nickName = nickName
    this.inputs.dark = dark === true
    this.inputs.detail = detail === true
    this.inputs.color = color
  },
  methods: {
    async submit () {
      const valid = await this.$refs.form.validate()

      if (!valid) {
        return
      }

      const { nickName, dark, detail, color } = this.inputs

      try {
        await this.$axios.$put('/settings', {
          nickName, dark, detail, color
        })
      } catch (e) {
        return this.$dialog.notify.error(e)
      }

      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.setting-form {
  width: 100%;
}
</style>
