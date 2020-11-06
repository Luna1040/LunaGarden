<template>
  <div class="legend">
    <div class="legendIntro">
      <h1>花神传说</h1>
      <Loading></Loading>
      <Button theme="primary" :width="150" :loading="loading" @click="startBattle">开始战斗</Button>
      <Button theme="primary" :width="150" :loading="loading" @click="startBattle">获取装甲</Button>
      <Button theme="primary" :width="150" :loading="loading" @click="startBattle">可用人物</Button>
      <Button :width="150" @click="setting = true">设置</Button>
    </div>
    <!--    <charaSelect-area :chara-list="girlData" :choose-chara="chooseChara"></charaSelect-area>-->
    <Modal v-model="setting">
      <Setting></Setting>
    </Modal>
  </div>
</template>

<script>
import CharaSelectArea from './charaSelectArea.vue'
import Setting from './setting'
export default {
  name: 'Legend',
  data() {
    return {
      loading: false,
      setting: false,
      // test: '',
      // loading: '',
      girlData: [
        {
          name: '花神',
          id: 'flower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/GodOfFlower.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/GodOfFlowerPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '能力均衡的远程法师类型，提供治疗、护盾、以及强大的增益攻击技能。',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        },
        {
          name: '暗花神',
          id: 'darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/DarkFlower.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/DarkFlowerPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '隐匿在暗影中的魅魔刺客，拥有高加成的近战攻击技能与可抵挡任意伤害的一次性护盾技能',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        },
        {
          name: '素言',
          id: 'flower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/SuYan.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/SuYanPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '擅长冰雪魔法的远程法师类型，拥有极高的攻击法术加成与增益攻击技能。',
          camp: '神族',
          health: 100,
          speed: 100
        },
        {
          name: '魔樱',
          id: 'darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/MoYing.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/MoyingPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '卓越的魔族刺客，拥有高基础伤害的攻击技能与可抵挡部分伤害的护盾技能。',
          camp: '魔族',
          health: 100,
          speed: 100
        },
        {
          name: '邵蔷',
          id: 'darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/ShaoQiang.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/ShaoQiangPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '强大的近战法师，拥有极高基础伤害的攻击技能，辅助技能可提升护甲、可抵挡任意伤害的一次性护盾。',
          camp: '魅魔',
          health: 100,
          speed: 100
        },
        {
          name: '撒贝丽',
          id: 'darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/Sabrey.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/SabreyPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '出色的魅魔战士，拥有高加成的近战攻击技能与回复类型法术。',
          camp: '魅魔',
          health: 100,
          speed: 100
        },
        {
          name: '依芈',
          id: 'images/darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/YiMi.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/YiMiPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '出色的远程攻击枪手，拥有高基础伤害的枪术技能与几率暴击技能。',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        },
        {
          name: '柯林娜',
          id: 'flower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/Corlina.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/CorlinaPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '体术与枪术并驾齐驱的战士，拥有高加成的体术攻击技能与高基础伤害的枪术技能，且枪术技能自带较低的暴击几率。',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        },
        {
          name: '玛丽',
          id: 'flower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/Marie.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/MariePreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '卓越的远程攻击枪手，拥有独特的增加伤害机制(持续作战会逐步提升伤害)，拥有高加成的枪术技能。',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        },
        {
          name: '苏舒',
          id: 'darkFlower',
          src: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/SuShu.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          previewSrc: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/legend/SuShuPreview.jpg?token=AHM7AP6WQA4C52Z5VTSU4NS7UT72M',
          desc: '综合能力较强的枪手，拥有独特的增加伤害机制(攻击技能有一定几率使目标永久降低基础护甲)，拥有较高加成且较高基础伤害的枪术技能。',
          camp: '花神特工组织',
          health: 100,
          speed: 100
        }
      ],
      chara: {
        name: '',
        id: '',
        health: 0,
        weak: '',
        speed: 0
      },
      boyData: [],
      boy: {},
      boySkill: {}
    }
  },
  components: {
    CharaSelectArea,
    Setting
  },
  created() {
    this.$emit('sendMsgHeader', this.$t('lang.titles.legend'))
  },
  methods: {
    click() {
      let value = '爱上空间回复噶速度快捷回复噶快圣诞节好烦噶ASD'
      this.$refs['input'].value = value
      this.test = value
      this.$refs['input'].focus()
    },
    chooseChara(val) {
      this.chara = val
    },
    battleStart() {
      this.boy = this.boyData[this.random(this.boyData)]
    },
    autoBattleStart() {
      this.boy = this.boyData[this.random(this.boyData)]
    },
    random(arr) {
      return Math.floor(Math.random() * arr.length)
    },
    reset() {
      this.chara = {}
    },
    online() {
      this.$Message.error({ content: '服务暂未开通！敬请期待！' })
      if (window.navigator.onLine) {
        this.loading = true
      } else {
        this.$Message.error({ content: '您还未连接互联网或网络较差！请在网络良好的环境下重试！' })
      }
    },
    showCards() {},
    getArmor() {},
    startBattle() {
      this.loading = true
    }
  }
}
</script>

<style scoped></style>
