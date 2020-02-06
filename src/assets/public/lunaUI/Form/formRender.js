export default {
  functional: true,
  props: {
    validateMethods: Array,
    validateOnChange: Boolean,
    data: Object,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      validateMethods: ctx.props.validateMethods,
      validateOnChange: ctx.props.validateOnChange,
      data: ctx.props.data
    }

    return ctx.props.render(h, params)
  }
}
