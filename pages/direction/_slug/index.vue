<template>
  <main>
    <div class="yd-page-header">
      <p class="title">{{ $t("search_doctor") }}</p>
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-10 mx-auto">
            <BlockSearch
              :origin="'direction'"
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
            <li class="breadcrumb-item" v-b-modal.DoctorsModal>
              <a href="#">{{ $t("doctors") }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ getName(direction()) }}
            </li>
          </ol>
        </nav>
        <h1 class="yd-page-title">
          {{ getName(direction()) }}
          {{ getRegionLocalText(null) }}
          <span>{{ totalItemCount }} {{ $t("doctors2") }}</span>
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
            <!-- <b-dd-item @click="sortBtnClick('popularity')" active>
              {{ $t("sort_options.popularity") }}
            </b-dd-item> -->
            <b-dd-item @click="sortBtnClick('rating')">
              {{ $t("sort_options.rating") }}
            </b-dd-item>
            <!-- <b-dd-item @click="sortBtnClick('exp')">
              {{ $t("sort_options.exp") }}
            </b-dd-item> -->
            <!-- <b-dd-item @click="sortBtnClick('price')">
              {{ $t("sort_options.price") }}
            </b-dd-item>
            <b-dd-item @click="sortBtnClick('reviews')">
              {{ $t("sort_options.reviews") }}
            </b-dd-item> -->
          </b-dropdown>
        </div>

        <div class="row">
          <div class="col-lg-6 mt-4" v-for="item in doctors" :key="item.id">
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
                      <nuxt-link :to="localePath(`/doctor/${item.url}`)">
                        {{ getName(item) }}
                      </nuxt-link>
                      <!-- <a data-toggle="modal" @click="toggleModal(item)">
                        {{ getName(item) }}
                      </a> -->
                    </h5>
                    <ul class="yd-card_cats">
                      <li v-for="d in item.directions" :key="d.id">
                        {{ getName(d) }}
                      </li>
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
                        v-if="!!item.photo"
                        :src="getMediaUrl('doctors', item.photo)"
                        alt="..."
                      />
                      <img
                        v-else
                        :src="
                          getMediaUrl('icons', 'doctor' + item.gender + '.svg')
                        "
                        alt="..."
                      />
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
                        <li v-for="d in item.directions" :key="d.id">
                          {{ getName(d) }}
                        </li>
                      </ul>
                      <h5 class="card-title">
                        <nuxt-link :to="localePath(`/doctor/${item.url}`)">
                          {{ getName(item) }}
                        </nuxt-link>
                        <!-- <a data-toggle="modal" @click="toggleModal(item)">
                          {{ getName(item) }}
                        </a> -->
                      </h5>
                    </div>
                    <ul class="yd-card_info">
                      <li><i class="far fa-building"></i> {{ item.clinic }}</li>
                      <li>
                        <i class="far fa-clock"></i>
                        {{ getReception(item) }}
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt"></i>
                        {{ getPrice(item) }} {{ $t("sum") }}
                      </li>
                      <li>
                        <i class="far fa-info"></i> {{ getBiography(item) }}
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
                          clinic: item.clinic_id,
                          doctor: item.id,
                          direction: direction().id,
                          action: 'CONTACT',
                          selector: 'DOCTOR',
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
                          clinic: item.clinic_id,
                          doctor: item.id,
                          direction: direction().id,
                          action: 'LOCATION',
                          selector: 'DOCTOR',
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
          v-html="getDescription(direction(), false, null)"
        ></div>
      </div>
    </section>
    <TheModalDoctorDetails />
  </main>
</template> 
 
<script>
import {
  getName,
  getDescription,
  getAddress,
  getPoint,
  getReception,
  getPhoneNumbers,
  getLocationURL,
  getPrice,
  getBiography,
  getRating,
  getRegionIds,
  normalizeRating,
  getRegionName,
  getRegionNameBySlug,
  getMediaUrl,
  isUserRegistered,
  setTrack,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
  sortCompareFunction,
  getRegionLocalText,
} from "~/plugins/custom.js";

export default {
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ app, store, params, query, error, $config }) {
    if (store.getters['category/isEmptyState']) {
      await store.dispatch('category/getCategories')
      await store.dispatch('category/getRegions')
    }
    let directions = store.getters['category/getDoctors']
    if (!directions) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    let direction;
    for(let key in directions) {
      for(let item in directions[key]) {
        if(directions[key][item].slug === params.slug) {
          direction = directions[key][item]
        }
      }
    }
    let page = query.page ? parseInt(query.page, 10) : 1;
    let region = params.region || "";
    let regions = store.getters['category/getRegions'];
    // let itemInfo = store.getters["getDirectionBySlug"](params.slug);
    // if (!itemInfo) return error({ statusCode: 404, message: "Page not found" });

    let doctors = [];

    let doctorsRes;
    try {
      await store.dispatch('doctors/getDoctorsList', direction.id)
    } catch (e) {
      return error({ statusCode: 404, message: "Page not found" });
    }

    doctors = store.getters['doctors/getDoctorsList']

    // doctors = doctorsRes.doctors.map((x) => {
    //   x.rating = normalizeRating(x.rating);
    //   return x;
    // });

    // for (let d of doctors) {
    //   let doctorDirsIds = doctorsRes.directions
    //     .filter((x) => x.doctor_id == d.id)
    //     .map((x) => x.direction_id);

    //   d.directions = directions;
    // }

    // doctors = doctors.sort(sortCompareFunction("rating", false));

    let totalItemCount = doctors.length;

    return {
      doctors,
      totalItemCount,
      regionsList: storeRegions,
    };
  },
  data() {
    return {
    };
  },
  computed: {
    // ?????????????? ???? data, ?????? ?????? ???????????? head ???? ?????????? computed
    // direction() {
    //   let slug = this.$route.params.slug;
    //   let direction = this.$store.getters["getDirectionBySlug"](slug);
    //   // if (!direction) return error({ statusCode: 404 });
    //   if (!direction) throw new Error();
    //   return direction;
    // },
  },
  methods: {
    getName,
    getDescription,
    getAddress,
    getPoint,
    getReception,
    getPhoneNumbers,
    getLocationURL,
    getPrice,
    getBiography,
    getRating,
    getRegionName,
    getRegionNameBySlug,
    getMediaUrl,
    isUserRegistered,
    setTrack,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
    getRegionLocalText,
    async paginationBtnClick(page) {
      let URLparams = this.buildURLparams(
        page,
        this.sortBy(),
        this.regionSlug()
      );
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    async sortBtnClick(sortBy) {
      let URLparams = this.buildURLparams(this.currPage(), sortBy);
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    sortBy() {
      return this.$route.query.sortBy || "popularity";
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
      // return `?page=${page}&sortBy=${sortBy}`;
    },
    toggleModal(row) {
      // if (!this.isUserRegistered()) return this.$bvModal.show("AuthModal");

      row.directionInfo = this.direction();

      this.setTrack({
        clinic: row.clinic_id,
        direction: this.direction().id,
        doctor: row.id,
        action: "SHOW",
        selector: "DOCTOR",
      });

      $nuxt.$emit("toggleDoctorDetailModal", row);
    },
  },
  head() {
    return {
      title: this.getSeoTitle(this.direction(), null),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSeoDescription(this.direction(), null),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getSeoKeywords(this.direction()),
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
???