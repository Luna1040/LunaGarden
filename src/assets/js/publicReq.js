import { publicApi } from './url'
import Vue from 'vue'

const getUserInfo = function (uid) {
  this.getData(publicApi.getUserInfo, { userId: uid }).then(res => {
    if (res.success) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      this.$Message.success({ content: this.$t('lang.getUserInfo.alert3') })
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

Vue.prototype.getUserInfo = getUserInfo
