<template>
  <v-row justify="center">
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
    <v-col cols="12">
      <v-btn
        class="mt-8"
        block
        dark
        large
        color="indigo lighten-2"
      >
        저장
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Setting',
  layout: 'app',
  data () {
    return {
      inputs: {
        nickName: '',
        dark: false,
        detail: false
      }
    }
  }
}
</script>

<style scoped>

</style>
