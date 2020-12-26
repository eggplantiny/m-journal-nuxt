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
        <div class="px-4 mb-4">
          <v-text-field
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
  name: 'SignUp'
}
</script>

<style scoped>

</style>
