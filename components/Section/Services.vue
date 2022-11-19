<template>
  <section class="service-bg">
    <div class="container">
      <div class="service row">
        <div class="col-lg-6">
          <h2 class="title">{{ $t("med_services") }}</h2>
        </div>
        <div class="col-lg-6 text-lg-right order-1 order-lg-0">
          <a href="#" class="btn service-more">
            <img :src="getMediaUrl('icons', 'airplane.svg')" alt="" />
            <b>Лечение за границей</b>
          </a>
        </div>
        <div class="col-12">
          <div class="service-grid">
            <div class="row">
              <div class="col-4 col-lg-3">
                <a
                  class="service-grid_item"
                  data-toggle="modal"
                  v-b-modal.DoctorsModal
                >
                  <img :src="getMediaUrl('icons', '1.svg')" alt="" />
                  <p>{{ $t("doctors") }}</p>
                </a>
              </div>
              <div class="col-4 col-lg-3">
                <a
                  class="service-grid_item"
                  data-toggle="modal"
                  data-target="#ProcedureModal"
                  v-b-modal.ProcedureModal
                >
                  <img :src="getMediaUrl('icons', '2.svg')" alt="" />
                  <p>{{ $t("procedures") }}</p>
                </a>
              </div>
              <div class="col-4 col-lg-3">
                <a
                  class="service-grid_item"
                  data-toggle="modal"
                  data-target="#AnalyzeModal"
                  v-b-modal.AnalyzeModal
                >
                  <img :src="getMediaUrl('icons', '3.svg')" alt="" />
                  <p>{{ $t("analyzes") }}</p>
                </a>
              </div>
              <div
                class="col-4 col-lg-3"
                v-for="item in otherAnalyzesItems"
                :key="item.id"
              >
                <nuxt-link
                  v-if="item.children.length == 0"
                  class="service-grid_item"
                  :to="localePath(buildChildRoute('analyze', item.url))"
                >
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  <p>{{ item.name }}</p>
                </nuxt-link>
                <a
                  v-else
                  class="service-grid_item c-pointer"
                  @click="toggleOtherAnalyzeModal(item)"
                >
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  <p>{{ item.name }}</p>
                </a>
              </div>
              <div
                class="col-4 col-lg-3"
                v-for="item in otherServicesItems"
                :key="item.id"
              >
                <nuxt-link
                  v-if="item.children.length == 0"
                  class="service-grid_item"
                  :to="localePath(buildChildRoute('service', item.url))"
                >
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  <p>{{ item.name }}</p>
                </nuxt-link>
                <a
                  v-else
                  class="service-grid_item c-pointer"
                  @click="toggleOtherServiceModal(item)"
                >
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  <p>{{ item.name }}</p>
                </a>
              </div>
              <div class="col-4 col-lg-3">
                <nuxt-link
                  class="service-grid_item"
                  :to="localePath('/pharmacy/list')"
                >
                  <img :src="getMediaUrl('icons', '10.svg')" alt="" />
                  <p>{{ $t("pharmacy") }}</p>
                </nuxt-link>
              </div>
              <div class="col-4 col-lg-3">
                <nuxt-link
                  class="service-grid_item"
                  :to="localePath('/actions/list')"
                >
                  <img :src="getMediaUrl('icons', '8.svg')" alt="" />
                  <p>{{ $t("actions") }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>  

<script>
import { getName, getMediaUrl } from "~/plugins/custom.js";

export default {
  name: "Services",
  data() {
    return {};
  },
  computed: {
    // otherAnalyzesItems() {
    //   return this.$store.getters["nestedOtherAnalyzes"](this.$i18n);
    // },
    // otherServicesItems() {
    //   return this.$store.getters["nestedOtherServices"](this.$i18n);
    // },
  },
  methods: {
    getName,
    getMediaUrl,
    toggleOtherServiceModal(item) {
      $nuxt.$emit("toggleProcedureModal", [item]);
    },
    toggleOtherAnalyzeModal(item) {
      $nuxt.$emit("toggleAnalyzeModal", [item]);
    },
    buildChildRoute(sub, id) {
      return `/${sub}/${id}`;
    },
  },
};
</script>