<template>
  <main>
    <div class="yd-page-header">
      <img class="yd-page-header-bg" src="~assets/img/svg/bg-dots.svg" alt="" />
      <h2 class="title">
        {{ $t("promo_hero_section.title") }}
        <!-- <img
          class="title-underline"
          src="~assets/img/svg/title-under.svg"
          alt=""
        /> -->
      </h2>
      <!-- <p class="subtitle-text" v-html="$t('promo_hero_section.body')"></p> -->
    </div>
    <section class="mt-lg-5">
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

    <div class="container">
      <div class="">
        <form class="yd-form">
          <div class="form-row">
            <div class="col-lg-4">
              <label class="yd-locate">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('choose_location')"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="collapseLocate"
                  autocomplete="off"
                  v-b-toggle="'actionscollapseLocate'"
                  :value="getName(locate)"
                />
                <b-collapse
                  :id="'actionscollapseLocate'"
                  class="yd-locate-list"
                >
                  <div
                    class="accordion yd-accordion"
                    :id="'actionsaccordionLocate'"
                    role="tablist"
                  >
                    <b-card v-for="region in regions" :key="region.id" no-body>
                      <b-card-header header-tag="header" role="tab">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            :data-target="`actionsLocate-${region.id}`"
                            aria-expanded="false"
                            :aria-controls="`actionsLocate-${region.id}`"
                            v-b-toggle="`actionsLocate-${region.id}`"
                          >
                            {{ getName(region) }}
                          </button>
                        </h2>
                      </b-card-header>
                      <b-collapse
                        :id="`actionsLocate-${region.id}`"
                        accordion="collapseLocateAccordion"
                        role="tabpanel"
                      >
                        <ul class="card-body">
                          <li>
                            <button
                              @click="locateData(region)"
                              type="button"
                              v-b-toggle="'actionscollapseLocate'"
                            >
                              {{ $t("all_regions") }}
                            </button>
                          </li>
                          <li v-for="child in region.children" :key="child.id">
                            <button
                              @click="locateData(child)"
                              type="button"
                              v-b-toggle="'actionscollapseLocate'"
                            >
                              {{ getName(child) }}
                            </button>
                          </li>
                        </ul>
                      </b-collapse>
                    </b-card>
                  </div>
                </b-collapse>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>

    <section>
      <div class="container">
        <div class="stocks">
          <div class="stock" v-for="action in actions" :key="action.id">
            <div class="stock-header">
              <h3 class="title">
                <nuxt-link :to="localePath('/clinic/' + action.clinic.url)">{{
                  getName(action.clinic)
                }}</nuxt-link>
              </h3>
              <p class="sub-title">{{ getTitle(action) }}</p>
            </div>
            <div class="stock-body">
              <ul class="stock-list" v-html="getText(action)"></ul>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <div class="yd-pagination">
            <b-pagination
              :value="currPage()"
              :total-rows="totalItemCount"
              :per-page="$config.paginationItemSize"
              @change="paginationBtnClick"
              align="center"
              first-number
              last-number
            ></b-pagination>
          </div>
        </nav>
      </div>
    </section>
  </main>
</template>  
 
<script>
import { uniqBy } from "lodash-es";
import {
  getName,
  getTitle,
  getText,
  sortCompareFunction,
  getRegionIds,
} from "~/plugins/custom.js";

export default {
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ app, store, query, $config, i18n }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let actions = {};
    let page = query.page ? parseInt(query.page, 10) : 1;

    let actionsRes;

    let aData = { page, pageSize: $config.paginationItemSize };
    try {
      actionsRes = await app.$axios.post(
        "api/get-actions",
        aData
      );
      actions = actionsRes.data.actions;
    } catch (e) {
      console.log(e);
      return;
    }

    let totalItemCount = actionsRes.data.count;
    let pageCount = actionsRes.data.pageCount;

    // build regions list
    let allRegions = store.getters["regions"];

    let regionsIds = actions.map((x) => x.clinic.region_id);

    let filteredRegions = allRegions.filter((x) => regionsIds.includes(x.id));

    let regionsArr = [];
    for (let i of filteredRegions) {
      if (i.parent_id != null) {
        let parent = allRegions.find((x) => x.id == i.parent_id);
        regionsArr.push(parent);
      }
      regionsArr.push(i);
    }

    regionsArr = uniqBy(regionsArr, "name");

    let regions = regionsArr.filter((x) => x.parent_id == null);

    let name = i18n.locale == "ru" ? "name" : "name_uz";
    for (let p of regions) {
      let children = regionsArr.filter((x) => x.parent_id == p.id);
      p.children = children.sort(sortCompareFunction(name)) || [];
    }

    let locate = {};
    // filter by region
    let regionSlug = query.region || "";
    if (regionSlug) {
      let region = allRegions.find((x) => x.url == regionSlug);
      if (region) {
        locate = region;
      }

      let nestedRegions = store.getters["nestedRegions"](app.i18n);
      let regionIds = getRegionIds(regionSlug, allRegions, nestedRegions);
      actions = actions.filter((x) => regionIds.includes(x.clinic.region_id));
    }

    return {
      totalItemCount,
      pageCount,
      actions,
      regions,
      locate,
    };
  },
  data() {
    return {};
  },
  methods: {
    getName,
    getTitle,
    getText,
    regionSlug() {
      return this.$route.query.region || "";
    },
    currPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
    },
    buildURLparams(page, regionSlug = "") {
      return {
        page,
        region: regionSlug,
      };
    },
    async paginationBtnClick(page) {
      let URLparams = this.buildURLparams(page);
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    locateData(locate) {
      this.locate = locate;
      let URLparams = this.buildURLparams(this.currPage(), locate.url);
      this.$router.replace({ path: "", query: URLparams });
    },
  },
  head() {
    return {
      title: this.$t("seo.actionList.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("seo.actionList.description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("seo.actionList.keywords"),
        },
      ],
    };
  },
};
</script>   
—