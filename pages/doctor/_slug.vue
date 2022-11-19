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
              <div class="col-12">
                <div class="yd-card-header text-center d-lg-none">
                  <h1 class="card-title">{{ getName(doctor) }}</h1>
                  <ul class="yd-card_cats">
                    <li>{{ getDescription(doctor) }}</li>
                  </ul>
                </div>
              </div>
              <div class="col-4 text-center">
                <div class="yd-card_img">
                  <img
                    v-if="!!doctor.photo"
                    :src="getMediaUrl('doctors', doctor.photo)"
                    alt="..."
                  />
                  <img
                    v-else
                    :src="
                      getMediaUrl('icons', 'doctor' + doctor.gender + '.svg')
                    "
                    alt="..."
                  />
                </div>
                <div class="yd-card_stars">
                  <span>{{ getRating(doctor) }}</span>
                  <b-form-rating
                    v-model="doctor.rating"
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
                      <li>{{ getDescription(doctor) }}</li>
                    </ul>
                    <h1 class="card-title">{{ getName(doctor) }}</h1>
                  </div>
                  <ul class="yd-card_info m-0">
                    <li><i class="far fa-building"></i> {{ doctor.clinic }}</li>
                    <li>
                      <i class="far fa-clock"></i>
                      {{ getReception(doctor) }}
                    </li>
                    <li>
                      <i class="far fa-money-bill-alt"></i>
                      {{ getPrice(doctor) }} {{ $t("sum") }}
                    </li>
                    <li>
                      <i class="far fa-info"></i> {{ getBiography(doctor) }}
                    </li>
                  </ul>
                  <b-dropdown
                    variant="none"
                    class="yd-all-serv mb-3"
                    toggle-class="p-0"
                    menu-class="yd-drop-menu"
                    v-if="directions.length > 0"
                    no-caret
                    right
                  >
                    <template #button-content>
                      {{ $t("directions_list") }}
                      <i class="fal fa-chevron-square-down"></i>
                    </template>
                    <template #default="{ hide }">
                      <p class="title">
                        {{ $t("directions") }}:
                        <button class="close yd-close" @click="hide()">
                          <i class="far fa-times"></i>
                        </button>
                      </p>
                      <ul class="list">
                        <li v-for="item in directions" :key="item.id">
                          <p>
                            {{ getName(item) }}
                          </p>
                        </li>
                      </ul>
                    </template>
                  </b-dropdown>
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
                        clinic: doctor.clinic_id,
                        doctor: doctor.id,
                        action: 'CONTACT',
                        selector: 'UNIT DOCTOR',
                      })
                    "
                  >
                    <template #button-content>
                      <i class="far fa-phone-alt"></i> {{ $t("contact") }}
                    </template>
                    <p class="title">{{ $t("contacts") }}</p>
                    <ul class="list">
                      <li
                        v-for="(phone, index) in getPhoneNumbers(doctor.phone)"
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
                        clinic: doctor.clinic_id,
                        doctor: doctor.id,
                        action: 'LOCATION',
                        selector: 'UNIT DOCTOR',
                      })
                    "
                  >
                    <template #button-content>
                      <i class="fal fa-map-marker-alt"></i>
                      {{ $t("how_get") }}
                    </template>
                    <p class="title">{{ $t("address") }}</p>
                    <ul class="list">
                      <li v-if="!!getAddress(doctor)">
                        <i class="fal fa-map-marker-alt"></i>
                        {{ getAddress(doctor) }}
                      </li>
                      <li v-if="!!getPoint(doctor)">
                        <i class="fal fa-map-pin"></i> {{ getPoint(doctor) }}
                      </li>
                      <li
                        v-if="
                          !!getLocationURL(doctor.latitude, doctor.longitude)
                        "
                      >
                        <i class="far fa-map"></i>
                        <a
                          target="blank"
                          :href="
                            getLocationURL(doctor.latitude, doctor.longitude)
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
  getPhoneNumbers,
  getLocationURL,
  getPrice,
  getRating,
  formatedDate,
  normalizeRating,
  sortCompareFunction,
  getReception,
  getBiography,
  getMediaUrl,
  isUserRegistered,
  setTrack,
  getUserData,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
} from "~/plugins/custom.js";

export default {
  mounted() {
    this.setTrack({
      // doctor: this.$route.params.slug,
      clinic: this.doctor.clinic_id,
      doctor: this.doctor.id,
      action: "SHOW",
      selector: "UNIT DOCTOR",
    });
  },
  async asyncData({ app, store, params, error }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let cData = { all: 1 };

    let res;
    try {
      res = await app.$axios.post("api/get-doctors", cData);

      if ((res.data || {}).stateCode != 200) throw new Error();

      res = res.data;
    } catch (e) {
      console.log(e);
      return error({ statusCode: 405 });
    }

    let doctor = res.doctors.find((x) => x.url == params.slug);
    if (!doctor) return error({ statusCode: 404 });
    doctor.rating = normalizeRating(doctor.rating);

    // Building directions dictionary
    let directions = res.directions.filter((x) => x.doctor_id == doctor.id);

    let directionsRaw = store.getters["directions"];
    for (let i of directions) {
      let direction = directionsRaw.find((x) => i.direction_id == x.id);
      if (direction) Object.assign(i, direction);
    }

    let propertyName = app.i18n.locale == "ru" ? "name" : "name_uz";
    directions = directions.sort(sortCompareFunction(propertyName));

    // Feedback and Rating
    // await this.setFeedback(doctor);
    // Cannot access to method, we are reply in this
    let reviews;
    try {
      let cData = { id: doctor.id, type: "doctor" };
      reviews = await app.$axios.post("api/get-feedback", cData);
      reviews = reviews.data.feedback;
    } catch (e) {
      console.log(e);
      reviews = [];
    }

    let ratings;
    try {
      let cData = { id: doctor.id, type: "doctor" };
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

    return {
      doctor,
      directions,
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
    getPhoneNumbers,
    getLocationURL,
    getPrice,
    getRating,
    formatedDate,
    normalizeRating,
    sortCompareFunction,
    getReception,
    getBiography,
    getMediaUrl,
    isUserRegistered,
    setTrack,
    getUserData,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
    async setFeedback(doctor) {
      let reviews;
      try {
        let cData = { id: doctor.id, type: "doctor" };
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
        let cData = { id: doctor.id, type: "doctor" };
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
            obj_id: this.doctor.id,
            obj_type: "doctor",
            rating: this.rate * 2,
          };
          rRes = await this.$axios.post(
            "api/create-rating",
            data
          );
          rRes = rRes.data.model;

          // Set track
          this.setTrack({
            clinic: this.doctor.clinic_id,
            doctor: this.doctor.id,
            action: "RATE",
            selector: "UNIT DOCTOR",
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (!!this.reviewText.length) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.doctor.id,
            obj_type: "doctor",
            text: this.reviewText,
          };
          fRes = await this.$axios.post(
            "api/create-feedback",
            data
          );
          fRes = fRes.data.model;

          // Set track
          this.setTrack({
            doctor: this.doctor.id,
            action: "RATE",
            selector: "FEEDBACK",
          });
        } catch (e) {
          console.log(e);
        }
      }

      await this.setFeedback(this.doctor);

      this.rate = 0;
      this.reviewText = "";
    },
  },
  head() {
    return {
      title: this.getSeoTitle(this.doctor),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSeoDescription(this.doctor),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getSeoKeywords(this.doctor),
        },
      ],
    };
  },
};
</script>   
—