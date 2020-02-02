<template>
  <div class="aboutUs">
    <Header
            :msg-header="$t('lang.titles.about')"
            user-icon="userIcon.jpg"
            user-name="Luna Lovegood"
            is-viper="true"
            user-language="English"
    ></Header>
    <Table :data="tableData" :columns="columns" @on-row-click="test" border :loading="loading" headerFixed :shadow="true" :width="100" theme="dark"></Table>
    <Page :limit="page" @on-click="test" elevator counter></Page>
    <p>{{selectValue}}</p>
    <Select v-model="selectValue" :data="tableData" keyValue="id" label="name" filterable @on-change="text">
<!--      <Option v-for="(i,index) in tableData" :key="index" :value="i.id" :label="i.name"></Option>-->
    </Select>

<!--    <div class="about">-->
<!--      <h1>{{ $t('lang.aboutUs.title') }}</h1>-->
<!--      <p>{{ $t('lang.aboutUs.desc') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc2') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc3') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc4') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc5') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc6') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc7') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc8') }}</p>-->
<!--      <p>{{ $t('lang.aboutUs.desc9') }}</p>-->
<!--      <h1>{{ $t('lang.aboutUs.title2') }}</h1>-->
<!--      <div class="cardGroup">-->
<!--        <figure>-->
<!--          <img src="userIcon.jpg" alt />-->
<!--          <figcaption>{{ $t('lang.aboutUs.author') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.authorDesc') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <img src="userIcon.jpg" alt />-->
<!--          <figcaption>{{ $t('lang.aboutUs.people') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <img src="userIcon.jpg" alt />-->
<!--          <figcaption>{{ $t('lang.aboutUs.people3') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <img src="userIcon.jpg" alt />-->
<!--          <figcaption>{{ $t('lang.aboutUs.people2') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.mystery') }}</figcaption>-->
<!--        </figure>-->
<!--      </div>-->
<!--      <h1>{{ $t('lang.aboutUs.title3') }}</h1>-->
<!--      <div class="cardGroup">-->
<!--        <figure>-->
<!--          <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-Vue" />-->
<!--          </svg>-->

<!--          <figcaption>{{ $t('lang.aboutUs.organ') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organDesc') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-microsoft" />-->
<!--          </svg>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organ2') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organDesc2') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <svg class="icon iconText" aria-hidden="true">-->
<!--            <use xlink:href="#icon-logo_google_text" />-->
<!--          </svg>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organ3') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organDesc3') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-iconfont" />-->
<!--          </svg>-->
<!--          <figcaption>Icon Font</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organDesc4') }}</figcaption>-->
<!--        </figure>-->
<!--        <figure>-->
<!--          <svg class="icon iconText" aria-hidden="true">-->
<!--            <use xlink:href="#icon-Bing" />-->
<!--          </svg>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organ5') }}</figcaption>-->
<!--          <figcaption>{{ $t('lang.aboutUs.organDesc5') }}</figcaption>-->
<!--        </figure>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>
  import Header from "../../components/activeHeader";
  import "../../assets/icons/logo/iconfont.js";
  export default {
    name: "app",
    data() {
      return {
        loading: true,
        page: 22,
        selectValue: '',
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 80,
            fixed: 'left'
          },
          {
            title: '名称',
            key: 'name',
            align: 'center',
            width: 200,
            className: 'testTableClass',
            ellipsis: true,
            fullDisplay: true,
          },
          {
            title: '操作',
            type: 'custom',
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }, [
                h('Button',{
                  props: {
                    shadow: false,
                    theme: 'primary',
                    loading: true
                  },
                  on: {
                    click: () => {
                      // alert('111')
                    }
                  }
                }, '修改')
              ])
            }
          },
        ],
        tableData: [
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test',
            id: '777',
          },
          {
            name: 'test2',
            id: '7772',
          },
          {
            name: 'test2',
            id: '7772',
          },
          {
            name: 'test2',
            id: '7772',
          },
          {
            name: 'test2',
            id: '7772',
          },
          {
            name: 'test2',
            id: '7772',
          }
        ]
      };
    },
    created() {
    },
    methods: {
      test(value) {
        console.log(value);
      },
      text(value) {
        // console.log(value)
      }
    },
    components: {
      Header
    }
  };
</script>
<style lang='scss' scoped>
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
