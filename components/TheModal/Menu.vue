<template>
  <b-modal
    id="MenuModal"
    modal-class="yd-modal"
    footer-class="justify-content-between"
    @hidden="modalHidden"
  >
    <template #modal-header="{ close }">
      <h5 class="modal-title" @click="setStep(0)">{{ $t("menu") }}</h5>
      <button
        v-if="step == 0"
        type="button"
        class="close yd-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
      >
        <i class="far fa-times"></i>
      </button>
      <button class="yd-tabs-close" v-else @click="decrStep">
        <i class="fas fa-arrow-left"></i> {{ $t("back") }}
      </button>
    </template>
    <template #modal-footer="{}">
      <NuxtLink
        @click.native="close"
        class="btn yd-collab-btn-blue m-0"
        :to="localePath('/on_dev')"
        >{{ $t("online_consultation") }}</NuxtLink
      >

      <a
        v-show="isUserRegistered()"
        @click="close"
        class="btn yd-collab-btn-blue m-0"
        v-b-modal.CollabModal
      >
        {{ $t("cooperation") }}
      </a>
      <a
        v-show="!isUserRegistered()"
        @click="close"
        class="btn yd-collab-btn-blue m-0"
        v-b-modal.AuthModal
      >
        {{ $t("cooperation") }}
      </a>
    </template>

    <div class="yd-tabs m-0 h-100">
      <b-tabs
        pills
        vertical
        content-class="col-12"
        nav-wrapper-class="col-12 tab-col"
        lazy
        :class="
          step == 0 ? '' : step == 1 ? 'menuTransform320' : 'menuTransform640'
        "
      >
        <!-- Directions -->
        <b-tab @click="incrStep()">
          <template #title>
            <img :src="getMediaUrl('icons', '1.svg')" alt="" />
            {{ $t("doctors") }}
          </template>
          <div class="yd-hide-list">
            <ul class="d-lg-none">
              <b-tabs pills content-class="">
                <b-tab
                  v-for="(values, propertyName) in doctors"
                  :key="values[0].id"
                  :title="propertyName"
                  title-link-class="btn yd-symbol"
                >
                  <ul class="yd-list">
                    <li v-for="value in values" :key="value.id" @click="close">
                      <nuxt-link :to="localePath('/direction/' + value.slug)">
                        {{ value.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </b-tab>
              </b-tabs>
            </ul>
            <div class="row yd-toggle-list">
              <div
                class="col-12 mb-4"
                v-for="(values, propertyName) in doctors"
                :key="values[0].id"
              >
              {{ values }}
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
        <!-- Services -->
        <b-tab class="h-100" @click="incrStep()">
          <template #title>
            <img :src="getMediaUrl('icons', '2.svg')" alt="" />
            {{ $t("procedures") }}
          </template>

          <div class="yd-tabs m-0 h-100">
            <b-tabs
              pills
              vertical
              content-class="col-12 tab-col"
              nav-wrapper-class="col-12 tab-col"
              lazy
            >
              <b-tab
                v-for="item in getHasChildItems(procedures)"
                :key="item.id"
                @click="incrStep()"
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
                        v-for="child in getHasNotChildItems(item.children)"
                        :key="child.id"
                        :item="child"
                        :type="'service'"
                        @close="close"
                      />
                    </ul>
                  </div>
                </div>
              </b-tab>
              <template #tabs-end>
                <div
                  @click="close"
                  v-for="item in procedures"
                  :key="item.id"
                >
                  <nuxt-link
                    class="nav-link"
                    :to="localePath(buildChildRoute('service', item.slug))"
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
        <!-- Analyzes -->
        <b-tab class="h-100" @click="incrStep()">
          <template #title>
            <img :src="getMediaUrl('icons', '3.svg')" alt="" />
            {{ $t("analyzes") }}
          </template>

          <div class="yd-tabs m-0 h-100">
            <b-tabs
              pills
              vertical
              content-class="col-12 tab-col"
              nav-wrapper-class="col-12 tab-col"
              lazy
            >
              <b-tab
                v-for="item in getHasChildItems(analyzes)"
                :key="item.id"
                @click="incrStep()"
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
                  v-for="item in getHasNotChildItems(analyzes)"
                  :key="item.id"
                >
                  <nuxt-link
                    class="nav-link"
                    :to="localePath(buildChildRoute('analyze', item.slug))"
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
        <!-- OtherAnalyzes -->
        <!-- <b-tab
          class="h-100"
          v-for="parent in otherAnalyzesItems"
          :key="parent.id"
          @click="incrStep()"
        >
          <template #title>
            <img :src="getMediaUrl('icons', parent.icon || '4.svg')" alt="" />
            {{ getName(parent) }}
          </template>
          <div class="yd-tabs m-0 h-100">
            <b-tabs
              pills
              vertical
              content-class="col-12 tab-col"
              nav-wrapper-class="col-12 tab-col"
              lazy
            >
              <b-tab
                v-for="item in parent.children"
                :key="item.id"
                @click="incrStep()"
              >
                <template #title>
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  {{ getName(item) }}
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
                    {{ getName(item) }}
                  </nuxt-link>
                </div>
              </template>
            </b-tabs>
          </div>
        </b-tab> -->
        <!-- OtherServices -->
        <!-- <b-tab
          class="h-100"
          v-for="parent in otherServicesItems"
          :key="parent.id"
          @click="incrStep()"
        >
          <template #title>
            <img :src="getMediaUrl('icons', parent.icon || '4.svg')" alt="" />
            {{ getName(parent) }}
          </template>
          <div class="yd-tabs m-0 h-100">
            <b-tabs
              pills
              vertical
              content-class="col-12 tab-col"
              nav-wrapper-class="col-12 tab-col"
              lazy
            >
              <b-tab
                v-for="item in parent.children"
                :key="item.id"
                @click="incrStep()"
              >
                <template #title>
                  <img
                    :src="getMediaUrl('icons', item.icon || '4.svg')"
                    alt=""
                  />
                  {{ getName(item) }}
                </template>
                <div class="yd-tab-list">
                  <div class="tab-list-item">
                    <ul class="yd-list">
                      <BlockTabList
                        v-for="child in item.children"
                        :key="child.id"
                        :item="child"
                        :type="'service'"
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
                    :to="localePath(buildChildRoute('service', item.url))"
                  >
                    <img
                      :src="getMediaUrl('icons', item.icon || '4.svg')"
                      alt=""
                    />
                    {{ getName(item) }}
                  </nuxt-link>
                </div>
              </template>
            </b-tabs>
          </div>
        </b-tab> -->
        <!-- <template #tabs-end>
          OtherAnalyze that has not children
          <div
            @click="close"
            v-for="item in otherAnalyzesItems"
            :key="item.id"
          >
            <nuxt-link
              class="nav-link"
              :to="localePath(buildChildRoute('analyze', item.url))"
            >
              <img :src="getMediaUrl('icons', item.icon || '4.svg')" alt="" />
              {{ getName(item) }}
            </nuxt-link>
          </div>
          otherServices that has not children
          <div
            @click="close"
            v-for="item in otherServicesItems"
            :key="item.id"
          >
            <nuxt-link
              class="nav-link"
              :to="localePath(buildChildRoute('service', item.url))"
            >
              <img :src="getMediaUrl('icons', item.icon || '4.svg')" alt="" />
              {{ getName(item) }}
            </nuxt-link>
          </div>

          Action btn
          <div @click="close">
            <nuxt-link class="nav-link" :to="localePath('/actions/list')">
              <img :src="getMediaUrl('icons', '8.svg')" alt="" />
              {{ $t("actions") }}
            </nuxt-link>
          </div>
        </template> -->
      </b-tabs>
    </div>
  </b-modal>
</template>  

<script>
import {
  getMediaUrl,
} from "~/plugins/custom.js";

export default {
  name: "TheMenuModal",
  data() {
    return {
      step: 0,
    };
  },
  computed: {
    doctors() {
      return this.$store.getters['category/getDoctors']
    },
    procedures() {
      return this.$store.getters['category/getProcedures']
    },
    analyzes() {
      return this.$store.getters['category/getAnalyzes']
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
    isUserRegistered() {
      return this.$store.getters["isUserRegistered"];
    },
    setStep(step = 0) {
      this.step = step
    },
    incrStep() {
      this.step++
    },
    decrStep() {
      this.step--
    },
    buildChildRoute(sub, id) {
      return `/${sub}/${id}`
    },
    close() {
      this.$emit("close");

      let els = document.getElementsByClassName("yd-menu-open");
      for (let el of els) {
        el.classList.remove("show");
      }

      this.$bvModal.hide("MenuModal");
      // this.$nuxt.refresh();
    },
    modalHidden() {
      this.step = 0;
    },
  },
};
</script>