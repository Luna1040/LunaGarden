<template>
  <div class="legendSetting">
    <h1>用户设置</h1>
    <ul>
      <li>ip：<Input v-model="userSetting.ip" /></li>
      <li>用户名：<Input v-model="userSetting.userName" /></li>
      <li>uid：<Input v-model="userSetting.uid" /></li>
      <li>timeZone：<Select v-model="userSetting.timeZone"></Select></li>
    </ul>
    <h1>战斗设置</h1>
    <ul>
      <li>在线模式：<Switches v-model="battleSetting.online" /></li>
      <li>离线模式战斗速度：<Input v-model="battleSetting.offlineSpeed" /></li>
      <li>AI难度：<Input v-model="battleSetting.AIDifficulty" /></li>
      <li>timeZone：<Switches v-model="battleSetting.nightMode"/></li>
      <li>画质：滑杆组件</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      userSetting: {
        ip: '',
        userName: '',
        uid: '',
        timeZone: ''
      },
      battleSetting: {
        online: false,
        offlineSpeed: 1,
        AIDifficulty: 1,
        nightMode: false,
        quality: 5
      }
    }
  }
}
</script>

<style scoped></style>
