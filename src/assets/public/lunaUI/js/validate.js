/**
 * @return {boolean}
 */

export const noChara = function (str) {
  let specialKey = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noEnglish = function (str) {
  let specialKey = /^[a-zA-Z]+$/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noEnglishChara = function (str) {
  let specialKey = /^[`~!@#$%^&*()_+<>?:"{},./;'[\]]+$/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noChinese = function (str) {
  let specialKey = /^[\u4e00-\u9fa5]+$/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noChineseChara = function (str) {
  let specialKey = /^[·！#￥（—）：；“”‘、，|《。》？【】[\]]+$/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noNumber = function checkNodeNo (str) {
  let specialKey = /^[0-9]+$/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const email = function (str) {
  let specialKey = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const phone = function (str) {
  let specialKey = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const IDNumber = function (str) {
  let specialKey = /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const urlLink = function (str) {
  let specialKey = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
  return specialKey.test(str.trim())
}
