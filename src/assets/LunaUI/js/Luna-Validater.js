/**
 * @return {boolean}
 */

export const noChara = function (str) {
  const specialKey = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noEnglish = function (str) {
  const specialKey = /.*[a-zA-Z]+.*/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noEnglishChara = function (str) {
  const specialKey = /^.*[`~!@#$%^&*()_+<>?:"{},./;'[\]]+.*/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noChinese = function (str) {
  const specialKey = /^.*[\u4e00-\u9fa5]+.*/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noChineseChara = function (str) {
  const specialKey = /^.*[·！#￥（—）：；“”‘、，|《。》？【】[\]]+.*/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const noNumber = function checkNodeNo (str) {
  const specialKey = /^.*[0-9]+.*/
  return !specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const email = function (str) {
  const specialKey = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const phone = function (str) {
  const specialKey = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const IDNumber = function (str) {
  const specialKey = /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/
  return specialKey.test(str.trim())
}

/**
 * @return {boolean}
 */

export const urlLink = function (str) {
  const specialKey = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
  return specialKey.test(str.trim())
}
