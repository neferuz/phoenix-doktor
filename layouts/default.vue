<template>
  <div id="main">
    <TheHeader />
    <Nuxt />
    <TheFooter />
    <TheModalMenu />
    <TheModalDoctors />
    <TheModalProcedure />
    <TheModalAnalyze />
    <TheModalCollab />
    <TheModalRegionNotFound />
    <TheModalAuth />
    <TheModalRegister />
    <TheModalBlog />
    <TheModalCompleted />
    <TheModalRateUs />
    <button class="rateus-button" @click="openRateUsModal">
      Оцените нас
    </button>
  </div>
</template> 

<script>
export default {
  mounted() {
    if (process.browser) {
      let userData = window.localStorage.getItem("userData");
      if (!!userData) {
        let data = JSON.parse(userData);
        this.$store.dispatch("setUserData", data);
      }
    }
    setTimeout(() => {
      this.$bvModal.show('RateUsModal')
    }, 90000)
  },
  methods: {
    openRateUsModal() {
      this.$bvModal.show('RateUsModal')
    }
  }
};
</script>