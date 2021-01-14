<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="12"
      class="py-0 diary-container"
    >
      <vc-date-picker
        v-model="date"
        color="indigo"
        is-expanded
        :attributes="attributes"
        @update:from-page="updateCalendar"
      />
    </v-col>
    <v-col
      v-if="fetched"
      cols="12"
      sm="12"
      class="py-0 diary-container"
    >
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
            v-for="(targetItem, index) in targetItems"
          >
            <v-hover
              v-slot:default="{ hover }"
              :key="index"
            >
              <v-timeline-item
                :color="targetItem.color"
                :small="!hover"
              >
                <diary-item
                  :hover="hover"
                  :item="targetItem"
                  @add="openDialog"
                  @delete="deleteItem(targetItem)"
                />
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
    <add-item-dialog
      ref="addItemDialog"
      v-model="dialogs.addItem"
      @submit="submitItem"
    />
  </v-row>
</template>

<script>
import moment from 'moment'
import AddItemDialog from '@/components/molecules/Diary/AddItemDialog'
import DiaryItem from '@/components/molecules/Diary/DiaryItem'

export default {
  name: 'Diary',
  components: {
    AddItemDialog,
    DiaryItem
  },
  middleware: ['auth', 'checkAccount'],
  layout: 'app',
  data () {
    return {
      date: new Date(),
      dialogs: {
        addItem: false
      },
      items: [],
      fetched: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['auth/user'] || { nickName: '아무개님' }
    },
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
  async beforeMount () {
    this.fetched = false
    const { result } = await this.$axios.$get('/Diary')

    const items = [{
      type: 'button',
      color: 'red lighten-1'
    }]

    this.items.splice(0, this.items.length)
    this.items.push(...items, ...result)

    this.fetched = true

    window.addEventListener('beforeunload', (event) => {
      if (this.dialogs.addItem === true) {
        this.dialogs.addItem = false
        event.returnValue = undefined
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', () => {})
  },
  beforeRouteLeave (to, before, next) {
    if (this.dialogs.addItem === true) {
      this.dialogs.addItem = false
      next(false)
    } else {
      next()
    }
  },
  methods: {
    async submitItem ({ title, description, startAt, color }) {
      const date = moment(this.date)
      startAt = moment(startAt).year(date.year()).month(date.month()).date(date.date())
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

      this.dialogs.addItem = false
      this.$refs.addItemDialog.clear()
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
    },
    openDialog () {
      this.dialogs.addItem = true
    }
  },
  head () {
    const userInfo = this.userInfo || { nickName: '아무개님' }
    const title = `${userInfo.nickName} 님의 하루일기`
    return {
      title
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

.diary-container {
  width: 100%;
}
</style>
