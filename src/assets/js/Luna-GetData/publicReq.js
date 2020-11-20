// 此文件存在的意义是封装全局公用的获取数据函数，方便调用，也可不使用
import { publicApi } from './url'
import Vue from 'vue'

// 获取用户设置
const getUserInfo = function (uid) {
  this.getData(publicApi.getUserInfo, { userId: uid }).then(res => {
    if (res.success) {
      this.commitX('setUserInfo', res.data)
      this.setLocal('userInfo', res.data)
      this.$Message.success({ content: this.$t('lang.getUserInfo.alert3') })
      // 获取用户设置
      this.getData(publicApi.getUserInfo, { userId: uid }).then(res => {
        if (res.success) {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          // 动态路由
          this.updateMenu(uid)
          // 存入vueX
          this.commitX('setUserInfo', res.data)
          this.$Message.success({ content: this.$t('lang.getUserInfo.alert4') })
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.getUserInfo.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.getUserInfo.alert2') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
          localStorage.setItem('userInfo', JSON.stringify({}))
          this.$router.push('/login')
        }
      }).catch(err => {
        this.$Message.error({ content: err })
      })
    } else {
      if (res.code === 1) {
        this.$Message.error({ content: this.$t('lang.getUserInfo.alert1') })
      } else if (res.code === 2) {
        this.$Message.error({ content: this.$t('lang.getUserInfo.alert2') })
      } else {
        this.$Message.error({ content: this.$t('lang.unknownError') })
      }
    }
  }).catch(err => {
    this.$Message.error({ content: err })
  })
}
const getUserSetting = function (uid) {
}
// 获取主题

Vue.prototype.getUserInfo = getUserInfo
