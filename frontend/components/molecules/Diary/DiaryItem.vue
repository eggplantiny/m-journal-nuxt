<template>
  <v-card
    flat
    :elevation="hover ? 3 : 0"
    :color="hover ? item.color : 'white'"
    :dark="hover"
  >
    <template v-if="item.type === 'button'">
      <v-card-title class="pa-0">
        <v-btn
          block
          text
          rounded
          large
          @click="addItem"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-card-title>
    </template>
    <template v-else>
      <v-row no-gutters>
        <v-col cols="10">
          <v-card-title>
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ formatTime(item.startAt) }}
          </v-card-subtitle>
          <v-card-text
            v-if="detail === true"
          >
            {{ item.description }}
          </v-card-text>
        </v-col>
        <v-col cols="2" align-self="end">
          <v-fade-transition>
            <v-card-actions v-show="hover">
              <v-spacer />
              <v-btn icon dark @click="toggleDetail">
                <v-icon>
                  {{ detail ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                </v-icon>
              </v-btn>
              <v-btn icon dark @click="deleteItem">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-fade-transition>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DiaryItem',
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      detail: true
    }
  },
  beforeMount () {
    const detail = this.$store.getters['setting/detail']
    this.detail = detail === true
  },
  methods: {
    addItem () {
      this.$emit('add')
    },
    deleteItem () {
      this.$emit('delete')
    },
    toggleDetail () {
      this.detail = !this.detail
    },
    formatTime (value) {
      return moment(value).format('HH시 mm분')
    }
  }
}
</script>

<style scoped>

</style>
