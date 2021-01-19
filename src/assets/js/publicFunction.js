import Vue from 'vue'
import LunaUI from '@/views/UI/lunaUI'
import TodoPanel from '@/views/todoPanel/TodoPanel'
import mTodoPanel from '@/views/todoPanel/mTodoPanel'
import Chatting from '@/views/chatting/Chatting'
import mChatting from '@/views/chatting/mChatting'
import Report from '@/views/report/Report'
import mReport from '@/views/report/mReport'
import ImgHosting from '@/views/imgHosting/ImgHosting'
import mImgHosting from '@/views/imgHosting/ImgHosting'
// Luna Garden默认生成的UUID，可自行更改私钥公钥或计算方式
const uuidGet = function () {
  let s = []
  let hexDigits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 26; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x26), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)

  let timeStamp = new Date().getTime().toString().substr(-7)
  s[8] = timeStamp
  return s.join('')
}
// Luna Encrypt初始加密模式，可自行更改
const encrypt = function (password) {
  const Base64 = require('js-base64').Base64
  return Base64.encode('01LunaCnc3DuoEAS||' + this.$md5(password))
}
// 根据uid获取菜单
const updateMenu = function (uid) {
  return new Promise((res, rej) => {
    let arr = [
      // LunaUI的展示
      { path: '/LunaUI', name: 'LunaUI', component: LunaUI, meta: { index: 990 } },
      { path: '/mLunaUI', name: 'LunaUI', component: LunaUI, meta: { index: 990 } },
      // 待办事项面板
      { path: '/TodoPanel', name: 'TodoPanel', component: TodoPanel, meta: { index: 5 } },
      { path: '/mTodoPanel', name: 'mTodoPanel', component: mTodoPanel, meta: { index: 5 } },
      // 聊天页面
      { path: '/Chatting', name: 'Chatting', component: Chatting, meta: { index: 995 } },
      { path: '/mChatting', name: 'mChatting', component: mChatting, meta: { index: 995 } },
      // 汇报中心
      { path: '/ReportCenter', name: 'Report', component: Report, meta: { index: 6 } },
      { path: '/mReportCenter', name: 'mReport', component: mReport, meta: { index: 6 } },
      { path: '/ImgHosting', name: 'ImgHosting', component: ImgHosting, meta: { index: 7 } },
      { path: '/mImgHosting', name: 'mImgHosting', component: mImgHosting, meta: { index: 7 } },
    ]
    this.$router.options.routes = arr
    this.$router.addRoutes(arr)
    this.$router.push(window.location.hash.split('#')[1]).then(r => {
      this.$Message.success({ content: '更新菜单成功！' })
      res(true)
    }).catch(r => {
      this.$Message.error({ content: '更新菜单失败！' })
      rej(false)
    })
  })
}
//用于将rgb色值转为哈希色值
const toHash = function (value) {
  // RGB颜色值的正则
  let reg = /^(rgb|RGB)/
  let color = value
  if (reg.test(color)) {
    let strHex = '#'
    // 把RGB的3个数值变成数组
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}
//用于将哈希色值转为rgb色值
const toRGB = function (value) {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = value.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange.join(', ')
  } else {
    return color
  }
}
// 用于将时间戳转为默认的时间格式yyyy-mm-dd
const timeFormat = function (timeStamp) {
  let year = new Date(timeStamp).getFullYear()
  let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  return year + '-' + month + '-' + date + ' ' + hh + ':' + mm
}
// 调用vueX函数
const commitX = function (stateEvent, val) {
  this.$store.commit(stateEvent, val)
}
// 获取localstorage
const getLocal = function (key) {
  return JSON.parse(localStorage.getItem(key))
}
// 设置localstorage
const setLocal = function (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

Vue.prototype.uuidGet = uuidGet
Vue.prototype.encrypt = encrypt
Vue.prototype.updateMenu = updateMenu
Vue.prototype.toRGB = toRGB
Vue.prototype.toHash = toHash
Vue.prototype.timeFormat = timeFormat
Vue.prototype.commitX = commitX
Vue.prototype.getLocal = getLocal
Vue.prototype.setLocal = setLocal
