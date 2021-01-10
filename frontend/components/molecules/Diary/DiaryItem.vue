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
          <v-card-subtitle class="py-0">
            {{ formatTime(item.startAt) }}
          </v-card-subtitle>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </v-col>
        <v-col cols="2" align-self="end">
          <v-fade-transition>
            <v-card-actions v-show="hover">
              <v-spacer />
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
  methods: {
    addItem () {
      this.$emit('add')
    },
    deleteItem () {
      this.$emit('delete')
    },
    formatTime (value) {
      return moment(value).format('HH시 mm분')
    }
  }
}
</script>

<style scoped>

</style>
