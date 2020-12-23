<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <login-dialog />
  </v-app>
</template>

<script>
import LoginDialog from '~/components/organisms/LoginDialog'
export default {
  name: 'DefaultLayout',
  components: {
    LoginDialog
  },
  layout: 'AppLayout',
  data () {
    return {
    }
  }
}
</script>
