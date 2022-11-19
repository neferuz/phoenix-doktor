<template>
  <main>
    <div class="yd-page-header">
      <p class="title">{{ $t("search_analyze") }}</p>
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <BlockSearch
              :origin="'analyze'"
              :rawSearchSlug="$route.params.slug"
              :rawlocateSlug="regionSlug()"
            />
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <p class="yd-page-title mb-4" :class="!regionSlug() ? 'd-none' : ''">
          {{ getRegionNameBySlug(regionSlug(), regionsList, true) }}
        </p>
        <nav class="yd-breadcrumb" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link :to="localePath('/')">{{ $t("main") }}</nuxt-link>
            </li>
            <li class="breadcrumb-item" v-b-modal.AnalyzeModal>
              <a href="#">{{ $t("analyzes") }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ getName(service()) }}
            </li>
          </ol>
        </nav>
        <h1 class="yd-page-title">
          {{ getName(service()) }}
          {{ getRegionLocalText(null) }}
          <span>{{ totalItemCount }} {{ $t("clinics2") }}</span>
        </h1>

        <div class="yd-select">
          <label for="ydPageFilter"> {{ $t("sort") }} </label>
          <b-dropdown
            toggle-class="dropdown-toggle ml-3"
            id="ydPageFilter"
            ref="sortDrp"
            variant="none"
          >
            <template #button-content>
              {{ $t("sort_options.rating") }}
            </template>
            <!-- <b-dd-item to="?sort=popularity" active>
              {{ $t("sort_options.popularity") }}
            </b-dd-item> -->
            <b-dd-item to="?sort=rating">
              {{ $t("sort_options.rating") }}
            </b-dd-item>
            <!-- <b-dd-item to="?sort=exp">
              {{ $t("sort_options.exp") }}
            </b-dd-item> -->
            <!-- <b-dd-item to="?sort=price">
              {{ $t("sort_options.price") }}
            </b-dd-item> -->
            <!-- <b-dd-item to="?sort=reviews">
              {{ $t("sort_options.reviews") }}
            </b-dd-item> -->
          </b-dropdown>
        </div>

        <div class="row">
          <div class="col-lg-6 mt-4" v-for="item in clinics" :key="item.id">
            <div class="card yd-card">
              <div class="row no-gutters justify-content-end">
                <div class="col-lg-8" :class="!!regionSlug() ? 'd-none' : ''">
                  <div class="card-city">
                    <h2>
                      {{ getRegionName(item.region_id, regionsList, true) }}
                    </h2>
                  </div>
                </div>
                <div class="col-12">
                  <div class="yd-card-header text-center d-lg-none">
                    <h5 class="card-title">
                      <nuxt-link :to="localePath(`/clinic/${item.url}`)">
                        {{ getName(item) }}
                      </nuxt-link>
                      <!-- <a data-toggle="modal" @click="toggleModal(item)">
                        {{ getName(item) }}
                      </a> -->
                    </h5>
                    <ul class="yd-card_cats">
                      <li>{{ getDescription(item) }}</li>
                    </ul>
                  </div>
                </div>
                <div class="col-4 text-center">
                  <a
                    class="c-pointer"
                    data-toggle="modal"
                    @click="toggleModal(item)"
                  >
                    <div class="yd-card_img">
                      <img
                        v-if="!!item.cover"
                        :src="getMediaUrl('clinics', item.cover)"
                        alt="..."
                      />
                      <img v-else src="~/assets/img/svg/Clinic.svg" alt="..." />
                    </div>
                  </a>
                  <div class="yd-card_stars">
                    <span>{{ getRating(item) }}</span>
                    <b-form-rating
                      v-model="item.rating"
                      color="#A569FE"
                      no-border
                      readonly
                      inline
                      size="lg"
                    ></b-form-rating>
                  </div>
                  <a
                    class="yd-card_feedbacks c-pointer"
                    data-toggle="modal"
                    @click="toggleModal(item)"
                  >
                    {{ $t("reviews") }}
                  </a>
                </div>
                <div class="col-8">
                  <div class="card-body">
                    <div class="yd-card-header d-lg-block d-none">
                      <ul class="yd-card_cats">
                        <li>{{ getDescription(item) }}</li>
                      </ul>
                      <h5 class="card-title">
                        <nuxt-link :to="localePath(`/clinic/${item.url}`)">
                          {{ getName(item) }}
                        </nuxt-link>
                        <!-- <a data-toggle="modal" @click="toggleModal(item)">
                          {{ getName(item) }}
                        </a> -->
                      </h5>
                    </div>
                    <ul class="yd-card_info">
                      <li>
                        <i class="far fa-calendar-week"></i>
                        {{ getWorkDays(item) }}
                      </li>
                      <li>
                        <i class="far fa-clock"></i>
                        {{ getWorkTime(item, $moment, $t) }}
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt"></i>
                        {{ getPrice(item) }} {{ $t("sum") }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div v-if="!isUserRegistered()" class="card-footer">
                    <button
                      type="button"
                      class="btn btn-primary fw-700"
                      v-b-modal.AuthModal
                    >
                      <i class="far fa-phone-alt"></i> {{ $t("contact") }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary fw-700"
                      v-b-modal.AuthModal
                    >
                      <i class="fal fa-map-marker-alt"></i> {{ $t("how_get") }}
                    </button>
                  </div>
                  <div v-else class="card-footer">
                    <b-dropdown
                      variant="primary"
                      menu-class="yd-drop-menu"
                      toggle-class="fw-700"
                      no-caret
                      @shown="
                        setTrack({
                          clinic: item.id,
                          analyze: service().id,
                          action: 'CONTACT',
                          selector: 'ANALYZE',
                        })
                      "
                    >
                      <template #button-content>
                        <i class="far fa-phone-alt"></i> {{ $t("contact") }}
                      </template>
                      <p class="title">{{ $t("contacts") }}</p>
                      <ul class="list">
                        <li
                          v-for="(phone, index) in getPhoneNumbers(item.phone)"
                          :key="index"
                        >
                          <a :href="'tel:' + phone">
                            <i class="far fa-phone-alt"></i>
                            {{ $options.filters.formatPhone(phone) }}
                          </a>
                        </li>
                      </ul>
                    </b-dropdown>
                    <b-dropdown
                      menu-class="yd-drop-menu dropdown-menu-right"
                      toggle-class="btn-outline-primary fw-700"
                      variant="none"
                      no-caret
                      right
                      @shown="
                        setTrack({
                          clinic: item.id,
                          analyze: service().id,
                          action: 'LOCATION',
                          selector: 'ANALYZE',
                        })
                      "
                    >
                      <template #button-content>
                        <i class="fal fa-map-marker-alt"></i>
                        {{ $t("how_get") }}
                      </template>
                      <p class="title">{{ $t("address") }}</p>
                      <ul class="list">
                        <li v-if="!!getAddress(item)">
                          <i class="fal fa-map-marker-alt"></i>
                          {{ getAddress(item) }}
                        </li>
                        <li v-if="!!getPoint(item)">
                          <i class="fal fa-map-pin"></i> {{ getPoint(item) }}
                        </li>
                        <li
                          v-if="!!getLocationURL(item.latitude, item.longitude)"
                        >
                          <i class="far fa-map"></i>
                          <a
                            target="blank"
                            :href="
                              getLocationURL(item.latitude, item.longitude)
                            "
                          >
                            <b>{{ $t("show_on_map") }}</b>
                          </a>
                        </li>
                      </ul>
                    </b-dropdown>
                  </div>
                </div>
              </div>
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

        <div
          class="d-lg-block d-none"
          v-html="getDescription(service(), false, null)"
        ></div>
      </div>
    </section>
    <TheModalClinicDetails />
  </main>
</template> 
 
<script>
import {
  getName,
  getDescription,
  getAddress,
  getPoint,
  getWorkTime,
  getWorkDays,
  getPhoneNumbers,
  getLocationURL,
  getPrice,
  getRating,
  getRegionIds,
  normalizeRating,
  getRegionName,
  getRegionNameBySlug,
  isUserRegistered,
  setTrack,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
  sortCompareFunction,
  getRegionLocalText,
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  async asyncData({ app, store, route, params, query, error, $config }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let page = query.page ? parseInt(query.page, 10) : 1;
    let region = params.region || "";
    let storeRegions = store.getters["regions"];
    let nestedRegions = store.getters["nestedRegions"](app.i18n);
    let regionIds = getRegionIds(region, storeRegions, nestedRegions);

    let itemInfo = store.getters["getAnalyzeBySlug"](params.slug);
    if (!itemInfo) return error({ statusCode: 404, message: "Page not found" });

    let clinics = [];
    let cData = {
      page,
      pageSize: $config.paginationItemSize,
      analyzes: itemInfo.id,
      regions: !!regionIds.length ? JSON.stringify(regionIds) : "",
    };

    let clinicsRes;
    try {
      clinicsRes = await app.$axios.post(
        "api/get-clinics",
        cData
      );

      if ((clinicsRes.data || {}).stateCode != 200)
        return error({ statusCode: 404, message: "Page not found" });

      clinicsRes = clinicsRes.data;
    } catch (e) {
      console.log(e);
      return error({ statusCode: 404, message: "Page not found" });
    }

    let clinicsRef = clinicsRes.analyzes.filter(
      (x) => x.analyse_id == itemInfo.id
    );

    if (!clinicsRef.length)
      return error({ statusCode: 404, message: "Page not found" });

    for (let i of clinicsRef) {
      let clinic = clinicsRes.clinics.find((x) => x.id == i.clinic_id);
      if (!clinic) continue;
      clinic.rating = normalizeRating(clinic.rating);
      clinics.push(Object.assign({}, i, clinic));
    }

    clinics = clinics.sort(sortCompareFunction("rating", false));

    let totalItemCount = clinicsRes.count;
    let pageCount = clinicsRes.pageCount;

    return {
      clinics,
      totalItemCount,
      pageCount,
      regionsList: storeRegions,
    };
  },
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  data() {
    return {
      service() {
        let slug = this.$route.params.slug;

        let service = this.$store.getters["getAnalyzeBySlug"](slug);
        // if (!service) return error({ statusCode: 404 });
        if (!service) throw new Error();

        return service;
      },
    };
  },
  computed: {
    // Перенёс на data, так как обьект head не видит computed
    // service() {
    //   let slug = this.$route.params.slug;
    //   let service = this.$store.getters["getAnalyzeBySlug"](slug);
    //   // if (!service) return error({ statusCode: 404 });
    //   if (!service) throw new Error();
    //   return service;
    // },
  },
  methods: {
    getName,
    getDescription,
    getAddress,
    getPoint,
    getWorkTime,
    getWorkDays,
    getPhoneNumbers,
    getLocationURL,
    getPrice,
    getRating,
    getRegionName,
    getRegionNameBySlug,
    isUserRegistered,
    setTrack,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
    getRegionLocalText,
    getMediaUrl,
    async paginationBtnClick(page) {
      let URLparams = this.buildURLparams(
        page,
        this.sortBy(),
        this.regionSlug()
      );
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    sortBy() {
      return this.$route.query.sort || "popularity";
    },
    regionSlug() {
      return this.$route.params.region || "";
    },
    currPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
    },
    buildURLparams(page, sortBy, regionSlug) {
      return {
        page,
        region: regionSlug,
        // sortBy,
      };
    },
    toggleModal(row) {
      // if (!this.isUserRegistered()) return this.$bvModal.show("AuthModal");

      row.origin = "analyze";
      row.serviceInfo = this.service();

      this.setTrack({
        analyze: this.service().id,
        clinic: row.id,
        action: "SHOW",
        selector: "ANALYZE",
      });

      $nuxt.$emit("toggleClinicDetailModal", row);
    },
    ContactBtnClicked(item) {
      console.log("inside");
    },
  },
  head() {
    return {
      title: this.getSeoTitle(this.service(), null),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSeoDescription(this.service(), null),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getSeoKeywords(this.service()),
        },
      ],
      link: [
        {
          ref: "canonical",
          href: this.$config.baseURL + this.$route.path + "/tashkent",
        },
      ],
    };
  },
};
</script>