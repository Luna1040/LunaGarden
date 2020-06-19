<template>
  <div>
    <Header
      :msg-header="$t('lang.titles.legend')"
      user-icon="userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
    ></Header>
    <Select :select-data="girlData" key-value="id" key-label="name" filterable return-label @on-change="choiceGirl"></Select>
    <Button theme="primary" @click="autoBattleStart">开启自动战斗模式</Button>
    <Button @click="battleStart">开启手动战斗模式</Button>
    <Button @click="reset">重置战斗</Button>
    <Button @click="online">在线对战</Button>
    <Button @click="showCards">查阅人物资料</Button>
    <Button @click="getArmor">获取装甲(Alpha)</Button>
  </div>
</template>

<script>
import Header from '../../components/pc/activeHeader.vue'

export default {
  name: 'ByteCursor',
  data () {
    return {
      test: '',
      girlData: [
        {
          name: '花神',
          id: 'flower',
          health: 100,
          weak: 'chest',
          speed: 100
        },
        {
          name: '暗花神',
          id: 'darkFlower',
          health: 80,
          weak: 'torso',
          speed: 120
        }
      ],
      girl: {
        name: '',
        id: '',
        health: 0,
        weak: '',
        speed: 0
      },
      girlSkill: {
        flower: [
          {
            name: '花疗术',
            effect: '治疗' + 'this.girl.name' + '2点生命！',
            damage: 0,
            treatment: 2,
            powerUp: 0
          },
          {
            name: '花之赐福',
            effect: '提升' + 'this.girl.name' + '2倍的伤害！',
            damage: 0,
            treatment: 0,
            powerUp: 2
          },
          {
            name: '连环花矢',
            effect: '射出连续的花枝箭，对' + 'this.boy.name' + '造成' + 5 * 'this.girl.powerUp' + '伤害！',
            damage: 5,
            treatment: 0,
            powerUp: 0
          },
          {
            name: '极花护铠',
            effect: '对' + 'this.girl.name' + '释放了花瓣组成的护盾，可抵挡5点伤害！',
            damage: 0,
            treatment: 0,
            powerUp: 0,
            shield: 5
          },
          {
            name: '召唤花精灵',
            effect: '召唤出一只花精灵，为自己抵挡一次伤害，且每回合对敌人各造成1点伤害',
            damage: 1,
            damageAOE: true,
            treatment: 0,
            powerUp: 0,
            shield: 100000,
            disposableShield: true
          },
          {
            name: '花龙卷',
            effect: '对' + 'this.boy.name' + '释放了由花海构成的龙卷风，造成了' + 10 * 'this.powerUp' + '点伤害！',
            damage: 0,
            treatment: 0,
            powerUp: 0,
            shield: 0
          }
        ]
      },
      boyData: [],
      boy: {},
      boySkill: {}
    }
  },
  components: {
    Header
  },
  methods: {
    click () {
      let value = '爱上空间回复噶速度快捷回复噶快圣诞节好烦噶ASD'
      this.$refs['input'].value = value
      this.test = value
      this.$refs['input'].focus()
    },
    choiceGirl (val) {
      this.girl = val
    },
    battleStart () {
      this.boy = this.boyData[this.random(this.boyData)]
    },
    autoBattleStart () {
      this.boy = this.boyData[this.random(this.boyData)]
    },
    random (arr) {
      return Math.floor(Math.random() * arr.length)
    },
    reset () {
      this.girl = {}
    },
    online () {
      this.$Message.error({ content: '服务暂未开通！敬请期待！' })
      if (window.navigator.onLine) {

      } else {
        this.$Message.error({ content: '您还未连接互联网或网络较差！请在网络良好的环境下重试！' })
      }
    },
    showCards () {

    },
    getArmor () {

    }
  }
}
</script>

<style scoped></style>
