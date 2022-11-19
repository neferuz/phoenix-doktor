<template>
  <div class="header-yd-tabs">
    <BlockSearch :origin="'tab' + type" />
    <div class="yd-tabs">
      <b-tabs
        pills
        vertical
        content-class="col-12 col-lg-8 tab-col"
        nav-wrapper-class="col-12 col-lg-4 tab-col"
        lazy
        :class="
          step == 0 ? '' : step == 1 ? 'menuTransform320' : 'menuTransform640'
        "
      >
        <b-tab
          v-for="item in hasChildItems"
          :key="item.id"
          @click="incrTabClick()"
        >
          <template #title>
            <img :src="getMediaUrl('icons', item.icon || '4.svg')" alt="" />
            {{ item.name }}
          </template>
          <div class="yd-tab-list">
            <div class="tab-list-item">
              <ul class="yd-list">
                <BlockTabList
                  v-for="child in item.children"
                  :key="child.id"
                  :item="child"
                  :type="type"
                  @close="close"
                />
              </ul>
            </div>
          </div>
        </b-tab>
        <template #tabs-end>
          <div
            @click="close"
            v-for="item in hasNotChildItems"
            :key="item.id"
          >
            <nuxt-link
              class="nav-link"
              :to="localePath(buildChildRoute(type, item.slug))"
            >
              <img :src="getMediaUrl('icons', item.icon || '4.svg')" alt="" />
              {{ item.name }}
            </nuxt-link>
          </div>
        </template>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import {
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  name: "BlockTab",
  props: ["type", "step"],
  data: () => ({
    items: []
  }),
  mounted() {
    if (this.type == 'analyze') {
      this.items = this.$store.getters['category/getAnalyzes']
    } else {
      this.items = this.$store.getters['category/getProcedures']
    }
  },
  computed: {
    hasChildItems() {
      return this.items.filter((x) => !!x.children.length);
    },
    hasNotChildItems() {
      return this.items.filter((x) => !x.children.length);
    }
  },
  methods: {
    getMediaUrl,
    close() {
      this.$emit("close");
      let els = document.getElementsByClassName("yd-menu-open");
      for (let el of els) {
        el.classList.remove("show");
      }
    },
    buildChildRoute(sub, id) {
      return `/${sub}/${id}/${this.$config.defaultRegionURL}`;
    },
    incrTabClick() {
      this.$emit("incrTabClick");
    },
  },
};
</script>