import Vue from 'vue'
import Modal from './Modal.vue'
import Button from './Button/Button.vue'
import ButtonGroup from './Button/ButtonGroup.vue'
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
import Message from './Message'
import Tree from './Tree'
import Collapse from './Collapse/Collapse.vue'
import Checkbox from './Checkbox/Checkbox.vue'
import CheckboxGroup from './Checkbox/CheckboxGroup.vue'
import Radio from './Radio/Radio.vue'
import RadioGroup from './Radio/RadioGroup.vue'
import Switches from './Switches/Switches.vue'
import SwitchesGroup from './Switches/SwitchesGroup.vue'
import DatePicker from './DatePicker/DatePicker.vue'
import './util/clickoutside.js'
import ripple from './util/ripple'

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
