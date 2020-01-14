import Vue from 'vue'
import Modal from './modal.vue'
import Button from './button.vue'
import Input from './input.vue'

const LunaUI = {
    Modal,
    Button,
    Input
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
