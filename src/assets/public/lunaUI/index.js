import Vue from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Badge from './Badge.vue'

const LunaUI = {
    Modal,
    Button,
    Input,
    Badge,
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
