<template>
  <div class="aboutUs">
    <div class="about">
      <h1>{{ $t("lang.aboutUs.title") }}</h1>
      <p>{{ $t("lang.aboutUs.desc") }}</p>
      <p>{{ $t("lang.aboutUs.desc2") }}</p>
      <p>{{ $t("lang.aboutUs.desc3") }}</p>
      <p>{{ $t("lang.aboutUs.desc4") }}</p>
      <p>{{ $t("lang.aboutUs.desc5") }}</p>
      <p>{{ $t("lang.aboutUs.desc6") }}</p>
      <p>{{ $t("lang.aboutUs.desc7") }}</p>
      <p>{{ $t("lang.aboutUs.desc8") }}</p>
      <p>{{ $t("lang.aboutUs.desc9") }}</p>
      <h1>{{ $t("lang.aboutUs.title2") }}</h1>
      <div class="cardGroup">
        <figure>
          <img src="https://lunagarden.net/res/userIcons/userIcon.jpg" alt />
          <figcaption>{{ $t("lang.aboutUs.author") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.authorDesc") }}</figcaption>
        </figure>
        <figure>
          <img src="https://lunagarden.net/res/userIcons/SuYan.jpg?token=AHM7AP2JM4HQB4J3KXQLEZS7UUAPC" alt />
          <figcaption>{{ $t("lang.aboutUs.people4") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.UI") }}</figcaption>
        </figure>
      </div>
      <h1>{{ $t("lang.aboutUs.title5") }}</h1>
      <div class="cardGroup">
        <figure>
          <img src="https://lunagarden.net/res/userIcons/XiRang.jpg?token=AHM7AP3ELNFEXO3KB33EVQK7UUATY" alt />
          <figcaption>{{ $t("lang.aboutUs.people") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.developer") }}</figcaption>
        </figure>
        <figure>
          <img src="https://lunagarden.net/res/userIcons/Wangdi.jpg?token=AHM7AP5XC7T2BB74IQ5JB6C7UUASK" alt />
          <figcaption>{{ $t("lang.aboutUs.people2") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.mystery") }}</figcaption>
        </figure>
      </div>
      <h1>{{ $t("lang.aboutUs.title4") }}</h1>
      <div class="cardGroup">
        <figure class="company">
          <img src="https://lunagarden.net/res/company/eguCol.png?token=AHM7APYF7LOZ6JGLPJOFK2K7UUAWQ" alt="" />
          <p style="font-size: 12px">{{ $t("lang.aboutUs.com1") }}</p>
          <p style="font-size: 12px">{{ $t("lang.aboutUs.com2") }}</p>
        </figure>
        <figure class="company">
          <img src="https://lunagarden.net/res/company/rrCol.png?token=AHM7AP3GPXCIUR7CXDQYSHS7UUAX2" alt=""/>
          <p style="font-size: 12px">{{ $t("lang.aboutUs.com1") }}</p>
        </figure>
      </div>
      <h1>{{ $t("lang.aboutUs.title3") }}</h1>
      <h1>{{ $t('lang.aboutUs.title3Desc') }}</h1>
      <div class="cardGroup">
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Vue" />
          </svg>
          <figcaption>{{ $t("lang.aboutUs.organ") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.organDesc") }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-microsoft" />
          </svg>
          <figcaption>{{ $t("lang.aboutUs.organ2") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.organDesc2") }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-logo_google_text" />
          </svg>
          <figcaption>{{ $t("lang.aboutUs.organ3") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.organDesc3") }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfont" />
          </svg>
          <figcaption>Icon Font</figcaption>
          <figcaption>{{ $t("lang.aboutUs.organDesc4") }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-Bing" />
          </svg>
          <figcaption>{{ $t("lang.aboutUs.organ5") }}</figcaption>
          <figcaption>{{ $t("lang.aboutUs.organDesc5") }}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
<script>
import '../../assets/icons/logo/iconfont.js'
export default {
  name: 'AboutUs'
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
