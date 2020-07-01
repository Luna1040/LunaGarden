export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function,
    data: Object
  },
  render: (h, ctx) => {
    const params = {
      data: ctx.props.data
    }
    return ctx.props.render(h, params)
  }
}
