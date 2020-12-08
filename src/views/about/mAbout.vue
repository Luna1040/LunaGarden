<template>
  <div class="aboutUs">
    <Header :msg-header="$t('lang.titles.about')" user-icon="https://lunagarden.net/res/userIcons/userIcon.jpg" user-name="Luna Lovegood" is-viper="true" user-language="English"></Header>
    <div class="about">
      <h1>{{ $t('lang.aboutUs.title') }}</h1>
      <p>{{ $t('lang.aboutUs.desc') }}</p>
      <p>{{ $t('lang.aboutUs.desc2') }}</p>
      <p>{{ $t('lang.aboutUs.desc3') }}</p>
      <p>{{ $t('lang.aboutUs.desc4') }}</p>
      <p>{{ $t('lang.aboutUs.desc5') }}</p>
      <p>{{ $t('lang.aboutUs.desc6') }}</p>
      <p>{{ $t('lang.aboutUs.desc7') }}</p>
      <p>{{ $t('lang.aboutUs.desc8') }}</p>
      <p>{{ $t('lang.aboutUs.desc9') }}</p>
      <h1>{{ $t('lang.aboutUs.title2') }}</h1>
      <div class="cardGroup">
        <figure>
          <img src="https://lunagarden.net/res/userIcons/userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.author') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.authorDesc') }}</figcaption>
        </figure>
        <figure>
          <img src="https://lunagarden.net/res/userIcons/userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>
        </figure>
        <figure>
          <img src="https://lunagarden.net/res/userIcons/userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people3') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>
        </figure>
        <figure>
          <img src="https://lunagarden.net/res/userIcons/userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people2') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.mystery') }}</figcaption>
        </figure>
      </div>
      <h1>{{ $t('lang.aboutUs.title3') }}</h1>
      <div class="cardGroup">
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Vue" />
          </svg>

          <figcaption>{{ $t('lang.aboutUs.organ') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-microsoft" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ2') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc2') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-logo_google_text" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ3') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc3') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfont" />
          </svg>
          <figcaption>Icon Font</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc4') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-Bing" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ5') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc5') }}</figcaption>
        </figure>
      </div>
      <button @click="uuidGet">UUID</button>
      <h1>{{ uuid }}</h1>
      <button @click="getIns">INS</button>
      <h1>{{ ins }}</h1>
    </div>
  </div>
</template>
<script>
import Header from '../../components/pc/activeHeader'
import crypto from 'crypto'
import '../../assets/icons/logo/iconfont.js'
import { log } from 'util'
export default {
  name: 'mAboutUs',
  data() {
    return {
      uuid: '',
      ins: ''
    }
  },
  methods: {
    // 获取uuid
    uuidGet() {
      let s = []
      let hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      for (let i = 0; i < 26; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x26), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

      let timeStamp = new Date().getTime().toString().substr(-7)
      s[8] = timeStamp
      let uuid = s.join('')
      this.uuid = uuid
    },
    getIns() {
      let params = {
        userName: 'LunaLovegood',
        password: 'Luna1040'
      }
      //声明MD5
      let md5 = crypto.createHash('md5')
      //声明sha256
      const sha256 = require('js-sha256').sha256 //这里用的是require方法，所以没用import
      // let s = '11111'
      // s = sha256(s)//要加密的密码
      // md5.update(s); //this.pw2这是你要加密的密码
      // s = md5.digest("hex"); //this.pw这就是你加密完的密码，这个往后台传就行了

      // let s =
      let baseData = JSON.stringify(params)
      let s = md5.update(sha256(baseData))
      s = baseData + md5.digest('hex').toString(16).toUpperCase()
      // crypto转16位        md5加密  256加密
      // console.log(s);
    }
  },
  components: {
    Header
  }
}
</script>
<style lang="scss" scoped>
.icon {
  width: 88px;
  height: 88px;
  fill: currentColor;
  overflow: hidden;
  margin-bottom: 16px;
}
.iconText {
  width: 150px;
}
</style>
