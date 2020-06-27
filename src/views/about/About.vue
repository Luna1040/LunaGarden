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
					<img src="userIcon.jpg" alt />
					<figcaption>{{ $t("lang.aboutUs.author") }}</figcaption>
					<figcaption>{{ $t("lang.aboutUs.authorDesc") }}</figcaption>
				</figure>
				<figure>
					<img src="userIcons/Suyan.jpg" alt />
					<figcaption>{{ $t("lang.aboutUs.people4") }}</figcaption>
					<figcaption>{{ $t("lang.aboutUs.UI") }}</figcaption>
				</figure>
				<figure>
					<img src="userIcon.jpg" alt />
					<figcaption>{{ $t("lang.aboutUs.people") }}</figcaption>
					<figcaption>{{ $t("lang.aboutUs.developer") }}</figcaption>
				</figure>
				<!-- <figure>
					<img src="userIcon.jpg" alt />
					<figcaption>{{ $t("lang.aboutUs.people3") }}</figcaption>
					<figcaption>{{ $t("lang.aboutUs.developer") }}</figcaption>
				</figure> -->
				<figure>
					<img src="userIcon.jpg" alt />
					<figcaption>{{ $t("lang.aboutUs.people2") }}</figcaption>
					<figcaption>{{ $t("lang.aboutUs.mystery") }}</figcaption>
				</figure>
			</div>
			<h1>{{ $t("lang.aboutUs.title3") }}</h1>
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
  name: 'app',
}
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
