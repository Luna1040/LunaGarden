import Vue from 'vue'

const zh = require('../../../lang/zh.js')
const en = require('../../../lang/en.js')

const reloadLang = function () {
  lang()
}
const setLang = function (value) {
  this.$i18n.locale = value
  lang()
}
// const lang = function (params) {
//   if (params) {
//     const arr = params.split('.')
//     let zhStr = zh.lang
//     let enStr = en.lang
//     let lang = this.$i18n.locale
//     if (lang === 'zh-CN') {
//       if (arr.length !== 0) {
//         for (let i = 0; i < arr.length; i++) {
//           if (callBack(zhStr, arr[i])) {
//             zhStr = callBack(zhStr, arr[i])
//           }
//         }
//         return zhStr
//       }
//     } else {
//       if (arr.length !== 0) {
//         for (let i = 0; i < arr.length; i++) {
//           if (callBack(enStr, arr[i])) {
//             enStr = callBack(enStr, arr[i])
//           }
//         }
//         return enStr
//       }
//     }
//   }
// }
const lang = function () {
  if (this.$i18n.locale === 'zh-CN') {
    return zh.lang
  } else {
    return en.lang
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
