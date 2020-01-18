import Vue from 'vue'
import Modal from './modal.vue'
import Button from './Button.vue'
import Input from './Input.vue'

const LunaUI = {
    Modal,
    Button,
    Input,
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
