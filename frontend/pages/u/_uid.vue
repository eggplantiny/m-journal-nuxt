<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" class="py-0">
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
        @update:from-page="updateCalendar"
      />
    </v-col>
    <v-col cols="12" sm="12" class="py-0">
      <v-timeline
        dense
        clipped
        reverse
      >
        <v-slide-x-transition
          group
          hide-on-leave
        >
          <template
            v-for="(item, index) in targetItems"
          >
            <v-hover
              v-slot:default="{ hover }"
              :key="index"
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
                      <v-dialog
                        v-model="input.show"
                        width="500"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            block
                            text
                            rounded
                            large
                            v-on="on"
                          >
                            <v-icon>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-card flat rounded>
                          <v-card-title>
                            기록하기
                          </v-card-title>
                          <v-card-text>
                            <v-text-field
                              v-model="input.title"
                              label="이번엔 어떤일을 하셨나요? 😯"
                              color="primary"
                              hide-details
                              outlined
                            />
                            <v-expansion-panels flat>
                              <v-expansion-panel>
                                <v-expansion-panel-header class="px-0">
                                  자세히 기록하기
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="px-0">
                                  <v-textarea
                                    v-model="input.description"
                                    class="mt-4"
                                    label="조금 더 자세히 말해줄래요? 😄"
                                    color="primary"
                                    rows="3"
                                    hide-details
                                    outlined
                                    auto-grow
                                  />
                                  <b-timepicker
                                    v-model="input.startTime"
                                    class="mt-4"
                                    placeholder="몇시에 하셨나요?"
                                  />
                                  <div class="mt-4 text-h7">
                                    색깔
                                  </div>
                                  <v-radio-group
                                    v-model="input.color"
                                    class="my-0"
                                    row
                                  >
                                    <template v-for="(color, colorIndex) in colors">
                                      <v-radio
                                        :key="`${colorIndex}-color`"
                                        :label="color.text"
                                        :value="color.value"
                                        :color="color.value"
                                      />
                                    </template>
                                  </v-radio-group>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              color="primary"
                              text
                              @click="submitItem"
                            >
                              입력
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-title>
                  </template>
                  <template v-else>
                    <v-row no-gutters>
                      <v-col cols="10">
                        <v-card-title>
                          {{ item.title }}
                        </v-card-title>
                        <v-card-subtitle class="py-0">
                          {{ formatTime(item.startTime) }}
                        </v-card-subtitle>
                        <v-card-text>
                          {{ item.description }}
                        </v-card-text>
                      </v-col>
                      <v-col cols="2" align-self="end">
                        <v-fab-transition>
                          <v-card-actions v-show="hover">
                            <v-spacer />
                            <v-btn icon color="red" @click="deleteItem(item)">
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
        </v-slide-x-transition>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

function makeid (size) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let c = 0; c < size; c++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export default {
  name: 'UserCalendar',
  middleware: ['auth', 'checkAccount'],
  layout: 'app',
  data () {
    const date = moment().toDate()
    return {
      hello: 'World',
      date,
      items: [
        {
          type: 'button',
          color: 'red lighten-1'
        },
        {
          id: 0,
          startTime: '2020-12-05 17:05',
          dateString: '2020-12-05',
          title: '운동 다녀오기',
          description: '오늘은 등운동 가야 했지만 못가고 그냥 걷기만 했네 ㅎㅎㅎ',
          color: 'indigo lighten-1'
        },
        {
          id: 1,
          startTime: '2020-12-05 18:12',
          dateString: '2020-12-05',
          title: '저녁밥',
          description: '리앙 크리스피롤 먹음.',
          color: 'green lighten-1'
        },
        {
          id: 2,
          startTime: '2020-12-05 19:25',
          dateString: '2020-12-05',
          title: '집청소',
          description: '',
          color: 'blue lighten-1'
        },
        {
          id: 3,
          startTime: '2020-12-05 19:25',
          dateString: '2020-12-05',
          title: '개발 💻',
          description: 'm-journal 기초 레이아웃 잡기\n화면 테스트 진행',
          color: 'purple lighten-1'
        }
      ],
      colors: [
        {
          text: '보라',
          value: 'purple lighten-1'
        },
        {
          text: '파랑',
          value: 'blue lighten-1'
        },
        {
          text: '빨강',
          value: 'red lighten-1'
        },
        {
          text: '노랑',
          value: 'yellow lighten-1'
        },
        {
          text: '인디고',
          value: 'indigo lighten-2'
        },
        {
          text: '초록',
          value: 'green lighten-1'
        },
        {
          text: '회색',
          value: 'grey lighten-1'
        },
        {
          text: '검정',
          value: 'black lighten-1'
        }
      ],
      input: {
        title: '',
        description: '',
        startTime: moment().startOf('hour').toDate(),
        color: 0,
        show: false
      },
      showDetail: false
    }
  },
  computed: {
    targetItems () {
      const { items, date } = this
      const dateString = moment(date).format('YYYY-MM-DD')
      return items.filter(item => moment(item.startTime).format('YYYY-MM-DD') === dateString || item.type === 'button')
    }
  },
  methods: {
    formatTime (value) {
      return moment(value).format('HH시 mm분')
    },
    submitItem () {
      const { title, description, startTime, color } = this.input
      const date = this.date
      const id = makeid(8)

      this.items.push({
        id,
        title,
        description,
        startTime: `${moment(date).format('YYYYY-MM-DD')} ${moment(startTime).format('hh:mm:ss')}`,
        dateString: moment(date).format('YYYY-MM-DD'),
        color
      })

      this.input.show = false

      this.input.title = ''
      this.input.description = ''
    },
    deleteItem (item) {
      const index = this.items.findIndex(targetItem => targetItem.id === item.id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    updateCalendar ({ year, month }) {
      this.date = moment(this.date).year(year).month(month - 1).toDate()
    }
  }
}
</script>
<style scoped lang="scss">
</style>
