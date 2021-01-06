<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" class="py-0">
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
        :attributes="attributes"
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
                        max-width="500"
                        hide-overlay
                        :fullscreen="$vuetify.breakpoint.xsOnly"
                        :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'fade-transition'"
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
                          <v-toolbar
                            dark
                            color="primary"
                          >
                            <v-btn
                              icon
                              dark
                              @click="input.show = false"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>
                              기록하기
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                              <v-btn
                                icon
                                @click="submitItem"
                              >
                                <v-icon>
                                  mdi-pencil-outline
                                </v-icon>
                              </v-btn>
                            </v-toolbar-items>
                          </v-toolbar>
                          <v-card-text class="pt-4">
                            <v-form
                              ref="form"
                            >
                              <v-text-field
                                v-model="input.title"
                                label="이번엔 어떤일을 하셨나요? 😀"
                                color="primary"
                                hide-details="auto"
                                outlined
                                :rules="rules.required"
                                @keydown.enter.prevent="submitItem"
                              />
                              <v-expansion-panels flat>
                                <v-expansion-panel>
                                  <v-expansion-panel-header class="px-0 py-0">
                                    자세히 기록하기 😊
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content class="px-0">
                                    <v-textarea
                                      v-model="input.description"
                                      label="조금 더 자세히 말해줄래요? 😄"
                                      color="primary"
                                      rows="3"
                                      hide-details
                                      outlined
                                      auto-grow
                                    />
                                    <v-select
                                      v-model="input.color"
                                      :items="colors"
                                      :color="input.color"
                                      class="mt-4"
                                      append-icon="mdi-palette"
                                      menu-props="auto"
                                      label="색깔"
                                      hide-details
                                      solo
                                      flat
                                      dense
                                      outlined
                                      single-line
                                    >
                                      <template v-slot:item="{ item }">
                                        <div class="d-flex justify-space-between align-center full-width">
                                          <div>
                                            {{ item.text }}
                                          </div>
                                          <v-avatar
                                            :color="item.value"
                                            size="24"
                                          />
                                        </div>
                                      </template>
                                    </v-select>
                                    <b-timepicker
                                      v-model="input.startAt"
                                      class="mt-4"
                                      placeholder="몇시에 하셨나요?"
                                    />
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </v-form>
                          </v-card-text>
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
                          {{ formatTime(item.startAt) }}
                        </v-card-subtitle>
                        <v-card-text>
                          {{ item.description }}
                        </v-card-text>
                      </v-col>
                      <v-col cols="2" align-self="end">
                        <v-fab-transition>
                          <v-card-actions v-show="hover">
                            <v-spacer />
                            <v-btn icon dark @click="deleteItem(item)">
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
      <v-card outlined flat>
        <v-card-title class="justify-center">
          <template v-if="targetItems.length === 1">
            항목을 추가해보세요!
          </template>
          <template v-else>
            총 {{ targetItems.length - 1 }} 개의 여정을 기록했어요!
          </template>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Didary',
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
        },
        {
          text: '분홍',
          value: '#f5487f'
        },
        {
          text: '베이지',
          value: '#D4B886'
        }
      ],
      input: {
        title: '',
        description: '',
        startAt: moment().toDate(),
        color: 'purple lighten-1',
        show: false
      },
      showDetail: false,
      rules: {
        required: [
          v => !!v || '입력해주세요 😉'
        ]
      }
    }
  },
  computed: {
    attributes () {
      const { items } = this
      return [
        {
          bar: {
            style: {
              height: '4px',
              borderRadius: '3px'
            }
          },
          dates: items.filter(item => item.startAt).map(item => moment(item.startAt).toDate())
        }
      ]
    },
    targetItems () {
      const { items, date } = this
      const dateString = moment(date).format('YYYY-MM-DD')
      return items.filter(item =>
        moment(item.startAt)
          .format('YYYY-MM-DD') === dateString || item.type === 'button'
      ).sort((a, b) => moment(a.startAt).isBefore(b.startAt) ? 1 : -1)
    }
  },
  watch: {
    async 'input.show' (show) {
      await this.$nextTick()
      if (show === true) {
        this.$refs.form[0].reset()
        this.input.startAt = moment().toDate()
        this.input.color = 'purple lighten-1'
      }
    }
  },
  async mounted () {
    const { result } = await this.$axios.$get('/Diary')
    this.items.push(...result)
  },
  beforeRouteLeave (to, from, next) {
    if (this.input.show === true) {
      this.input.show = false
      return next(false)
    }

    if (Object.keys(this.$route.query).length !== 0) {
      next()
    } else {
      next(false)
    }
  },
  methods: {
    async submitItem () {
      const valid = await this.$refs.form[0].validate()

      if (!valid) {
        return
      }

      const date = moment(this.date)
      const { title, description, color } = this.input
      const startAt = moment(this.input.startAt).year(date.year()).month(date.month()).date(date.date())
      await this.$nextTick()

      const item = {
        title,
        description,
        startAt,
        color,
        dateString: moment(startAt).format('YYYY-MM-DD')
      }

      let diaryId = null
      try {
        diaryId = await this.$axios.$post('/Diary', item).then(res => res.result)
      } catch (e) {
        return this.$dialog.notify.error(`에러가 발생했어요 😯 (${e})`)
      }

      this.items.push({
        ...item,
        diaryId
      })

      this.input.show = false

      this.input.title = ''
      this.input.description = ''
    },
    formatTime (value) {
      return moment(value).format('HH시 mm분')
    },
    async deleteItem (item) {
      const yes = await this.$dialog.confirm({
        text: '정말 삭제하시겠어요?',
        showClose: false
      })

      if (!yes) {
        return
      }

      const { diaryId } = item
      try {
        await this.$axios.$delete(`/Diary/${diaryId}`)
        const index = this.items.findIndex(targetItem => targetItem.diaryId === item.diaryId)
        if (index > -1) {
          this.items.splice(index, 1)
        }
      } catch (e) {
        this.$dialog.notify.error(`에러가 발생했어요 😯 (${e})`)
      }
      this.$dialog.notify.success('1개의 항목이 삭제되었어요!')
    },
    updateCalendar ({ year, month }) {
      this.date = moment(this.date).year(year).month(month - 1).toDate()
    }
  }
}
</script>
<style scoped lang="scss">

::v-deep .v-expansion-panel-content__wrap {
  padding: 0;
}

::v-deep .timepicker {
  border-radius: 4px;
}
</style>
