import Message from './Message.js'

let Instance
function notice ({ content = '', icon = '', theme = '', duration = 3 }) {
  Instance = Instance || Message.newInstance()
  Instance.add({
    content,
    icon,
    theme,
    duration
  })
}

export default {
  info (options) {
    options.theme = 'normalMessage'
    return notice(options)
  },
  warning (options) {
    options.theme = 'warningMessage'
    return notice(options)
  },
  error (options) {
    options.theme = 'errorMessage'
    return notice(options)
  },
  success (options) {
    options.theme = 'successMessage'
    return notice(options)
  },
  alert (options) {
    options.theme = 'alertMessage'
    return notice(options)
  },
  primary (options) {
    options.theme = 'primaryMessage'
    return notice(options)
  }
}
