<template>
  <b-modal
    id="BlogModal"
    modal-class="yd-blog-modal"
    size="xl"
    hide-header
    hide-footer
  >
    <div class="modal-header">
      <h4 class="modal-title pr-5 pr-xl-0" v-html="getTitle(item, true)"></h4>
      <p class="blog-date">{{ formatedDate(item) }}</p>
      <button
        type="button"
        class="close yd-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="closeModal()"
      >
        <i class="far fa-times"></i>
      </button>
    </div>
    <div class="modal-blog-img">
      <img :src="getMediaUrl('blog', item.image)" alt="" />
    </div>
    <div class="modal-body" v-html="getText(item, true)"></div>
  </b-modal>
</template>    

<script>
import {
  getName,
  getTitle,
  getDescription,
  getText,
  getMediaUrl,
  formatedDate,
} from "~/plugins/custom.js";

export default {
  name: "TheBlog",
  async created() {
    await this.$nuxt.$on("toggleBlogModal", async (item) => {
      this.item = item;
      this.$bvModal.show("BlogModal");
    });
  },
  data() {
    return {
      item: {},
    };
  },
  computed: {},
  methods: {
    getName,
    getTitle,
    getDescription,
    getText,
    getMediaUrl,
    formatedDate,
    closeModal() {
      this.$bvModal.hide("BlogModal");
      this.$nuxt.refresh();
    },
  },
};
</script>