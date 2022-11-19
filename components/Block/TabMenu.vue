<template>
  <div class="header-yd-tabs">
    <!-- <BlockSearch :origin="'tabmenu'" /> -->
    <div class="yd-tabs">
      <b-tabs
        pills
        vertical
        content-class="col-lg-9 tab-col"
        nav-wrapper-class="col-lg-3 tab-col"
        lazy
      >
        <!-- Directions -->
        <b-tab>
          <template #title>
            <img :src="getMediaUrl('icons', '1.svg')" alt="" />
            {{ $t("doctors") }}
          </template>
          <div class="yd-hide-list">
            <ul class="d-lg-none">
              <b-tabs pills content-class="">
                <b-tab
                  v-for="(values, propertyName) in doctors"
                  :key="values.id"
                  :title="propertyName"
                  title-link-class="btn yd-symbol"
                >
                  <ul class="yd-list">
                    <li v-for="value in values" :key="value.id">
                      <nuxt-link
                        :to="localePath('/direction/' + value.slug)"
                        @click="close"
                      >
                        {{ value.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </b-tab>
              </b-tabs>
            </ul>
            <div class="row yd-toggle-list">
              <div
                class="col-lg-3 mb-4"
                v-for="(values, propertyName) in doctors"
                :key="values[0].id"
              >
                <h5 class="yd-symbol">{{ propertyName }}</h5>
                <ul class="yd-list">
                  <li v-for="value in values" :key="value.id" @click="close">
                    <nuxt-link :to="localePath('/direction/' + value.slug)">
                      {{ value.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </b-tab>
        <!-- Others -->
        <b-tab
          class="h-100"
          v-for="parent in getHasChildItems(items)"
          :key="parent.id"
        >
          <template #title>
            <img :src="getMediaUrl('icons', parent.icon || '4.svg')" alt="" />
            {{ $t(parent.name) }}
          </template>
          <div class="yd-tabs m-0 h-100">
            <b-tabs
              pills
              vertical
              content-class="col-lg-8 tab-col"
              nav-wrapper-class="col-lg-4 tab-col"
              lazy
            >
              <b-tab
                v-for="item in parent.children"
                :key="item.id"
              >
                <template #title>
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  {{ item.name }}
                </template>
                <div class="yd-tab-list">
                  <div class="tab-list-item">
                    <ul class="yd-list">
                      <BlockTabList
                        v-for="child in item.children"
                        :key="child.id"
                        :item="child"
                        :type="'analyze'"
                        @close="close"
                      />
                    </ul>
                  </div>
                </div>
              </b-tab>
              <template #tabs-end>
                <div
                  @click="close"
                  v-for="item in parent.children"
                  :key="item.id"
                >
                  <nuxt-link
                    class="nav-link"
                    :to="localePath(buildChildRoute('analyze', item.url))"
                  >
                    <img
                      :src="getMediaUrl('icons', item.icon || '4.svg')"
                      alt=""
                    />
                    {{ item.name }}
                  </nuxt-link>
                </div>
              </template>
            </b-tabs>
          </div>
        </b-tab>
        <template #tabs-end>
          <!-- OtherAnalyze that has not children -->
          <div
            @click="close"
            v-for="item in getHasNotChildItems(items)"
            :key="item.id"
          >
            <nuxt-link
              class="nav-link"
              :to="localePath(buildChildRoute('analyze', item.slug))"
            >
              <img :src="getMediaUrl('icons', item.icon || '4.svg')" alt="" />
              {{ item.name }}
            </nuxt-link>
          </div>
          <!-- Action btn -->
          <!-- <div @click="close">
            <nuxt-link class="nav-link" :to="localePath('/actions/list')">
              <img :src="getMediaUrl('icons', '8.svg')" alt="" />
              {{ $t("actions") }}
            </nuxt-link>
          </div> -->
        </template>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { getMediaUrl } from "~/plugins/custom.js";
export default {
  name: "BlockTabMenu",
  computed: {
    doctors() {
      return this.$store.getters['category/getDoctors']
    },
    // procedures() {
    //   return this.$store.getters['category/getProcedures']
    // },
    // analyzes() {
    //   return this.$store.getters['category/getAnalyzes']
    // },
    items() {
      return this.$store.getters['category/menuItems']
    }
  },
  methods: {
    getMediaUrl,
    getHasChildItems(arr) {
      return arr.filter((x) => !!x.children.length);
    },
    getHasNotChildItems(arr) {
      return arr.filter((x) => !x.children.length);
    },
    buildChildRoute(sub, id) {
      return `/${sub}/${id}/${this.$config.defaultRegionURL}`;
    },
    close() {
      this.$emit("close");

      let els = document.getElementsByClassName("yd-menu-open");
      for (let el of els) {
        el.classList.remove("show");
      }
    },
  },
};
</script>