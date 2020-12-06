<template>
  <v-row>
    <v-col cols="12" sm="6" class="py-0">
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
      />
    </v-col>
    <v-col cols="12" sm="6" class="py-0">
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
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="py-0">
                  {{ item.startTime }}
                </v-card-subtitle>
                <v-card-text>
                  {{ item.description }}
                </v-card-text>
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
          description: '오늘은 등운동',
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
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
</style>
