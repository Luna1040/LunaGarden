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
          attack: 150,
          armor: 30,
          health: 100,
          speed: 100,
          powerUp: 1
        },
        {
          name: '暗花神',
          id: 'darkFlower',
          attack: 120,
          health: 80,
          armor: 30,
          speed: 120,
          powerUp: 1
        }
      ],
      girl: {
        name: '',
        id: '',
        attack: 0,
        armor: 0,
        health: 0,
        weak: '',
        speed: 0,
        powerUp: 1
      },
      girlSkill: {
        flower: [
          {
            name: '花疗术',
            effect: '治疗' + 'this.girl.name' + '20点生命！',
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
            effect: '射出连续的花枝箭，对' + 'this.boy.name' + '造成' + this.girl.attack * 2 * 'this.girl.powerUp' + '伤害！',
            damage: 5,
            treatment: 0,
            powerUp: 0
          },
          {
            name: '极花护铠',
            effect: '对' + 'this.girl.name' + '释放了花瓣组成的护盾，可抵挡50点伤害！',
            damage: 0,
            treatment: 0,
            powerUp: 0,
            shield: 5
          },
          {
            name: '召唤花精灵',
            effect: '召唤出一只花精灵，为自己抵挡一次伤害，且每回合对敌人各造成5点伤害',
            damage: 5,
            damageAOE: true,
            treatment: 0,
            powerUp: 0,
            shield: 100000,
            disposableShield: true
          },
          {
            name: '花龙卷',
            effect: '对' + 'this.boy.name' + '释放了由花海构成的龙卷风，造成了' + this.girl.attack * 3 * 'this.powerUp' + '点伤害！',
            damage: 0,
            treatment: 0,
            powerUp: 0,
            shield: 0
          }
        ]
      },
      boyData: [],
      boy: {
        name: '',
        id: '',
        attack: 0,
        armor: 0,
        health: 0,
        weak: '',
        speed: 0,
        powerUp: 1
      },
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
<!--
战斗细则
每人可选择一个人物进行对战，可选女性和男性
每回合会在每人的技能库中随机分配四个技能

战斗开始回合：
如果同性别，速度快的优先攻击
如果有女角色，则女角色优先攻击
如果同性别且速度相同，则随机先手
每回合均为100速度为基准，如果人物速度小于100，则扣除差异值，如果人物速度高于100，则加上差异值，二人之间差异达到100时，速度快的一方可额外进行一回合，之后双方数字归零

伤害计算公式
设人物攻击力为100  技能倍率为2  设敌方基础护甲为50  额外护甲为50
基础护甲为倍率减免(基础护甲 * 2)  额外护甲为固定减免
首先计算额外护甲的固定减免后，再计算剩余伤害在基础护甲的倍率减免
则实际承受伤害为( (100 * 2) - 50) / (50 * 2)

人物设计模板
攻击属性最低为40攻击  最高不设上限
防御属性最低为15护甲  50生命  最高不设上限
基准攻击力  100
高于100，以高出的同样数值为基准降低防御属性，若防御属性任一未减少，则攻击技能减少为2个
低于100，以高出的同样数值为基准降低防御属性，若防御属性任一未增加，则攻击技能增加为6个且每个技能提升一半的伤害倍率

基准初始护甲  50
高于基准(基于攻击力计算后)，以生命值(基于攻击力计算后)的基准值减去高出的护甲*10
低于基准(基于攻击力计算后)，以生命值(基于攻击力计算后)的基准值加上减少的护甲*10

基准攻击技能数量  4
基准辅助技能数量  4
基准恢复值  15
每有一个恢复技能高于基准恢复值，减少一个攻击技能
基准护盾值  30
每有一个护盾技能高于基准恢复值，减少一个攻击技能
-->
<style scoped></style>
