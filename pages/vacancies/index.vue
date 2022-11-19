<template>
  <main>
    <section class="vacan">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-8">
            <div class="vacan-header">
              <h2 class="title">{{ $t("vacancy.title") }}</h2>
              <p class="subtitle">
                {{ $t("vacancy.subtitle") }}
              </p>
            </div>
            <div class="vacan-list">
              <div class="vacan-list-header">
                <div class="col-5">{{ $t("vacancy.col1") }}</div>
                <div class="col">{{ $t("vacancy.col2") }}</div>
                <div class="col">{{ $t("vacancy.col3") }}</div>
              </div>
              <div class="vacan-list-body" v-if="!isUserRegistered()">
                <div
                  class="vacan-item"
                  v-for="v in vacancies"
                  :key="v.id"
                  v-b-modal.AuthModal
                >
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col1") }}
                  </div>
                  <div class="col-6 col-md-5 vacan-item_set">
                    {{ getName(v, true) }}
                  </div>
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col2") }}
                  </div>
                  <div class="col-6 col-md vacan-item_set">
                    {{ getDepartment(v) }}
                  </div>
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col3") }}
                  </div>
                  <div class="col-6 col-md vacan-item_set">
                    {{ getRegionName(v.region_id, regionsList) }}
                  </div>
                </div>
              </div>
              <div class="vacan-list-body" v-else>
                <div
                  class="vacan-item"
                  v-for="v in vacancies"
                  :key="v.id"
                  @click="toggleModal(v)"
                >
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col1") }}
                  </div>
                  <div class="col-6 col-md-5 vacan-item_set">
                    {{ getName(v, true) }}
                  </div>
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col2") }}
                  </div>
                  <div class="col-6 col-md vacan-item_set">
                    {{ getDepartment(v) }}
                  </div>
                  <div class="d-md-none col-6 vacan-item_param">
                    {{ $t("vacancy.col3") }}
                  </div>
                  <div class="col-6 col-md vacan-item_set">
                    {{ getRegionName(v.region_id, regionsList) }}
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
    <TheModalVacancy />
  </main>
</template>
 
<script>
import {
  getName,
  getDepartment,
  getRegionName,
  isUserRegistered,
} from "~/plugins/custom.js";

export default {
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ app, store, query, $config }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let vacancies = [];
    let page = query.page ? parseInt(query.page, 10) : 1;

    let aData = { page, pageSize: $config.paginationItemSize };
    const vacanciesRes = await app.$axios.post(
      "api/get-vacancies",
      aData
    );
    vacancies = vacanciesRes.data.vacancies;

    let totalItemCount = vacanciesRes.data.count;
    let pageCount = vacanciesRes.data.pageCount;

    // Список регионов
    let regionsList = store.getters["regions"];

    return {
      totalItemCount,
      pageCount,
      vacancies,
      regionsList,
    };
  },
  methods: {
    getName,
    getDepartment,
    getRegionName,
    isUserRegistered,
    currPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
    },
    buildURLparams(page) {
      return { page };
    },
    async paginationBtnClick(page) {
      let URLparams = this.buildURLparams(page);
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    toggleModal(row) {
      $nuxt.$emit("toggleVacancyModal", row);
    },
  },
};
</script>   
—