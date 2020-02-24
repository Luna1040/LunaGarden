// notification.js
import Message from './Message.vue'
import Vue from 'vue'

Message.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Message, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const alert = Instance.$children[0]

  return {
    add (noticeProps) {
      alert.add(noticeProps)
    },
    remove (name) {
      alert.remove(name)
    }
  }
}

export default Message
