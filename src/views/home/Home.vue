<template>
  <div class="home">
    <transition name="messageAnimation">
      <button v-if="!listLoading" v-ripple class="fluidButton" :title="$t('lang.home.PST')">
        <i class="font_family icon-LunaPlus"></i>
      </button>
    </transition>
    <transition name="messageAnimation">
      <button v-if="!listLoading" v-ripple class="fluidButton dashboard">
        <i class="font_family icon-LunaDashboard"></i>
      </button>
    </transition>
    <transition name="maskAnimation">
      <div v-if="listLoading" class="lunaLoading">
        <div class="face" />
        <div class="face" />
      </div>
    </transition>
    <div class="homeSideBar">
      <h1>{{ $t('lang.home.projectView') }}<i class="iconfont icon-lianjieshangchuan"></i></h1>
      <div class="searchProject">
        <Select v-model="searchText" :select-data="projectList" :placeholder="$t('lang.home.input')" filterable
                width="100%" key-label="name" key-value="id" @on-change="changeProjectList(searchText)"></Select>
      </div>
      <ul>
        <div class="activeBar" :style="activeBarMoveDistance"></div>
        <li v-for="i in projectList" :key="i.id" :title="i.name" :class="{ active: choiceId === i.id }"
            @click="changeProjectList(i.id)">
          <i :class="i.icon" />
          <p>{{ i.name }}</p>
        </li>
      </ul>
    </div>
    <transition name="modalAnimation">
      <div v-if="!listLoading" class="homeMainView">
        <h1><i :class="projectDetail.icon"></i>{{ projectDetail.name }}</h1>
        <p>{{ $t('lang.home.PST') }}: {{ projectDetail.startTime }}</p>
        <p>{{ $t('lang.home.PST') }}: {{ projectDetail.endTime }}</p>
        <ul id="scrollView">
          <li v-for="i in projectDetail.list" :key="i.id" :class="{expanded: checkId === i.id}"
              @click="checkDetail(i.id)">
            <span v-if="checkId !== i.id" :title="i.content">{{ i.content }}</span>
            <div v-else>
              <h2>{{ $t('lang.home.Content') }}{{ i.content }}</h2>
              <p>{{ $t('lang.home.CreateTime') }}{{ i.createTime }}</p>
              <p>{{ $t('lang.home.Deadline') }}{{ i.deadline }}</p>
              <p>{{ $t('lang.home.SpentTime') }}{{ i.spentTime }}{{ $t('lang.home.Day') }}</p>
              <p>{{ $t('lang.home.Urgent') }}{{ i.urgent | urgentFilter }}</p>
              <div>{{ $t('lang.home.Progress') }}
                <div><span class="progressBar" :style="progressBarLength(i.percent)"
                           :class="{errorPro: i.percent <= 30, warningPro: 30 < i.percent && i.percent <= 60, primaryPro: 60 < i.percent && i.percent <= 99, successPro: i.percent === 100}"></span>
                </div>
                {{ i.percent }}%
              </div>
            </div>
            <div class="moreAction" @click.stop="showActionExpanded(i.id)">
              <!--              <transition name="expandedActionMenu">-->
              <span v-if="actionId !== i.id">···</span>
              <div v-else></div>
              <!--              </transition>-->
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { home } from '@/assets/js/url'

export default {
  name: 'home',
  data() {
    return {
      searchText: '',
      projectList: [],
      projectDetail: {},
      choiceId: 0,
      listLoading: true,
      checkId: 0,
      actionId: 0
    }
  },
  created() {
    setTimeout(() => {
      this.projectList = [
        {
          id: 1,
          icon: 'font_family icon-LunaLunaUI',
          name: 'Luna Garden'
        },
        {
          id: 2,
          icon: 'font_family icon-LunaTeamControl',
          name: 'Luna UI'
        },
        {
          id: 3,
          icon: 'font_family icon-LunaTaskPanel',
          name: 'Luna Components'
        }
      ]
      this.choiceId = this.projectList[0].id
    }, 1000)
    setTimeout(() => {
      this.projectDetail = {
        id: 1,
        icon: 'font_family icon-LunaLunaUI',
        name: 'Luna Garden',
        startTime: '2020-09-13',
        endTime: '2020-12-12',
        list: [
          {
            id: 1,
            urgent: 0,
            content: 'Luna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home Remake',
            sort: 'Web Develop Group',
            createTime: '2020-09-30',
            deadline: '2020-10-30',
            spentTime: '5',
            percent: 30,
            success: false
          },
          {
            id: 2,
            urgent: 1,
            content: 'Luna Garden Header Remake',
            sort: 'Web Develop Group',
            createTime: '2020-09-12',
            deadline: '2020-09-22',
            spentTime: '10',
            percent: 60,
            success: true
          },
          {
            id: 3,
            urgent: 2,
            content: 'Luna Garden Login Module Remake',
            sort: 'UI Group',
            createTime: '2020-09-30',
            deadline: '2020-10-30',
            spentTime: '5',
            percent: 99,
            success: false
          },
          {
            id: 4,
            urgent: 2,
            content: 'Luna Garden Login Module Remake',
            sort: 'UI Group',
            createTime: '2020-09-30',
            deadline: '2020-10-30',
            spentTime: '5',
            percent: 100,
            success: true
          }
        ]
      }
      this.listLoading = false
    }, 2000)

  },
  computed: {
    activeBarMoveDistance() {
      return {
        top: 66 * (this.choiceId - 1) + 'px'
      }
    }
  },
  filters: {
    urgentFilter(val) {
      switch (val) {
        case 0:
          return 'Normal'
        case 1:
          return 'Above Normal'
        case 2:
          return 'Important'
        case 3:
          return 'Very Important'
        case 4:
          return 'Urgent'
      }
    }
  },
  methods: {
    changeProjectList(id) {
      this.choiceId = id
      this.checkId = 0
      this.actionId = 0
      this.listLoading = true
      setTimeout(() => {
        switch (id) {
          case 1:
            this.projectDetail = {
              id: 1,
              icon: 'font_family icon-LunaLunaUI',
              name: 'Luna Garden',
              startTime: '2020-09-13',
              endTime: '2020-12-12',
              list: [
                {
                  id: 1,
                  urgent: 0,
                  content: 'Luna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home RemakeLuna Garden Home Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 30,
                  success: false
                },
                {
                  id: 2,
                  urgent: 1,
                  content: 'Luna Garden Header Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-12',
                  deadline: '2020-09-22',
                  spentTime: '10',
                  percent: 60,
                  success: true
                },
                {
                  id: 3,
                  urgent: 2,
                  content: 'Luna Garden Login Module Remake',
                  sort: 'UI Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 99,
                  success: false
                },
                {
                  id: 4,
                  urgent: 2,
                  content: 'Luna Garden Login Module Remake',
                  sort: 'UI Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 100,
                  success: true
                }
              ]
            }
            break
          case 2:
            this.projectDetail = {
              id: 2,
              icon: 'font_family icon-LunaTeamControl',
              name: 'Luna UI',
              startTime: '2020-09-13',
              endTime: '2020-12-12',
              list: [
                {
                  id: 1,
                  urgent: 0,
                  content: 'Luna UI Select Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 30,
                  success: false
                },
                {
                  id: 2,
                  urgent: 1,
                  content: 'Luna UI Input Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-12',
                  deadline: '2020-09-22',
                  spentTime: '10',
                  percent: 30,
                  success: true
                },
                {
                  id: 3,
                  urgent: 2,
                  content: 'Luna UI Table Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 30,
                  success: false
                }
              ]
            }
            break
          case 3:
            this.projectDetail = {
              id: 3,
              icon: 'font_family icon-LunaTaskPanel',
              name: 'Luna Components',
              startTime: '2020-09-13',
              endTime: '2020-12-12',
              list: [
                {
                  id: 1,
                  urgent: 0,
                  content: 'Luna Components Router Animations Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 30,
                  success: false
                },
                {
                  id: 2,
                  urgent: 1,
                  content: 'Luna Components Workflow Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-12',
                  deadline: '2020-09-22',
                  spentTime: '10',
                  percent: 100,
                  success: true
                },
                {
                  id: 3,
                  urgent: 2,
                  content: 'Luna Components Avatar Remake',
                  sort: 'Web Develop Group',
                  createTime: '2020-09-30',
                  deadline: '2020-10-30',
                  spentTime: '5',
                  percent: 60,
                  success: false
                }
              ]
            }
            break
        }
        this.listLoading = false
      }, 1500)
    },
    checkDetail(id) {
      if (id === this.checkId) {
        this.checkId = 0
        this.actionId = 0
        return
      }
      this.checkId = id
    },
    progressBarLength(val) {
      return {
        width: val + '%'
      }
    },
    showActionExpanded(id) {
      this.actionId = id
    }
  }
}
</script>
<!--谷歌搜索list模块-->
<!--https://www.google.com/complete/search?q=Luna&cp=4&client=psy-ab&xssi=t&gs_ri=gws-wiz&hl=zh-CN&authuser=0&psi=kpypXfa4L620mAXIoDc.1571396755338&ei=kpypXfa4L620mAXIoDc-->
<!--百度搜索List模块-->
<!--https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1442,21118,29567,29221,22158&wd=Luna&req=2&csor=4&cb=jQuery110201946216263738294_1571396837817&_=1571396837820-->
<!--bing搜索List模块-->
<!--https://cn.bing.com/AS/Suggestions?pt=page.home&mkt=zh-cn&ds=mobileweb&qry=luna&cp=0&cvid=4C94085CD28049A3AC1BBC34170774C3-->
