import Vue from 'vue'
import Start from '@/start'
import LunaUI from '@/views/UI/lunaUI'
import TodoPanel from '@/views/todoPanel/TodoPanel'
import mTodoPanel from '@/views/todoPanel/mTodoPanel'
import Chatting from '@/views/chatting/Chatting'
import mChatting from '@/views/chatting/mChatting'
import Report from '@/views/report/Report'
import mReport from '@/views/report/mReport'
import Guide from '@/views/guide/Guide'
import mGuide from '@/views/guide/mGuide'
import AboutUs from '@/views/about/About'
import mAboutUs from '@/views/about/mAbout'
import Login from '@/views/login/Login'
import mLogin from '@/views/login/mLogin'
import Register from '@/views/login/Register'
import mRegister from '@/views/login/mRegister'
import Forgot from '@/views/login/Forgot'
import mForgot from '@/views/login/mForgot'
import ResetPsw from '@/views/login/ResetPsw'
import mResetPsw from '@/views/login/mResetPsw'
import ByteDemo from '@/views/byteDemos/byteDemo'
import mByteDemo from '@/views/byteDemos/mByteDemo'
import ByteCursor from '@/views/byteDemos/byteCursor'
import ByteDiscuss from '@/views/byteDemos/byteDiscuss'
// Luna Garden默认生成的UUID，可自行更改私钥公钥或计算方式
const uuidGet = function () {
    let s = [];
    let hexDigits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 26; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x26), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    let timeStamp = new Date()
        .getTime()
        .toString()
        .substr(-7);
    s[8] = timeStamp;
    return s.join("");
}
// Luna Encrypt初始加密模式，可自行更改
const encrypt = function (password) {
    const Base64 = require('js-base64').Base64
    return Base64.encode('01LunaCnc3DuoEAS||' + this.$md5(password))
}
// 根据uid获取菜单
const updateMenu = function (uid) {
    let arr = [
        { path: '/Start', name: 'Start', component: Start },
        { path: '/mStart', name: 'mStart', component: Start },
        // LunaUI的展示
        { path: '/LunaUI', name: 'LunaUI', component: LunaUI },
        { path: '/mLunaUI', name: 'LunaUI', component: LunaUI },
        // 待办事项面板
        { path: '/TodoPanel', name: 'TodoPanel', component: TodoPanel, meta: { index: 1 } },
        { path: '/mTodoPanel', name: 'mTodoPanel', component: mTodoPanel, meta: { index: 1 } },
        // 聊天页面
        { path: '/Chatting', name: 'Chatting', component: Chatting },
        { path: '/mChatting', name: 'mChatting', component: mChatting },
        // 汇报中心
        { path: '/Report', name: 'Report', component: Report },
        { path: '/mReport', name: 'mReport', component: mReport },
        // 引导页面
        { path: '/Guide', name: 'Guide', component: Guide, meta: { index: 999 } },
        { path: '/mGuide', name: 'mGuide', component: mGuide, meta: { index: 999 } },
        // 关于我们
        { path: '/AboutUs', name: 'AboutUs', component: AboutUs, meta: { index: 999 } },
        { path: '/mAboutUs', name: 'mAboutUs', component: mAboutUs, meta: { index: 999 } },
        // 登录
        { path: '/Login', name: 'Login', component: Login },
        { path: '/mLogin', name: 'mLogin', component: mLogin },
        // 注册
        { path: '/Register', name: 'Register', component: Register },
        { path: '/mRegister', name: 'mRegister', component: mRegister },
        // 忘记密码
        { path: '/Forgot', name: 'Forgot', component: Forgot },
        { path: '/mForgot', name: 'mForgot', component: mForgot },
        // 修改密码
        { path: '/Reset', name: 'Reset', component: ResetPsw },
        { path: '/mReset', name: 'mReset', component: mResetPsw },
        // Demos
        { path: '/ByteDemo', name: 'ByteDemo', component: ByteDemo },
        { path: '/mByteDemo', name: 'mByteDemo', component: mByteDemo },
        { path: '/Cursor', name: 'Cursor', component: ByteCursor },
        { path: '/mCursor', name: 'mCursor', component: ByteCursor },
        { path: '/Discuss', name: 'Discuss', component: ByteDiscuss },
        { path: '/mDiscuss', name: 'mDiscuss', component: ByteDiscuss },
    ]
    this.$router.options.routes = arr
    this.$router.addRoutes(arr)
    this.$router.push(window.location.hash.split('#')[1]).then(r => {
        this.$Message.success({ content: '更新菜单成功！'})
    }).catch(r => {
        this.$Message.error({ content: '更新菜单失败！'})
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
    let year = new Date(timeStamp).getFullYear();
    let month =
      new Date(timeStamp).getMonth() + 1 < 10
        ? "0" + (new Date(timeStamp).getMonth() + 1)
        : new Date(timeStamp).getMonth() + 1;
    let date =
      new Date(timeStamp).getDate() < 10
        ? "0" + new Date(timeStamp).getDate()
        : new Date(timeStamp).getDate();
    let hh =
      new Date(timeStamp).getHours() < 10
        ? "0" + new Date(timeStamp).getHours()
        : new Date(timeStamp).getHours();
    let mm =
      new Date(timeStamp).getMinutes() < 10
        ? "0" + new Date(timeStamp).getMinutes()
        : new Date(timeStamp).getMinutes();
    return year + "-" + month + "-" + date + " " + hh + ":" + mm;
}

Vue.prototype.uuidGet = uuidGet;
Vue.prototype.encrypt = encrypt;
Vue.prototype.updateMenu = updateMenu;
Vue.prototype.toRGB = toRGB;
Vue.prototype.toHash = toHash;
Vue.prototype.timeFormat = timeFormat;
