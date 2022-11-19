<template>
  <main>
    <div class="yd-page-header">
      <img class="yd-page-header-bg" src="~assets/img/svg/bg-dots.svg" alt="" />
      <h2 class="title">
        {{ $t("blog") }}
      </h2>
    </div>

    <section>
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-3">
          <nuxt-link
            v-for="item in blogData"
            :key="item.id"
            :to="localePath('/blog/' + item.url)"
          >
            <!-- @click="toggleModal(item)" -->
            <div class="col mb-5 mb-md-4 c-pointer">
              <div class="card yd-blog-card h-100">
                <img
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
  </main>
</template>  
 
<script>
import {
  getName,
  getTitle,
  getText,
  getMediaUrl,
  formatedDate,
  getDescription,
} from "~/plugins/custom.js";

export default {
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  async asyncData({ app, store, query, $config, i18n }) {
    if (store.getters["isEmptyState"] === true) await store.dispatch("fetch");

    let page = query.page ? parseInt(query.page, 10) : 1;

    let blogRes, blogData;

    let bData = { page, pageSize: $config.paginationItemSize };
    try {
      blogRes = await app.$axios.post("api/get-blog", bData);
      blogData = blogRes.data.blog;
    } catch (e) {
      console.log(e);
      return;
    }

    let totalItemCount = blogRes.data.count;
    let pageCount = blogRes.data.pageCount;

    return {
      totalItemCount,
      pageCount,
      blogData,
    };
  },
  data() {
    return {};
  },
  methods: {
    getName,
    getTitle,
    getText,
    getMediaUrl,
    formatedDate,
    getDescription,
    currPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
    },
    buildURLparams(page, regionId = "") {
      return {
        page,
        region: regionId,
      };
    },
    async paginationBtnClick(page) {
      let URLparams = this.buildURLparams(page);
      await this.$router.replace({ path: "", query: URLparams });

      window.scrollTo(0, 0);
    },
    toggleModal(row) {
      $nuxt.$emit("toggleBlogModal", row);
    },
  },
  head() {
    return {
      title: this.$t("seo.blogList.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("seo.blogList.description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("seo.blogList.keywords"),
        },
      ],
    };
  },
};
</script>        
—