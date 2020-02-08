import Message from './Message.js';

let Instance;
function notice({ content = '', duration = 1.5 }) {
    Instance = Instance || Message.newInstance()
    Instance.add({
        content,
        duration
    })
}

export default {
    info (options) {
        return notice(options);
    }
}
