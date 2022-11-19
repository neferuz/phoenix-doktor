<template>
  <!-- <div class="tab-list-item">
    <ul class="yd-list"> -->
  <li v-if="item.children.length > 0">
    <h4 class="yd-list-title">{{ item.name }}</h4>
    <b-collapse
      :id="'itemClps' + item.id"
      class="mt-2 yd-list-col-list"
      visible
    >
      <ul>
        <BlockTabListChild
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :type="type"
          @close="close"
        />
      </ul>
    </b-collapse>
  </li>
  <li v-else @click="close">
    <nuxt-link :to="localePath(buildChildRoute(type, item.slug))">
      {{ item.name }}
    </nuxt-link>
  </li>
  <!-- </ul>
  </div> -->
</template>

<script>
import { getName } from "~/plugins/custom.js";

export default {
  name: "TabList",
  props: ["item", "type"],
  data() {
    return {};
  },
  methods: {
    getName,
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
  },
};
</script>