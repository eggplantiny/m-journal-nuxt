<template>
  <v-row justify="center">
    <v-col cols="12" sm="5" class="py-0">
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
      />
    </v-col>
    <v-col cols="12" sm="7" class="py-0">
      <v-timeline
        dense
        clipped
        reverse
      >
        <template v-for="(item, index) in items">
          <v-hover
            v-slot:default="{ hover }"
            :key="`${index}-timeline-item`"
          >
            <v-timeline-item
              :color="item.color"
              :small="!hover"
            >
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
                        {{ item.startTime }}
                      </v-card-subtitle>
                      <v-card-text>
                        {{ item.description }}
                      </v-card-text>
                    </v-col>
                    <v-col cols="2" align-self="end">
                      <v-fab-transition>
                        <v-card-actions v-show="hover">
                          <v-spacer />
                          <v-btn icon color="red">
                            <v-icon>
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-fab-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-card>
            </v-timeline-item>
          </v-hover>
        </template>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Root',
  layout: 'app',
  data () {
    const date = moment().toDate()
    return {
      hello: 'World',
      date,
      items: [
        {
          startTime: '2020-12-05 17:05',
          title: '운동 다녀오기',
          description: '오늘은 등운동 가야 했지만 못가고 그냥 겉기만 했네 ㅎㅎㅎ',
          color: 'indigo lighten-1'
        },
        {
          startTime: '2020-12-05 18:12',
          title: '저녁밥',
          description: '리앙 크리스피롤 먹음.',
          color: 'green lighten-1'
        },
        {
          startTime: '2020-12-05 19:25',
          title: '집청소',
          description: '',
          color: 'blue lighten-1'
        },
        {
          startTime: '2020-12-05 19:25',
          title: '개발 💻',
          description: 'm-journal 기초 레이아웃 잡기\n화면 테스트 진행',
          color: 'purple lighten-1'
        },
        {
          type: 'button',
          color: 'red lighten-1'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
</style>
