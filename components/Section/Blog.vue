<template>
  <section>
    <div class="container">
      <div class="yd-blog">
        <div class="row row-cols-1 row-cols-lg-3">
          <nuxt-link
            v-for="item in blogData"
            :key="item.id"
            :to="localePath('/blog/' + item.url)"
          >
            <!-- @click="toggleModal(item)" -->
            <div class="col mb-5 mb-md-4 c-pointer">
              <div class="card yd-blog-card h-100">
                <nuxt-img
                  :src="getMediaUrl('blog', item.image)"
                  class="card-img-top"
                  alt="..."
                />

                <div class="card-body">
                  <h5 class="card-title">{{ getTitle(item, true) }}</h5>
                  <p class="card-date">{{ formatedDate(item) }}</p>
                  <div
                    class="card-text"
                    v-html="getDescription(item, true)"
                  ></div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <nuxt-link
          :to="localePath('/blog/list')"
          class="btn yd-btn_alt mt-4 mx-auto"
        >
          {{ $t("opan_all_articles") }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>  

<script>
import {
  getName,
  getTitle,
  getDescription,
  getMediaUrl,
  formatedDate,
} from "~/plugins/custom.js";

export default {
  name: "Blog",
  props: ["blogData"],
  data() {
    return {};
  },
  methods: {
    getName,
    getTitle,
    getDescription,
    getMediaUrl,
    formatedDate,
    toggleModal(row) {
      $nuxt.$emit("toggleBlogModal", row);
    },
  },
};
</script>