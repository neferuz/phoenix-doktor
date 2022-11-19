<template>
  <section>
    <div class="container">
      <div class="yd-service-border">
        <div class="yd-service">
          <a
            href="#ydDoctors"
            class="yd-toggle"
            @click.prevent="setActive('ydDoctors')"
            :class="{ active: isActive('ydDoctors') }"
          >
            {{ $t("doctors") }}
          </a>
          <a
            href="#ydProcedures"
            class="yd-toggle"
            @click.prevent="setActive('ydProcedures')"
            :class="{ active: isActive('ydProcedures') }"
          >
            {{ $t("procedures") }}
          </a>
          <a
            href="#ydAnalyzes"
            class="yd-toggle"
            @click.prevent="setActive('ydAnalyzes')"
            :class="{ active: isActive('ydAnalyzes') }"
          >
            {{ $t("analyzes") }}
          </a>
          <div class="yd-toggle-list">
            <div
              class="service-block-border"
              id="ydDoctors"
              :class="{ show: isActive('ydDoctors') }"
            >
              <div class="service-block">
                <h2 class="title">{{ $t("doctors") }}</h2>
                <div class="service-list">
                  <nuxt-link
                    v-for="d in directions.slice(0, 21)"
                    :key="d.id"
                    :to="localePath(buildChildRoute('direction', d.url))"
                    class="btn service-list__item"
                  >
                    {{ getName(d) }} <span>{{ d.children.length }}</span>
                  </nuxt-link>
                  <a class="btn service-list__item all" v-b-modal.DoctorsModal>
                    {{ $t("all_specialities", { count: directions.length }) }}
                  </a>
                </div>
              </div>
            </div>
            <div
              class="service-block-border"
              id="ydProcedures"
              :class="{ show: isActive('ydProcedures') }"
            >
              <div class="service-block">
                <h2 class="title">{{ $t("procedures") }}</h2>
                <div class="service-list">
                  <nuxt-link
                    v-for="d in services.slice(0, 20)"
                    :key="d.id"
                    :to="localePath(buildChildRoute('service', d.url))"
                    class="btn service-list__item"
                  >
                    {{ getName(d) }} <span>{{ d.children.length }}</span>
                  </nuxt-link>
                  <a
                    class="btn service-list__item all"
                    v-b-modal.ProcedureModal
                  >
                    {{ $t("all_procedures", { count: services.length }) }}
                  </a>
                </div>
              </div>
            </div>
            <div
              class="service-block-border"
              id="ydAnalyzes"
              :class="{ show: isActive('ydAnalyzes') }"
            >
              <div class="service-block">
                <h2 class="title">{{ $t("analyzes") }}</h2>
                <div class="service-list">
                  <nuxt-link
                    v-for="d in analyzes.slice(0, 20)"
                    :key="d.id"
                    :to="localePath(buildChildRoute('analyze', d.url))"
                    class="btn service-list__item"
                  >
                    {{ getName(d) }} <span>{{ d.children.length }}</span>
                  </nuxt-link>
                  <a class="btn service-list__item all" v-b-modal.AnalyzeModal>
                    {{ $t("all_analyzes", { count: analyzes.length }) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getName } from "~/plugins/custom.js";

export default {
  name: "Directory",
  props: ["doctors", "clinics"],
  data() {
    return { activeItem: "ydDoctors" };
  },
  computed: {
    // directions() {
    //   let storeDirections = this.$store.getters["directions"];

    //   for (let d of storeDirections) {
    //     let children = this.doctors.directions.filter(
    //       (x) => x.direction_id == d.id
    //     );
    //     d.children = children || [];
    //   }
    //   return storeDirections;
    // },
    services() {
      let storeServices = this.$store.getters["services"];
      storeServices = storeServices.filter(
        (x) => parseInt(x.is_folder, 10) == 0
      );

      for (let s of storeServices) {
        let children = this.clinics.services.filter(
          (x) => x.service_id == s.id
        );
        s.children = children || [];
      }
      return storeServices;
    },
    analyzes() {
      let storeAnalyzes = this.$store.getters["analyzes"];
      storeAnalyzes = storeAnalyzes.filter(
        (x) => parseInt(x.is_folder, 10) == 0
      );

      for (let s of storeAnalyzes) {
        let children = this.clinics.analyzes.filter(
          (x) => x.analyse_id == s.id
        );
        s.children = children || [];
      }
      return storeAnalyzes;
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    getName,
    buildChildRoute(sub, id) {
      return `/${sub}/${id}`;
    },
  },
};
</script>