import Vue from 'vue'
const zh = require('./lang/zh.js')
const en = require('./lang/en.js')
const reloadLang = function () {
  lang()
}
const setLang = function (value) {
  localStorage.setItem('local', value)
  lang()
}
const lang = function (params) {
  let arr = params.split('.')
  let zhStr = zh.lang
  let enStr = en.lang
  let lang = localStorage.getItem('local')
  if (lang === 'zh') {
    if (arr.length !== 0) {
      for (let i = 0; i < arr.length; i++) {
        if (callBack(zhStr, arr[i])) {
          zhStr = callBack(zhStr, arr[i])
        }
      }
      return zhStr
    }
  } else {
    if (arr.length !== 0) {
      for (let i = 0; i < arr.length; i++) {
        if (callBack(enStr, arr[i])) {
          enStr = callBack(enStr, arr[i])
        }
      }
      return enStr
    }
  }
}
function callBack (arr, key) {
  if (arr[key]) {
    return arr[key]
  } else {
    return false
  }
}
Vue.prototype.$lang = lang
Vue.prototype.$setLang = setLang
Vue.prototype.$reloadLang = reloadLang
