<template>
  <form class="yd-form">
    <div class="form-row">
      <div
        :class="
          origin == 'mainHeader' ? 'col-lg-7 mb-3 mb-lg-0' : 'col-lg mb-3'
        "
      >
        <label class="yd-search">
          <input
            :id="origin + 'headerSearchInput'"
            type="text"
            class="form-control"
            :placeholder="inputSearchPlaceholder"
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="collapseSearch"
            autocomplete="off"
            v-b-toggle="origin + 'collapseSearch'"
            v-model="rawSearchText"
            @keyup="onSearchTextChange($event)"
          />
          <b-collapse :id="origin + 'collapseSearch'" class="yd-search-list">
            <p
              v-if="
                rawSearchText.length < 3 &&
                (!search.name || !search.name.length < 3)
              "
            >
              {{ $t("min_search_length") }}
            </p>
            <ul v-else>
              <li v-for="res in searchResult" :key="res.type + res.id">
                <button
                  type="button"
                  @click="searchData(res)"
                  v-html="
                    `<img src='${getMediaUrl(
                      'icons',
                      's_' + res.type + '.svg'
                    )}' alt='' />` +
                    $options.filters.highlight(getName(res), rawSearchText)
                  "
                  v-b-toggle="origin + 'collapseSearch'"
                ></button>
              </li>
            </ul>
          </b-collapse>
        </label>
      </div>
      <div
        :class="
          origin == 'mainHeader' ? 'col-lg-5 mb-3 mb-lg-0' : 'col-lg mb-3'
        "
      >
        <label class="yd-locate">
          <input
            type="text"
            class="form-control"
            :placeholder="$t('choose_location')"
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="collapseLocate"
            autocomplete="off"
            v-b-toggle="origin + 'collapseLocate'"
            :value="getName(locate)"
          />
          <b-collapse :id="origin + 'collapseLocate'" class="yd-locate-list">
            <div
              class="accordion yd-accordion"
              :id="origin + 'accordionLocate'"
              role="tablist"
            >
              <b-card v-for="region in regions" :key="region.id" no-body>
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      :data-target="`${origin}Locate-${region.id}`"
                      aria-expanded="false"
                      :aria-controls="`${origin}Locate-${region.id}`"
                      v-b-toggle="`${origin}Locate-${region.id}`"
                    >
                      {{ region.name }}
                    </button>
                  </h2>
                </b-card-header>
                <b-collapse
                  :id="`${origin}Locate-${region.id}`"
                  accordion="collapseLocateAccordion"
                  role="tabpanel"
                >
                  <ul class="card-body">
                    <li>
                      <button
                        @click="locateData(region)"
                        type="button"
                        v-b-toggle="origin + 'collapseLocate'"
                      >
                        {{ $t("all_regions") }}
                      </button>
                    </li>
                    <li v-for="child in region.children" :key="child.id">
                      <button
                        @click="locateData(child)"
                        type="button"
                        v-b-toggle="origin + 'collapseLocate'"
                      >
                        {{ child.name }}
                      </button>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
            </div>
          </b-collapse>
        </label>
      </div>
      <div
        :class="origin == 'mainHeader' ? 'col-lg-auto' : 'col-lg-auto mb-3'"
        @click="close"
      >
        <nuxt-link
          :class="
            origin == 'mainHeader'
              ? 'btn mt-lg-4 w-100 yd-btn_submit'
              : 'btn h-100 w-100 yd-btn_submit'
          "
          :to="localePath(buildRoute())"
          custom
          v-slot="{ href, navigate }"
          @click.native="searchBtnClick"
        >
          <span class="disabled" v-if="isLinkDisabled()">
            {{ $t("search") }}
          </span>
          <a v-else-if="isRegionNotFoundModalShow" @click="searchBtnClick">
            {{ $t("search") }}
          </a>
          <a v-else-if="isNuxtLinkPush" :href="href" @click="navigate">
            {{ $t("search") }}
          </a>
          <a v-else>{{ $t("search") }} </a>
        </nuxt-link>
        <nuxt-link
          ref="NuxtPrimaryLink"
          class="d-none"
          :to="localePath(buildRoute())"
        >
          {{ $t("search") }}
        </nuxt-link>
      </div>
    </div>
  </form>
</template>

<script>
// origin can be:
// * mainHeader
// * tabmenu
// * analyze
// * tabanalyze
// * service
// * tabservice
// * direction
// * tabdoctor

import { uniq, throttle } from "lodash-es";
import { getName, getMediaUrl } from "~/plugins/custom.js";

export default {
  name: "BlockSearch",
  props: ["origin", "rawSearchSlug", "rawlocateSlug"],
  data() {
    return {
      searchResult: [],
      locate: {},
      search: {},
      rawSearchText: "",
      isRegionNotFoundModalShow: false,
      isNuxtLinkPush: false,
      // NuxtPrimaryLinkEl вывел в переменную, чтобы гарантировать доступность(ref не гарантирует по умолчанию)
      NuxtPrimaryLinkEl: null,
    };
  },
  mounted() {
    if (this.rawSearchSlug) {
      let getterMethod = "";
      let searchGetterMethod = "";
      if (this.origin == "analyze") {
        getterMethod = "getAnalyzeBySlug";
        searchGetterMethod = "analyzeSearch";
      } else if (this.origin == "service") {
        getterMethod = "getServiceBySlug";
        searchGetterMethod = "serviceSearch";
      } else if (this.origin == "direction") {
        getterMethod = "getDirectionBySlug";
        searchGetterMethod = "directionSearch";
      }

      if (getterMethod != "") {
        let result = this.$store.getters[getterMethod](
          this.rawSearchSlug,
          this.$i18n
        );
        this.search = result;
        this.rawSearchText = this.getName(result);

        // Pre result for dropdown
        // let name = this.$i18n.locale == "ru" ? "name" : "name_uz";
        // let searchResult = this.$store.getters[searchGetterMethod](
        //   this.search[name],
        //   this.$i18n
        // );
        // this.searchResult = searchResult;
      }
    }

    if (this.rawlocateSlug) {
      let regions = this.$store.getters["regions"];
      let region = regions.find((x) => x.url == this.rawlocateSlug);
      if (region) this.locateData(region);
    }

    const interval = setInterval(() => {
      if (this.$refs.NuxtPrimaryLink) {
        this.NuxtPrimaryLinkEl = this.$refs.NuxtPrimaryLink;
        clearInterval(interval);
      }
    }, 50);
  },
  computed: {
    regions() {
      return this.$store.getters['category/getRegions'];
    },
    inputSearchPlaceholder() {
      let text = "";
      if (this.origin == "mainHeader" || this.origin == "tabmenu")
        text = this.$t("search_global");
      else if (this.origin == "analyze" || this.origin == "tabanalyze")
        text = this.$t("search_analyze");
      else if (this.origin == "service" || this.origin == "tabservice")
        text = this.$t("search_service");
      else if (this.origin == "direction" || this.origin == "tabdoctor")
        text = this.$t("search_doctor");

      return text;
    },
  },
  methods: {
    getName,
    getMediaUrl,
    locateData(locate) {
      this.locate = locate;
    },
    searchData(data) {
      this.search = data;
      let name = this.getName(data);
      this.rawSearchText = name;
    },
    onSearchTextChange(event) {
      if (event.target.value.length < 3) return;

      this.searchQuery(event.target.value);
    },
    searchQuery: throttle(async function (query) {
      if (query.length < 3) return;

      let qData = { q: query };

      let result = [];
      let resultRaw = [];
      try {
        let res = await this.$axios.post("api/search", qData);
        if ((res.data || {}).stateCode != 200) throw new Error();
        resultRaw = res.data.result;
      } catch (e) {
        console.log(e);
        return e({ statusCode: 405 });
      }

      if (this.origin == "analyze" || this.origin == "tabanalyze") {
        result = resultRaw.filter((x) => x.type == "analyze");
      } else if (this.origin == "service" || this.origin == "tabservice") {
        result = resultRaw.filter((x) => x.type == "service");
      } else if (this.origin == "direction" || this.origin == "tabdoctor") {
        result = resultRaw.filter((x) => x.type == "direction");
        let secondResult = resultRaw.filter((x) => x.type == "doctor");
        result = result.concat(secondResult);
      } else {
        result = resultRaw;
      }

      this.searchResult = result;
    }, 50),
    isLinkDisabled() {
      if (this.search.type == "clinic" || this.search.type == "doctor")
        return false;
      if (!this.search.id || !this.locate.id) return true;
      return false;
    },
    // getSub() {
    //   let sub = "";
    //   if (this.origin == "mainHeader" || this.origin == "tabmenu") {
    //     sub = this.search.type;
    //   } else if (this.origin == "analyze" || this.origin == "tabanalyze")
    //     sub = "analyze";
    //   else if (this.origin == "service" || this.origin == "tabservice")
    //     sub = "service";
    //   else sub = "direction";
    //   return sub;
    // },
    getSub() {
      let sub = "";
      if (this.origin == "mainHeader" || this.origin == "tabmenu") {
        sub = this.search.type;
      } else if (this.origin == "analyze" || this.origin == "tabanalyze")
        sub = "analyze";
      else if (this.origin == "service" || this.origin == "tabservice")
        sub = "service";
      else {
        if (this.search.type == "doctor") sub = "doctor";
        else sub = "direction";
      }
      return sub;
    },
    buildRoute() {
      let sub = this.getSub();
      let url = `/${sub}/${this.search.url}`;
      if (sub != "clinic" && sub != "doctor" && this.locate.url)
        url += `/${this.locate.url}`;
      return url;
    },
    close() {
      if (this.isLinkDisabled()) return;
      if (this.$parent.close) this.$parent.close();
    },
    async searchBtnClick() {
      if (this.isLinkDisabled()) return;

      let sub = this.getSub();

      if (this.search.type == "clinic" || this.search.type == "doctor") {
        this.isRegionNotFoundModalShow = false;
        this.isNuxtLinkPush = true;
        this.NuxtPrimaryLinkEl.$el.click();
        return;
      }

      let subParam = "";
      let regionIds = [];
      if (this.locate.parent_id == null) {
        let pRegion = this.regions.find((x) => x.id == this.locate.id);
        if (!pRegion) regionIds.push(this.locate.id);
        else {
          regionIds = pRegion.children.map((x) => x.id);
          regionIds.push(this.locate.id);
        }
      } else {
        regionIds.push(this.locate.id);
      }
      let cData = { regions: JSON.stringify(regionIds) };

      if (sub == "analyze") subParam = "analyzes";
      else if (sub == "service") subParam = "services";
      else if (sub == "direction") subParam = "directions";

      let dataRes;
      cData[subParam] = this.search.id;

      let apiQuery = sub == "direction" ? "api/get-doctors" : "api/get-clinics";
      try {
        let res = await this.$axios.post(apiQuery, cData);
        if ((res.data || {}).stateCode != 200) throw new Error();
        dataRes = res.data;
      } catch (e) {
        console.log(e);
        return e({ statusCode: 405 });
      }

      if (dataRes.count > 0) {
        this.isRegionNotFoundModalShow = false;
        this.isNuxtLinkPush = true;
        // this.$refs.NuxtPrimaryLink.$el.click();
        this.NuxtPrimaryLinkEl.$el.click();
      } else {
        this.isRegionNotFoundModalShow = true;
        this.isNuxtLinkPush = false;
        let rData = { all: 1 };
        rData[subParam] = this.search.id;

        let allRes = await this.$axios.post(apiQuery, rData);

        if ((allRes.data || {}).stateCode != 200) throw new Error();
        allRes = allRes.data;

        let regionIds;
        if (sub == "direction") {
          regionIds = allRes.doctors.map((x) => x.region_id);
        } else {
          regionIds = allRes.clinics.map((x) => x.region_id);
        }

        regionIds = uniq(regionIds);

        $nuxt.$emit(
          "toggleRegionNotFoundModal",
          this.origin,
          this.search,
          regionIds
        );
      }
    },
  },
};
</script>