import Vue from 'vue';
import Router from 'vue-router';
//启动画面
import Start from './start.vue';
//主页引入
import Home from './views/home/Home.vue';
import mHome from './views/home/mHome.vue';
import padHome from './views/home/padHome.vue';
//笔记本引入
import Note from './views/note/Note.vue';
import mNote from './views/note/mNote.vue';
import padNote from './views/note/padNote.vue';
//日记引入
import Diary from './views/diary/Diary.vue';
import mDiary from './views/diary/mDiary.vue';
import padDiary from './views/diary/padDiary.vue';
//UI简介引入
import UI from './views/luna-ui/UI.vue';
import mUI from './views/luna-ui/mUI.vue';
import padUI from './views/luna-ui/padUI.vue';
//引导模式引入
import Guide from './views/guide/Guide.vue';
import mGuide from './views/guide/mGuide.vue';
import padGuide from './views/guide/padGuide.vue';
//用户中心引入
import User from './views/user/UserCenter.vue';
import mUser from './views/user/mUserCenter.vue';
import padUser from './views/user/padUserCenter.vue';
// 关于我们
import aboutUs from './views/About.vue'

Vue.use(Router);

export default new Router({
  routes: [
		//首屏展示加载动画
    {path: '/', name: 'start', component: Start},
		// PC页面统一整合
		{path: '/home', name: 'home', component: Home},
		{path: '/guide', name: 'guide', component: Guide},
		{path: '/user', name: 'user', component: User},
		{path: '/Luna-UI', name: 'UI', component: UI},
		{path: '/note', name: 'note', component: Note},
		{path: '/diary', name: 'diary', component: Diary},
		//移动端页面统一整合
		{path: '/mHome', name: 'mHome', component: mHome},
		{path: '/mGuide', name: 'mGuide', component: mGuide},
		{path: '/mUser', name: 'mUser', component: mUser},
		{path: '/mLuna-UI', name: 'mUI', component: mUI},
		{path: '/mNote', name: 'mnote', component: mNote},
		{path: '/mDiary', name: 'mDiary', component: mDiary},
		//pad端页面统一整合
		{path: '/padHome', name: 'padHome', component: padHome},
		{path: '/padGuide', name: 'padGuide', component: padGuide},
		{path: '/padUser', name: 'padUser', component: padUser},
		{path: '/padLuna-UI', name: 'padUI', component: padUI},
		{path: '/padNote', name: 'padnote', component: padNote},
		{path: '/padDiary', name: 'padDiary', component: padDiary},
		{path: '/aboutUs', name: 'aboutUs', component: aboutUs},

  ]
})
