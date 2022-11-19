<template>
  <main>
    <section class="yd-general">
      <img
        src="~/assets/img/svg/general-bg.svg"
        class="yd-general__bg"
        alt=""
      />
      <div class="container">
        <div class="row">
          <div class="col-lg-6 order-lg-1">
            <img class="w-100" src="~/assets/img/svg/general-doc.svg" alt="" />
          </div>
          <div class="col-lg-6">
            <div class="yd-general-info">
              <h2 class="yd-general-info__title">
                {{ $t("about.general_title") }}
              </h2>
              <p v-html="$t('about.general_body')"></p>
            </div>
            <img
              class="d-none d-lg-block ml-auto"
              src="~/assets/img/svg/romb.svg"
              style="height: 15rem"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 class="center-title">{{ $t("about.title") }}</h2>
        <div class="row">
          <div class="col-lg-4 mb-5">
            <div class="benefits">
              <div class="benefits-ico">
                <img
                  src="~/assets/img/icons/benefist/1.svg"
                  width="40"
                  alt=""
                />
              </div>
              <h5 class="title">{{ $t("about.ch_title") }}</h5>
              <p class="text">{{ $t("about.body_text") }}</p>
            </div>
          </div>
          <div class="col-lg-4 mb-5">
            <div class="benefits">
              <div class="benefits-ico">
                <img
                  src="~/assets/img/icons/benefist/2.svg"
                  width="40"
                  alt=""
                />
              </div>
              <h5 class="title">{{ $t("about.ch_title2") }}</h5>
              <p class="text">{{ $t("about.body_text2") }}</p>
            </div>
          </div>
          <div class="col-lg-4 mb-5">
            <div class="benefits">
              <div class="benefits-ico">
                <img
                  src="~/assets/img/icons/benefist/3.svg"
                  width="40"
                  alt=""
                />
              </div>
              <h5 class="title">{{ $t("about.ch_title21") }}</h5>
              <p class="text">{{ $t("about.body_text21") }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 class="center-title yd-underline">{{ $t("about.title2") }}</h2>
        <div class="row mb-5">
          <div class="col-lg-6 mx-auto">
            <p class="center-title-info">{{ $t("about.ch_title3") }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="yd-mission">
              <div class="yd-mission-ico">
                <img src="~/assets/img/icons/mission/1.svg" alt="" />
              </div>
              <div class="content">
                <p>{{ $t("about.ch_title4") }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="yd-mission">
              <div class="yd-mission-ico">
                <img src="~/assets/img/icons/mission/2.svg" alt="" />
              </div>
              <div class="content">
                <p>{{ $t("about.ch_title5") }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="yd-mission">
              <div class="yd-mission-ico">
                <img src="~/assets/img/icons/mission/3.svg" alt="" />
              </div>
              <div class="content">
                <p>{{ $t("about.ch_title6") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 class="center-title">{{ $t("about.title3") }}</h2>
        <div class="row mb-5">
          <div class="col-lg-6 mx-auto">
            <p class="center-title-info" v-html="$t('about.ch_title7')"></p>
          </div>
        </div>
      </div>
      <div class="yd-stats-bg">
        <div class="container">
          <div class="row">
            <div class="col-8 col-sm-4 col-lg">
              <div class="yd-stats">
                <h5 class="title">1023+</h5>
                <p>{{ $t("about.ch_title8") }}</p>
              </div>
            </div>
            <div class="col-8 col-sm-4 col-lg">
              <div class="yd-stats">
                <h5 class="title">109</h5>
                <p>{{ $t("about.ch_title9") }}</p>
              </div>
            </div>
            <div class="col-8 col-sm-4 col-lg">
              <div class="yd-stats">
                <h5 class="title">1 823</h5>
                <p>{{ $t("about.ch_title10") }}</p>
              </div>
            </div>
            <div class="col-8 col-sm-4 col-lg">
              <div class="yd-stats">
                <h5 class="title">112</h5>
                <p>{{ $t("about.ch_title11") }}</p>
              </div>
            </div>
            <div class="col-8 col-sm-4 col-lg">
              <div class="yd-stats">
                <h5 class="title">141</h5>
                <p>{{ $t("about.ch_title12") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>  
 
<script>
export default {
  async asyncData({ store }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");
  },
};
</script>   
—