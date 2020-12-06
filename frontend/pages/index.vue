<template>
  <v-row>
    <v-col cols="12" sm="6">
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-timeline
        dense
        clipped
      >
        <template v-for="(item, index) in items">
          <v-timeline-item
            :key="`${index}-timeline-item`"
            small
          >
            <v-hover
              v-slot:default="{ hover }"
            >
              <v-card
                flat
                outlined
                elevation="0"
                :color="hover ? 'indigo' : 'white'"
                :dark="hover"
              >
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-text>
                  {{ item.description }}
                </v-card-text>
              </v-card>
            </v-hover>
          </v-timeline-item>
        </template>
      </v-timeline>
    </v-col>
    <v-btn
      fab
      fixed
      bottom
      right
      dark
      color="indigo lighten-1"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Root',
  data () {
    const date = moment().toDate()
    return {
      hello: 'World',
      date,
      items: [
        {
          startTime: '2020-12-05 13:05',
          title: 'Hello World',
          description: 'It is first item of this app.'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
</style>
