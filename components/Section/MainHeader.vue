<template>
  <section class="yd-main-header">
    <img class="yd-header-bg" src="~/assets/img/svg/header1.svg" alt="" />
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <div class="yd-main-header__content">
            <h1 v-html="$t('mHeader.title')"></h1>
            <p v-html="$t('mHeader.subTitle')"></p>
          </div>
          <img
            class="w-100 d-lg-none"
            src="~/assets/img/svg/header-persons3.svg"
            alt=""
          />
          <BlockSearch :origin="'mainHeader'" />
        </div>
        <div class="col-lg-5 d-none d-lg-block">
          <img
            class="w-100"
            src="~/assets/img/svg/header-persons3.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>  

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      // searchResult: [],
      // locate: {},
      // search: {},
      // rawSearchText: "",
    };
  },
  mounted() {},
  // computed: {
  //   regions() {
  //     return this.$store.getters["nestedRegions"](this.$i18n);
  //   },
  // },
  // methods: {
  //   locateData(locate) {
  //     this.locate = locate;
  //   },
  //   searchData(data) {
  //     this.search = data;
  //   },
  //   onSearchTextChange(event) {
  //     this.rawSearchText = event.target.value;
  //     let result = this.$store.getters["extensiveSearch"](event.target.value);
  //     this.searchResult = result;
  //   },
  // },
};
</script>