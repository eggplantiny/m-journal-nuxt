<template>
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
        <v-spacer />
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
                  :color="input.color"
                  :items="colors"
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
</template>

<script>
import moment from 'moment'

export default {
  name: 'AddItemDialog',
  data () {
    return {
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
      rules: {
        required: [
          v => !!v || '입력해주세요 😉'
        ]
      }
    }
  },
  computed: {
    model: {
      set (value) {
        this.$emit('value', value)
      },
      get () {
        return this.$
      }
    }
  },
  methods: {
    submitItem () {
      const { title, description, startAt, color } = this.input
      this.$emit('submit', { title, description, startAt, color })
    },
    clear () {
      this.input.title = ''
      this.input.description = ''
      this.input.startAt = new Date()
      this.input.color = 'purple lighten-1'
    }
  }
}
</script>

<style scoped>

</style>
