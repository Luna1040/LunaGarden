// 此文件存在的意义是封装全局公用的获取数据函数，方便调用，也可不使用
import { publicApi } from './url'
import Vue from 'vue'

// 获取用户信息
const getUserInfo = function (uid) {
  return new Promise((resolve, reject) => {
    this.getData(publicApi.getUserInfo, { userId: uid })
      .then((res) => {
        if (res.success) {
          this.commitX('setUserInfo', res.data)
          this.setLocal('userInfo', res.data)
          this.$Message.success({ content: this.$t('lang.getUserInfo.alert3') })
          // 动态路由
          this.getUserSetting(uid)
          this.updateMenu(uid)
            .then(s => {
              resolve(s)
            }).catch(s => {
            reject(s)
          })
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.getUserInfo.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.getUserInfo.alert2') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
          reject(false)
        }
      })
      .catch((err) => {
        this.$Message.error({ content: err })
        reject(false)
      })
  })
}
// 获取用户设置
const getUserSetting = function (uid) {}
// 获取主题

Vue.prototype.getUserInfo = getUserInfo
Vue.prototype.getUserSetting = getUserSetting
