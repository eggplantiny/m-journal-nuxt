<template>
  <v-row />
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DiaryIndex',
  middleware: ['auth'],
  layout: 'app',
  setup () {
    const { store, redirect } = useContext()
    const { uid } = store.getters['auth/user']
    redirect(`/Diary/${uid}`)
  }
})

// export default {
//   name: 'UserIndex',
//   middleware: ['auth'],
//   layout: 'app',
//   created () {
//     const { uid } = this.$store.getters['auth/user']
//     this.$router.replace(`/Diary/${uid}`)
//   },
//   meta: {
//     title: '다이어리'
//   }
// }
</script>

<style scoped>

</style>
