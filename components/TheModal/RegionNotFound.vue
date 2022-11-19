<template>
  <b-modal
    id="RegionNotFoundModal"
    modal-class="yd-auth-modal"
    size="xl"
    header-class="bg-none"
    hide-footer
    @hidden="modalHidden"
  >
    <template #modal-header="{ close }">
      <button
        type="button"
        class="close yd-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
      >
        <i class="far fa-times"></i>
      </button>
    </template>

    <div class="row h-100">
      <div class="col-lg-6 order-lg-1">
        <div class="yd-notFind">
          <h1
            class="title"
            v-html="$t('not_found_title', { name: getName(search) })"
          ></h1>
          <p class="info-text mb-2">
            <b>{{ $t("request_found_text") }}</b>
          </p>
          <form class="yd-form">
            <div class="form-row">
              <div class="col-lg mb-3">
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
                  <b-collapse
                    :id="origin + 'collapseLocate'"
                    class="yd-locate-list"
                  >
                    <div
                      class="accordion yd-accordion"
                      :id="origin + 'accordionLocate'"
                      role="tablist"
                    >
                      <b-card
                        v-for="region in regions"
                        :key="region.id"
                        no-body
                      >
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
                              {{ getName(region) }}
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
                            <li
                              v-for="child in region.children"
                              :key="child.id"
                            >
                              <button
                                @click="locateData(child)"
                                type="button"
                                v-b-toggle="origin + 'collapseLocate'"
                              >
                                {{ getName(child) }}
                              </button>
                            </li>
                          </ul>
                        </b-collapse>
                      </b-card>
                    </div>
                  </b-collapse>
                </label>
              </div>
              <div class="col-lg-auto mb-3" @click="closeModal">
                <nuxt-link
                  class="btn h-100 w-100 yd-btn_submit"
                  :event="isLinkDisabled() ? '' : 'click'"
                  :to="localePath(buildRoute())"
                >
                  {{ $t("search") }}
                </nuxt-link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg-6 h-lg-100">
        <img src="~assets/img/svg/doctors.svg" alt="" class="img-contain" />
      </div>
    </div>
  </b-modal>
</template>    

<script>
import { uniqBy } from "lodash-es";
import { getName, sortCompareFunction } from "~/plugins/custom.js";

export default {
  name: "TheRegionNotFoundModal",
  props: [],
  async created() {
    await this.$nuxt.$on(
      "toggleRegionNotFoundModal",
      async (origin, search, regionsIds) => {
        this.origin = origin;
        this.search = search;
        this.regionsIds = regionsIds;

        let allRegions = this.$store.getters["regions"];

        let filteredRegions = allRegions.filter((x) =>
          regionsIds.includes(x.id)
        );

        let regionsArr = [];
        for (let i of filteredRegions) {
          if (i.parent_id != null) {
            let parent = allRegions.find((x) => x.id == i.parent_id);
            regionsArr.push(parent);
          }
          regionsArr.push(i);
        }

        regionsArr = uniqBy(regionsArr, "name");

        let regions = regionsArr.filter((x) => x.parent_id == null);

        let name = this.$i18n.locale == "ru" ? "name" : "name_uz";
        for (let p of regions) {
          let children = regionsArr.filter((x) => x.parent_id == p.id);
          p.children = children.sort(sortCompareFunction(name)) || [];
        }

        this.regions = regions;

        this.$bvModal.show("RegionNotFoundModal");
      }
    );
  },
  data() {
    return {
      origin: "",
      locate: {},
      search: {},
      regionsIds: [],
      regions: [],
    };
  },
  computed: {},
  methods: {
    getName,
    locateData(locate) {
      this.locate = locate;
    },
    isLinkDisabled() {
      if (!this.search.id || !this.locate.id) return true;
      return false;
    },
    getSub() {
      let sub = "";
      if (this.origin == "mainHeader" || this.origin == "tabmenu") {
        sub = this.search.mark;
      } else if (this.origin == "analyze" || this.origin == "tabanalyze")
        sub = "analyze";
      else if (this.origin == "service" || this.origin == "tabservice")
        sub = "service";
      else sub = "direction";
      return sub;
    },
    buildRoute() {
      let sub = this.getSub();
      return `/${sub}/${this.search.url}/${this.locate.url}`;
    },
    closeModal() {
      this.$bvModal.hide("RegionNotFoundModal");
      this.$nuxt.refresh();
    },
    modalHidden() {
      this.origin = "";
      this.locate = {};
      this.search = {};
      this.regionsIds = [];
      this.regions = [];
    },
  },
};
</script> 