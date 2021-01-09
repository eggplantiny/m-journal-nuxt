const model = {
  computed: {
    model: {
      set (value) {
        this.$emit('input', value)
      },
      get () {
        return this.$attrs.value
      }
    }
  }
}

export default model
