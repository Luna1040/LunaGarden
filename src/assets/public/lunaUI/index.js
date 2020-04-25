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
import List from './List/List.vue'
import ListItem from './List/ListItem.vue'
import Form from './Form/Form.vue'
import FormItem from './Form/FormItem.vue'
import Select from './Select/Select.vue'
import Option from './Select/Option.vue'
import Message from './Message/index.js'
import Tree from './Tree/index.js'
import './util/clickoutside.js'

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
  Page,
  List,
  ListItem,
  Form,
  FormItem,
  Select,
  Option,
  Tree
}

Object.keys(LunaUI).forEach(name => {
  Vue.component(name, LunaUI[name])
})

Vue.prototype.$Message = Message

export default LunaUI
