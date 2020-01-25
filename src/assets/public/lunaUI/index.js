import Vue from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Badge from './Badge.vue'
import Row from './Grid/Row.vue'
import Col from './Grid/Col.vue'
import Container from './Container/Container.vue'
import Card from './Container/Card.vue'

const LunaUI = {
    Modal,
    Button,
    Input,
    Badge,
    Row,
    Col,
    Container,
    Card,
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
