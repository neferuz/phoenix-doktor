<template>
  <main>
    <div class="yd-page-header">
      <p class="title">{{ $t("search_clinic") }}</p>
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <BlockSearch :origin="'mainHeader'" />
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <nav class="yd-breadcrumb" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link :to="localePath('/')">{{ $t("main") }}</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("clinics_list") }}
            </li>
          </ol>
        </nav>
        <h1 class="yd-page-title">
          {{ $t("clinics_list") }}
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
                <div class="col-12">
                  <div class="yd-card-header text-center d-lg-none">
                    <h5 class="card-title">
                      <a data-toggle="modal" @click="toggleModal(item)">
                        {{ getName(item) }}
                      </a>
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
                        <a data-toggle="modal" @click="toggleModal(item)">
                          {{ getName(item) }}
                        </a>
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
                          action: 'CONTACT',
                          selector: 'UNIT CLINIC',
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
                          action: 'LOCATION',
                          selector: 'UNIT CLINIC',
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
  getRating,
  normalizeRating,
  getRegionName,
  isUserRegistered,
  setTrack,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
  sortCompareFunction,
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  async asyncData({ app, store, route, params, query, error, $config }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let page = query.page ? parseInt(query.page, 10) : 1;
    let storeRegions = store.getters["regions"];

    let clinics = [];
    let cData = {
      page,
      pageSize: $config.paginationItemSize,
    };

    let clinicsRes;
    try {
      clinicsRes = await app.$axios.post(
        "api/get-clinics",
        cData
      );

      if ((clinicsRes.data || {}).stateCode != 200) throw new Error();

      clinicsRes = clinicsRes.data;
    } catch (e) {
      console.log(e);
      return error({ statusCode: 405 });
    }

    // let clinicsRef = clinicsRes.analyzes.filter(
    //   (x) => x.analyse_id == itemInfo.id
    // );

    // if (!clinicsRef.length) return error({ statusCode: 404 });

    // for (let i of clinicsRef) {
    //   let clinic = clinicsRes.clinics.find((x) => x.id == i.clinic_id);
    //   if (!clinic) continue;
    //   clinic.rating = normalizeRating(clinic.rating);
    //   clinics.push(Object.assign({}, i, clinic));
    // }

    for (let clinic of clinicsRes.clinics) {
      clinic.rating = normalizeRating(clinic.rating);
      clinics.push(Object.assign({}, clinic));
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
    return {};
  },
  computed: {},
  methods: {
    getName,
    getDescription,
    getAddress,
    getPoint,
    getWorkTime,
    getWorkDays,
    getPhoneNumbers,
    getLocationURL,
    getRating,
    getRegionName,
    isUserRegistered,
    setTrack,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
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

      row.origin = "unit doctor";

      this.setTrack({
        clinic: row.id,
        action: "SHOW",
        selector: "UNIT CLINIC",
      });

      $nuxt.$emit("toggleClinicDetailModal", row);
    },
    ContactBtnClicked(item) {
      console.log("inside");
    },
  },
  head() {
    return {
      title: this.$t("seo.clinics.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("seo.clinics.description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("seo.clinics.keywords"),
        },
      ],
    };
  },
};
</script>   
—