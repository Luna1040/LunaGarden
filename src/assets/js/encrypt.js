import Vue from 'vue'

const encrypt = function (password) {
  const Base64 = require('js-base64').Base64
  return Base64.encode('01LunaCnc3DuoEAS||' + this.$md5(password))
}

Vue.prototype.encrypt = encrypt
