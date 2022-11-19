<template>
  <section>
    <div class="container">
      <client-only>
        <div class="slick-carousel">
          <VueSlickCarousel
            v-bind="slickSettings"
            ref="slider"
            @afterChange="slickChanged"
          >
            <div class="p-md-4" v-for="a in actions" :key="a.id">
              <div class="stock-wrapper">
                <div class="stock">
                  <div class="stock-img" style="margin-bottom: 1.5rem">
                    <img
                      src="~/assets/img/actions_header.svg"
                      style="width: 100%; border-radius: 0.5rem"
                    />
                  </div>
                  <div class="stock-header">
                    <h3 class="title">
                      <nuxt-link :to="localePath('/clinic/' + a.clinic.url)">
                        {{ getName(a.clinic) }}
                      </nuxt-link>
                    </h3>
                    <p class="sub-title">{{ getTitle(a) }}</p>
                  </div>
                  <div class="stock-body">
                    <ul class="stock-list" v-html="getText(a)"></ul>
                  </div>
                  <!-- <nuxt-link class="stock-more" :to="localePath('/actions/list')">
                  {{ $t("more_details") }}
                </nuxt-link> -->
                </div>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </client-only>
      <div class="yd-slick-controls d-lg-none">
        <button class="yd-slick-prev" type="button" @click="showPrev">
          <i class="fas fa-arrow-left"></i>
        </button>
        <span class="yd-slick-pagin">
          {{ sliderCurr }}/{{ actions.length }}</span
        >
        <button class="yd-slick-next" type="button" @click="showNext">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>

      <nuxt-link
        class="btn yd-btn_alt mt-4 mx-auto"
        :to="localePath('/actions/list')"
      >
        {{ $t("show_all_actions") }}
      </nuxt-link>
    </div>
  </section>
</template>  

<script>
import {
  getName,
  getTitle,
  getText,
  sortCompareFunction,
} from "~/plugins/custom.js";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "Promotions",
  props: ["actionsData"],
  components: { VueSlickCarousel },
  data() {
    return {
      slickSettings: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 2,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1,
            },
          },
        ],
      },
      sliderCurr: 1,
    };
  },
  computed: {
    actions() {
      return this.actionsData.sort(sortCompareFunction("position"));
    },
  },
  methods: {
    getName,
    getTitle,
    getText,
    showPrev() {
      this.$refs.slider.prev();
    },
    showNext() {
      this.$refs.slider.next();
    },
    slickChanged(curr) {
      this.sliderCurr = curr + 1;
    },
  },
};
</script>
