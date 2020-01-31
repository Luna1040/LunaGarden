import Vue from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Badge from './Badge.vue'
import Row from './Grid/Row.vue'
import Col from './Grid/Col.vue'
import Container from './Container/Container.vue'
import Card from './Container/Card.vue'
import Table from './Table/Table.vue'
import Page from './Table/Page.vue'

const LunaUI = {
    Modal,
    Button,
    Input,
    Badge,
    Row,
    Col,
    Container,
    Card,
    Table,
    Page
};

Object.keys(LunaUI).forEach(name => {
    Vue.component(name, LunaUI[name])
});

export default LunaUI
