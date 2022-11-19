<template>
  <b-modal
    id="DoctorDetailsModal"
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
                    <li v-for="d in item.directions" :key="d.id">
                      {{ getName(d) }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-4 text-center">
                <div class="yd-card_img">
                  <img
                    v-if="!!item.photo"
                    :src="getMediaUrl('doctors', item.photo)"
                    alt="..."
                  />
                  <img
                    v-else
                    :src="getMediaUrl('icons', 'doctor' + item.gender + '.svg')"
                    alt="..."
                  />
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
                      <li v-for="d in item.directions" :key="d.id">
                        {{ getName(d) }}
                      </li>
                    </ul>
                    <h5 class="card-title">{{ getName(item) }}</h5>
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
                        direction: item.directionInfo.id,
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
                        direction: item.directionInfo.id,
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
  getReception,
  getPhoneNumbers,
  getLocationURL,
  getPrice,
  getBiography,
  formatedDate,
  getRating,
  normalizeRating,
  getRegionName,
  getMediaUrl,
  isUserRegistered,
  sortCompareFunction,
  getUserData,
  setTrack,
} from "~/plugins/custom.js";

export default {
  name: "TheDoctorDetails",
  async created() {
    await this.$nuxt.$on("toggleDoctorDetailModal", async (item) => {
      this.item = item;
      this.rate = 0;

      await this.setFeedback();

      // Список регионов
      this.regionsList = this.$store.getters["regions"];

      this.$bvModal.show("DoctorDetailsModal");
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
  computed: {},
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
    formatedDate,
    getRating,
    getRegionName,
    getMediaUrl,
    isUserRegistered,
    sortCompareFunction,
    getUserData,
    setTrack,
    async setFeedback() {
      let reviews;
      try {
        let cData = { id: this.item.id, type: "doctor" };
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
        let cData = { id: this.item.id, type: "doctor" };
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
            clinic: this.item.clinic_id,
            doctor: this.item.id,
            direction: this.item.directionInfo.id,
            action: "RATE",
            selector: "DOCTOR",
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
            clinic: this.item.clinic_id,
            doctor: this.item.id,
            direction: this.item.directionInfo.id,
            action: "FEEDBACK",
            selector: "DOCTOR",
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
      this.$bvModal.hide("DoctorDetailsModal");
      this.$nuxt.refresh();
    },
  },
};
</script>