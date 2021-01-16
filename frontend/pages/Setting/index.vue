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
        <v-row no-gutters align="center">
          <v-col cols="3">
            <div class="text-center">
              닉네임
            </div>
          </v-col>
          <v-col cols="9">
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
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="12"
      >
        <v-row no-gutters align="center">
          <v-col cols="3">
            <div class="text-center">
              테마 색상
            </div>
          </v-col>
          <v-col cols="9">
            <color-picker-menu
              v-model="inputs.color"
            />
          </v-col>
        </v-row>
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
          :color="color"
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
          :color="color"
        />
      </v-col>
    </v-form>
    <v-col cols="12">
      <v-btn
        class="mt-8"
        block
        dark
        large
        :color="color"
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
import ColorPickerMenu from '~/components/molecules/Setting/ColorPickerMenu'
export default {
  name: 'Setting',
  components: { ColorPickerMenu },
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
  computed: {
    color () {
      return this.$store.getters['setting/color']
    }
  },
  beforeMount () {
    const userInfo = this.$store.getters['auth/user']
    const { nickName } = userInfo

    this.inputs.nickName = nickName
    this.inputs.dark = this.$store.getters['setting/dark']
    this.inputs.detail = this.$store.getters['setting/detail']
    this.inputs.color = this.$store.getters['setting/color']
  },
  methods: {
    async submit () {
      const valid = await this.$refs.form.validate()

      if (!valid) {
        return
      }

      const { nickName, dark, detail, color } = this.inputs

      try {
        await this.$store.dispatch('setting/update', { nickName, dark, detail, color })
        await this.$store.dispatch('auth/fetchUser')
      } catch (e) {
        return this.$dialog.notify.error(e)
      }

      this.$dialog.notify.success('설정이 정상적으로 저장되었습니다 😉')
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
