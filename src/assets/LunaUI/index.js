import Vue from 'vue'
import Modal from './components/Modal.vue'
import Button from './components/Button/Button.vue'
import ButtonGroup from './components/Button/ButtonGroup.vue'
import Input from './components/Input.vue'
import Badge from './components/Badge.vue'
import Row from './components/Grid/Row.vue'
import Col from './components/Grid/Col.vue'
import Container from './components/Container/Container.vue'
import Card from './components/Container/Card.vue'
import Table from './components/Table/Table.vue'
import Page from './components/Table/Page.vue'
import List from './components/List/List.vue'
import ListItem from './components/List/ListItem.vue'
import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
import Select from './components/Select/Select.vue'
import Option from './components/Select/Option.vue'
import Message from './components/Message'
import Tree from './components/Tree'
import Collapse from './components/Collapse/Collapse.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import CheckboxGroup from './components/Checkbox/CheckboxGroup.vue'
import Radio from './components/Radio/Radio.vue'
import RadioGroup from './components/Radio/RadioGroup.vue'
import Switches from './components/Switches/Switches.vue'
import SwitchesGroup from './components/Switches/SwitchesGroup.vue'
import DatePicker from './components/DatePicker/DatePicker.vue'
import './js/Luna-Outside.js'
import ripple from './js/Luna-Ripple'

const LunaUI = {
  Modal,
  Button,
  ButtonGroup,
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
  Tree,
  Collapse,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switches,
  SwitchesGroup,
  DatePicker
}

Object.keys(LunaUI).forEach((name) => {
  Vue.component(name, LunaUI[name])
})
Vue.use(ripple)

Vue.prototype.$Message = Message

export default LunaUI
