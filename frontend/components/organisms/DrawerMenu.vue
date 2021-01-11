<template>
  <v-navigation-drawer
    v-model="model"
    color="indigo lighten-1"
    app
    dark
    hide-overlay
  >
    <template v-slot:append>
      Hello World
    </template>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block>
          로그아웃
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerMenu',
  data () {
    return {
      items: [
        { title: '일기 쓰기', icon: 'mdi-pencil-outline' },
        { title: '설정', icon: 'mdi-cog' }
      ]
    }
  },
  computed: {
    model: {
      get () {
        return this.$store.getters['drawer/model']
      },
      set (value) {
        if (value === true) {
          this.$store.dispatch('drawer/open')
        } else {
          this.$store.dispatch('drawer/close')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
