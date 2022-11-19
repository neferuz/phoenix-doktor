<template>
  <main>
    <div class="yd-page-header">
      <img class="yd-page-header-bg" src="~assets/img/svg/bg-dots.svg" alt="" />
      <h2 class="title">
        {{ getTitle(blog, true) }}
      </h2>
    </div>

    <section>
      <div class="container">
        <div class="blog-img">
          <img
            v-if="blog.web_image"
            class="w-100 d-none d-sm-block"
            :src="getMediaUrl('blog', blog.web_image)"
            alt="blog photo"
          />
          <img
            v-if="blog.image"
            class="w-100 d-sm-none"
            :src="getMediaUrl('blog', blog.image)"
            alt="blog photo small"
          />
        </div>
        <div class="blog-content py-3" v-html="getText(blog, true)"></div>
        <p class="blog-date">{{ formatedDate(blog) }}</p>
      </div>
    </section>
    <nuxt-link
      :to="localePath('/blog/list')"
      class="btn yd-btn_alt mb-5 mx-auto"
    >
      {{ $t("opan_all_articles") }}
    </nuxt-link>
  </main>
</template>  
 
<script>
import {
  getName,
  getTitle,
  getDescription,
  getText,
  getMediaUrl,
  formatedDate,
  getSeoTitle,
  getSeoDescription,
  getSeoKeywords,
} from "~/plugins/custom.js";

export default {
  async asyncData({ app, store, params, $config, i18n, error }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let blogRes, blogData;

    let bData = { url: params.slug };
    try {
      blogRes = await app.$axios.post("api/get-blog", bData);
      blogData = blogRes.data.blog;
    } catch (e) {
      console.log(e);
      return;
    }

    if (!blogData.length)
      return error({ statusCode: 404, message: "Blog not found" });

    blogData = blogData[0];

    return {
      blog: blogData,
    };
  },
  data() {
    return {};
  },
  methods: {
    getName,
    getTitle,
    getDescription,
    getText,
    getMediaUrl,
    formatedDate,
    getSeoTitle,
    getSeoDescription,
    getSeoKeywords,
  },
  head() {
    return {
      title: this.getSeoTitle(this.blog, null),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSeoDescription(this.blog, null),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getSeoKeywords(this.blog),
        },
      ],
      link: [
        {
          ref: "canonical",
          href: this.$config.baseURL + this.$route.path + "/tashkent",
        },
      ],
    };
  },
};
</script>        
—