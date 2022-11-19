<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="mb-4">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="$router.back()"
            >
              <i class="fal fa-arrow-alt-left"></i>
              {{ $t("return_back") }}
            </button>
          </div>

          <div class="card yd-card h-auto">
            <div class="row no-gutters justify-content-end">
              <div class="col-lg-8">
                <div class="card-city">
                  <h1>
                    {{ getRegionName(clinic.region_id, regionsList, true) }}
                  </h1>
                </div>
              </div>
              <div class="col-12">
                <div class="yd-card-header text-center d-lg-none">
                  <h1 class="card-title">{{ getName(clinic) }}</h1>
                  <ul class="yd-card_cats">
                    <li>{{ getDescription(clinic) }}</li>
                  </ul>
                </div>
              </div>
              <div class="col-4 text-center">
                <div class="yd-card_img">
                  <img
                    v-if="!!clinic.cover"
                    :src="getMediaUrl('clinics', clinic.cover)"
                    alt="..."
                  />
                  <img v-else src="~/assets/img/svg/Clinic.svg" alt="..." />
                </div>
                <div class="yd-card_stars">
                  <span>{{ getRating(clinic) }}</span>
                  <b-form-rating
                    v-model="clinic.rating"
                    color="#A569FE"
                    no-border
                    readonly
                    inline
                    size="lg"
                  >
                  </b-form-rating>
                </div>
              </div>
              <div class="col-8">
                <div class="card-body">
                  <div class="yd-card-header d-lg-block d-none">
                    <ul class="yd-card_cats">
                      <li>{{ getDescription(clinic) }}</li>
                    </ul>
                    <h1 class="card-title">{{ getName(clinic) }}</h1>
                  </div>
                  <ul class="yd-card_info m-0">
                    <li>
                      <i class="far fa-calendar-week"></i>
                      {{ getWorkDays(clinic) }}
                    </li>
                    <li>
                      <i class="far fa-clock"></i>
                      {{ getWorkTime(clinic, $moment, $t) }}
                    </li>
                    <!-- <li>
                      <i class="far fa-money-bill-alt"></i>
                      {{ getPrice(clinic) }} {{ $t("sum") }}
                    </li> -->
                  </ul>
                  <div class="">
                    <b-dropdown
                      variant="none"
                      class="yd-all-serv"
                      toggle-class="p-0"
                      menu-class="yd-drop-menu"
                      v-if="services.length > 0"
                      no-caret
                      right
                    >
                      <template #button-content>
                        {{ $t("services_list") }}
                        <i class="fal fa-chevron-square-down"></i>
                      </template>
                      <template #default="{ hide }">
                        <p class="title">
                          {{ $t("services") }}:
                          <button class="close yd-close" @click="hide()">
                            <i class="far fa-times"></i>
                          </button>
                        </p>
                        <ul class="list">
                          <li v-for="item in services" :key="item.id">
                            <p>
                              {{ getName(item) }} - {{ getPrice(item) }}
                              {{ $t("sum") }}
                            </p>
                          </li>
                        </ul>
                      </template>
                    </b-dropdown>
                    <b-dropdown
                      variant="none"
                      class="yd-all-serv"
                      toggle-class="p-0"
                      menu-class="yd-drop-menu"
                      v-if="analyzes.length > 0"
                      no-caret
                      right
                    >
                      <template #button-content>
                        {{ $t("analyzes_list") }}
                        <i class="fal fa-chevron-square-down"></i>
                      </template>
                      <template #default="{ hide }">
                        <p class="title">
                          {{ $t("analyzes") }}:
                          <button class="close yd-close" @click="hide()">
                            <i class="far fa-times"></i>
                          </button>
                        </p>
                        <ul class="list">
                          <li v-for="item in analyzes" :key="item.id">
                            <p>
                              {{ getName(item) }} - {{ getPrice(item) }}
                              {{ $t("sum") }}
                            </p>
                          </li>
                        </ul>
                      </template>
                    </b-dropdown>
                  </div>
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
                        clinic: clinic.id,
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
                        v-for="(phone, index) in getPhoneNumbers(clinic.phone)"
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
                        clinic: clinic.id,
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
                      <li v-if="!!getAddress(clinic)">
                        <i class="fal fa-map-marker-alt"></i>
                        {{ getAddress(clinic) }}
                      </li>
                      <li v-if="!!getPoint(clinic)">
                        <i class="fal fa-map-pin"></i> {{ getPoint(clinic) }}
                      </li>
                      <li
                        v-if="
                          !!getLocationURL(clinic.latitude, clinic.longitude)
                        "
                      >
                        <i class="far fa-map"></i>
                        <a
                          target="blank"
                          :href="
                            getLocationURL(clinic.latitude, clinic.longitude)
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
          <div class="yd-reviews">
            <!-- Feedbacks -->
            <div
              class="yd-review-card"
              v-for="f in feedbacks"
              :key="f.type + f.id"
            >
              <img
                src="~/assets/img/svg/user_default.svg"
                alt="avatar"
                class="user-img"
              />
              <div class="card-body">
                <div v-if="f.type == 'rating'" class="card-info">
                  <div class="yd-card_stars">
                    <b-form-rating
                      v-model="f.rating"
                      color="#A569FE"
                      no-border
                      readonly
                      inline
                      size="lg"
                    ></b-form-rating>
                  </div>
                </div>
                <p class="review-date">
                  {{
                    f.full_name ||
                    (f.first_name || "") + " " + (f.last_name || "")
                  }}
                  •
                  {{ formatedDate(f) }}
                </p>
                <p v-if="f.type == 'review'" class="card-text">
                  {{ f.text }}
                </p>
              </div>
            </div>
            <form class="yd-review-form" @submit.prevent="">
              <div class="card-info">
                <p>{{ $t("rate") }}</p>
                <div class="yd-card_stars">
                  <b-form-rating
                    v-model="rate"
                    color="#A569FE"
                    no-border
                    inline
                    size="lg"
                  ></b-form-rating>
                </div>
              </div>
              <label class="yd-comment">
                <textarea
                  v-model="reviewText"
                  class="yd-textarea"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  :placeholder="$t('write_comment')"
                >
                </textarea>
                <button
                  v-if="!isUserRegistered()"
                  class="btn btn-primary"
                  v-b-modal.AuthModal
                >
                  {{ $t("send") }}
                </button>
                <button v-else class="btn btn-primary" @click="onReviewClick">
                  {{ $t("send") }}
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  formatedDate,
  normalizeRating,
  sortCompareFunction,
  getRegionName,
  isUserRegistered,
  setTrack,
  getUserData,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  mounted() {
    this.setTrack({
      // clinic: this.$route.params.slug,
      clinic: this.clinic.id,
      action: "SHOW",
      selector: "UNIT CLINIC",
    });
  },
  async asyncData({ app, store, params, error }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let cData = { all: 1 };

    let res;
    try {
      res = await app.$axios.post("api/get-clinics", cData);

      if ((res.data || {}).stateCode != 200) throw new Error();

      res = res.data;
    } catch (e) {
      console.log(e);
      return error({ statusCode: 405 });
    }

    let clinic = res.clinics.find((x) => x.url == params.slug);
    if (!clinic) return error({ statusCode: 404 });
    clinic.rating = normalizeRating(clinic.rating);

    // Building services and analyzes dictionary
    let analyzes = res.analyzes.filter((x) => x.clinic_id == clinic.id);
    let services = res.services.filter((x) => x.clinic_id == clinic.id);

    let analyzesRaw = store.getters["analyzes"];
    for (let i of analyzes) {
      let analyze = analyzesRaw.find((x) => i.analyse_id == x.id);
      if (analyze) Object.assign(i, analyze);
    }
    let otherAnalyzesRaw = store.getters["otherAnalyzes"];
    for (let i of analyzes) {
      let analyze = otherAnalyzesRaw.find((x) => i.analyse_id == x.id);
      if (analyze) Object.assign(i, analyze);
    }
    let servicesRaw = store.getters["services"];
    for (let i of services) {
      let service = servicesRaw.find((x) => i.service_id == x.id);
      if (service) Object.assign(i, service);
    }
    let otherServicesRaw = store.getters["otherServices"];
    for (let i of services) {
      let service = otherServicesRaw.find((x) => i.service_id == x.id);
      if (service) Object.assign(i, service);
    }

    let propertyName = app.i18n.locale == "ru" ? "name" : "name_uz";
    analyzes = analyzes.sort(sortCompareFunction(propertyName));
    services = services.sort(sortCompareFunction(propertyName));

    // Feedback and Rating
    // await this.setFeedback(clinic);
    // Cannot access to method, we are reply in this
    let reviews;
    try {
      let cData = { id: clinic.id, type: "clinic" };
      reviews = await app.$axios.post("api/get-feedback", cData)
      reviews = reviews.data.feedback;
    } catch (e) {
      console.log(e);
      reviews = [];
    }

    let ratings;
    try {
      let cData = { id: clinic.id, type: "clinic" };
      ratings = await app.$axios.post("api/get-rating", cData);
      ratings = ratings.data.rating;
      if (ratings.length)
        ratings = ratings.map((x) => {
          x.rating = normalizeRating(x.rating);
          return x;
        });
    } catch (e) {
      console.log(e);
      ratings = [];
    }

    reviews = reviews.map((x) => ((x.type = "review"), x));
    ratings = ratings.map((x) => ((x.type = "rating"), x));

    let feedbacks = reviews;
    feedbacks.push(...ratings);
    feedbacks = feedbacks.sort(sortCompareFunction("date"));

    // Список регионов
    let regionsList = store.getters["regions"];

    return {
      clinic,
      analyzes,
      services,
      regionsList,
      reviews,
      ratings,
      feedbacks,
    };
  },
  data() {
    return {
      rate: 0,
      reviewText: "",
    };
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
    formatedDate,
    normalizeRating,
    sortCompareFunction,
    getRegionName,
    isUserRegistered,
    setTrack,
    getUserData,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
    getMediaUrl,
    async setFeedback(clinic) {
      let reviews;
      try {
        let cData = { id: clinic.id, type: "clinic" };
        reviews = await this.$axios.post(
          "api/get-feedback",
          cData
        );
        reviews = reviews.data.feedback;
      } catch (e) {
        console.log(e);
        reviews = [];
      }

      let ratings;
      try {
        let cData = { id: clinic.id, type: "clinic" };
        ratings = await this.$axios.post("api/get-rating", cData);
        ratings = ratings.data.rating;
        if (ratings.length)
          ratings = ratings.map((x) => {
            x.rating = normalizeRating(x.rating);
            return x;
          });
      } catch (e) {
        console.log(e);
        ratings = [];
      }

      this.reviews = reviews;
      this.ratings = ratings;
      reviews = reviews.map((x) => ((x.type = "review"), x));
      ratings = ratings.map((x) => ((x.type = "rating"), x));

      this.feedbacks = reviews;
      this.feedbacks.push(...ratings);
      this.feedbacks = this.feedbacks.sort(sortCompareFunction("date"));
    },
    async onReviewClick() {
      if (!this.getUserData().id) return this.$bvModal.show("AuthModal");

      let rRes, fRes;

      if (this.rate > 0) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.clinic.id,
            obj_type: "clinic",
            rating: this.rate * 2,
          };
          rRes = await this.$axios.post(
            "api/create-rating",
            data
          );
          rRes = rRes.data.model;

          // Set track
          this.setTrack({
            clinic: this.clinic.id,
            action: "RATE",
            selector: "UNIT CLINIC",
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (!!this.reviewText.length) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.clinic.id,
            obj_type: "clinic",
            text: this.reviewText,
          };
          fRes = await this.$axios.post(
            "api/create-feedback",
            data
          );
          fRes = fRes.data.model;

          // Set track
          this.setTrack({
            clinic: this.clinic.id,
            action: "RATE",
            selector: "FEEDBACK",
          });
        } catch (e) {
          console.log(e);
        }
      }

      await this.setFeedback(this.clinic);

      this.rate = 0;
      this.reviewText = "";
    },
  },
  head() {
    return {
      title: this.getSeoTitle(this.clinic),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSeoDescription(this.clinic),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getSeoKeywords(this.clinic),
        },
      ],
    };
  },
};
</script>   
—