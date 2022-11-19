<template>
  <li v-if="item.children.length > 0">
    <b-button
      v-b-toggle="'itemClps' + item.id"
      variant="none"
      class="yd-list-col-btn"
    >
      {{ getName(item) }}
    </b-button>
    <b-collapse :id="'itemClps' + item.id" class="mt-2 yd-list-col-list">
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
    <nuxt-link :to="localePath(buildChildRoute(type, item.url))">
      {{ getName(item) }}
    </nuxt-link>
  </li>
</template>

<script>
import { getName } from "~/plugins/custom.js";

export default {
  name: "TabListChild",
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