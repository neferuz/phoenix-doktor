<template>
  <section class="page-error">
    <img
      class="page-error__bg"
      src="~/assets/img/svg/error-page-bg.svg"
      alt=""
    />
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <img
            class="yd-error-img"
            src="~/assets/img/svg/edition.svg"
            alt="edition"
          />
        </div>
        <div class="col-md-6">
          <h1 class="title">
            {{ $t("onDev.title") }}
          </h1>
          <p class="error-text" v-html="$t('onDev.text')"></p>
          <div class="error-footer">
            <nuxt-link :to="localePath('/')" class="yd-btn btn yd-btn_alt">
              {{ $t("to_main") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>     

<script>
export default {};
</script>   
—