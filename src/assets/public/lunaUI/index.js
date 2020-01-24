import Vue from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Badge from './Badge.vue'
import Row from './Grid/Row.vue'
import Col from './Grid/Col.vue'

const LunaUI = {
    Modal,
    Button,
    Input,
    Badge,
    Row,
    Col,
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
