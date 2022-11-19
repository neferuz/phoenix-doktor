<template>
  <main>
    <LazyHydrate when-visible>
      <SectionMainHeader />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SectionServices />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <!-- <SectionDirectory :doctors="doctors" :clinics="clinics" /> -->
    </LazyHydrate>
    <LazyHydrate when-visible>
      <section>
        <div class="container">
          <div class="yd-prom">
            <div class="row align-items-center">
              <div class="col-lg-7">
                <h2>{{ $t("promo_hero_section.title") }}</h2>
                <p
                  class="yd-promo-body-text"
                  v-html="$t('promo_hero_section.body')"
                ></p>
              </div>
              <div class="col-lg-5">
                <img
                  class="yd-prom__img w-100"
                  src="~/assets/img/svg/discount-persons.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyHydrate>
    <!-- <LazyHydrate when-visible>
      <SectionPromotions :actionsData="actions" :clinicsData="clinics" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SectionBlog :blogData="blog" />
    </LazyHydrate> -->
  </main>
</template>     

<script>
import LazyHydrate from "vue-lazy-hydration";

export default {
  components: {
    LazyHydrate,
    SectionMainHeader: () => import("@/components/Section/MainHeader"),
    SectionServices: () => import("@/components/Section/Services"),
    SectionDirectory: () => import("@/components/Section/Directory"),
    SectionPromotions: () => import("@/components/Section/Promotions"),
    SectionBlog: () => import("@/components/Section/Blog"),
  },
  async asyncData({ store }) {
    if (store.getters['category/isEmptyState']) {
      await store.dispatch('category/getCategories')
      await store.dispatch('category/getRegions')
    }
    const doctors = store.getters['category/getDoctors'];
    return {
      doctors,
      // clinics,
      // actions,
      // blog,
    };
  },
  head() {
    return {
      title: 'Phoenix',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("seo.home.description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("seo.home.keywords"),
        },
      ],
    };
  },
};
</script>   
—