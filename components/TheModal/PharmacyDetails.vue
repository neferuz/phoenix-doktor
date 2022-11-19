<template>
  <b-modal
    id="PharmacyDetailsModal"
    modal-class="yd-auth-modal"
    size="xl"
    hide-header
    hide-footer
  >
    <button
      type="button"
      class="close yd-close"
      data-dismiss="modal"
      aria-label="Close"
      @click="closeModal()"
    >
      <i class="far fa-times"></i>
    </button>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div>
          <div class="card yd-card">
            <div class="row no-gutters justify-content-end">
              <div class="col-lg-8">
                <div class="card-city">
                  <h1>
                    {{ getRegionName(item.region_id, regionsList, true) }}
                  </h1>
                </div>
              </div>
              <div class="col-12">
                <div class="yd-card-header text-center d-lg-none">
                  <h5 class="card-title">{{ getName(item) }}</h5>
                  <ul class="yd-card_cats">
                    <li>{{ getDescription(item) }}</li>
                  </ul>
                </div>
              </div>
              <div class="col-4 text-center">
                <div class="yd-card_img">
                  <img
                    v-if="!!item.cover"
                    :src="getMediaUrl('clinics', item.cover)"
                    alt="..."
                  />
                  <img v-else src="~/assets/img/svg/Clinic.svg" alt="..." />
                </div>
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
              </div>
              <div class="col-8">
                <div class="card-body">
                  <div class="yd-card-header d-lg-block d-none">
                    <ul class="yd-card_cats">
                      <li>{{ getDescription(item) }}</li>
                    </ul>
                    <h5 class="card-title">{{ getName(item) }}</h5>
                  </div>
                  <ul class="yd-card_info">
                    <!-- <li><i class="far fa-calendar-week"></i> Пн - Сб</li>
                    <li>
                      <i class="far fa-clock"></i>
                      {{ getWorkTime(item, $moment, $t) }}
                    </li>
                    <li>
                      <i class="far fa-money-bill-alt"></i>
                      {{ getPrice(item) }} {{ $t("sum") }}
                    </li> -->
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
                        pharmacy: item.id,
                        action: 'CONTACT',
                        selector: 'PHARMACY',
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
                        pharmacy: item.id,
                        action: 'LOCATION',
                        selector: 'PHARMACY',
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
                          :href="getLocationURL(item.latitude, item.longitude)"
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
            <!-- Rating -->
            <!-- <div class="yd-review-card" v-for="r in ratings" :key="r.id">
              <img
                src="~/assets/img/svg/user_default.svg"
                alt="avatar"
                class="user-img"
              />
              <div class="card-body">
                <div class="card-info">
                  <div class="yd-card_stars">
                    <b-form-rating
                      v-model="r.rating"
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
                    r.full_name ||
                    (r.first_name || "") + " " + (r.last_name || "")
                  }}
                  •
                  {{ formatedDate(r) }}
                </p>
              </div>
            </div> -->
            <!-- Otziv -->
            <!-- <div class="yd-review-card" v-for="r in reviews" :key="r.id">
              <img
                src="~/assets/img/svg/user_default.svg"
                alt="avatar"
                class="user-img"
              />
              <div class="card-body">
                <p class="review-date">
                  {{
                    r.full_name ||
                    (r.first_name || "") + " " + (r.last_name || "")
                  }}
                  •
                  {{ formatedDate(r) }}
                </p>
                <p class="card-text">
                  {{ r.text }}
                </p>
              </div>
            </div> -->
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
                  type="submit"
                  class="btn btn-primary"
                  @click="onReviewClick"
                >
                  {{ $t("send") }}
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
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
  getRegionName,
  isUserRegistered,
  sortCompareFunction,
  getUserData,
  setTrack,
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  name: "ThePharmacyDetails",
  async created() {
    await this.$nuxt.$on("togglePharmacyDetailModal", async (item) => {
      this.item = item;
      this.rate = 0;

      await this.setFeedback();

      // Список регионов
      this.regionsList = this.$store.getters["regions"];

      this.$bvModal.show("PharmacyDetailsModal");
    });
  },
  data() {
    return {
      reviews: [],
      ratings: [],
      feedbacks: [],
      item: {},
      rate: 0,
      reviewText: "",
      regionsList: [],
    };
  },
  computed: {
    items() {
      return this.$store.getters["nestedAnalyzes"](this.$i18n);
    },
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
    getRegionName,
    isUserRegistered,
    sortCompareFunction,
    getUserData,
    setTrack,
    getMediaUrl,
    async setFeedback() {
      let reviews;
      try {
        let cData = { id: this.item.id, type: "pharmacy" };
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
        let cData = { id: this.item.id, type: "pharmacy" };
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

      // TODO: check for is user rating exist, if exist not send create rating
      if (this.rate > 0) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.item.id,
            obj_type: "pharmacy",
            rating: this.rate * 2,
          };
          rRes = await this.$axios.post(
            "api/create-rating",
            data
          );
          rRes = rRes.data.model;

          // Set track
          this.setTrack({
            pharmacy: this.item.id,
            action: "RATE",
            selector: "PHARMACY",
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (!!this.reviewText.length) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.item.id,
            obj_type: "pharmacy",
            text: this.reviewText,
          };
          fRes = await this.$axios.post(
            "api/create-feedback",
            data
          );
          fRes = fRes.data.model;

          // Set track
          this.setTrack({
            pharmacy: this.item.id,
            action: "FEEDBACK",
            selector: "PHARMACY",
          });
        } catch (e) {
          console.log(e);
        }
      }

      await this.setFeedback();

      this.rate = 0;
      this.reviewText = "";
    },
    closeModal() {
      this.$bvModal.hide("PharmacyDetailsModal");
      this.$nuxt.refresh();
    },
  },
};
</script>