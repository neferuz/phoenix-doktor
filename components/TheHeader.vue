<template>
  <header class="sticky-top-lg sm-sticky-top">
    <nav class="navbar navbar-expand-lg yd-navbar px-lg-0">
      <div class="container-xl">
        <nuxt-link class="navbar-brand" :to="localePath('/')"
          ><img src="~/assets/photo/logo.png" width="100px" alt=""
        /></nuxt-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto">
            <li
              class="nav-item yd-menu-open"
              @mouseover="isHoveringMenu = true"
              @mouseout="isHoveringMenu = false"
              :class="{ show: isHoveringMenu }"
            >
              <a class="nav-link" href="#"
                ><i class="far fa-bars mr-2"></i>{{ $t("menu") }}</a
              >
              <div class="yd-menu">
                <div class="container">
                  <div class="tab-pane-block">
                    <!-- <TheTabMenu /> -->
                    <BlockTabMenu @close="closeTab" />
                  </div>
                </div>
              </div>
            </li>
            <li
              class="nav-item yd-menu-open"
              @mouseover="isHoveringDoctors = true"
              @mouseout="isHoveringDoctors = false"
              :class="{ show: isHoveringDoctors }"
            >
              <a class="nav-link" href="#">{{ $t("doctors") }}</a>
              <div class="yd-menu">
                <div class="container">
                  <div class="tab-pane-block">
                    <!-- <TheTabDoctors /> -->
                    <BlockTabDoctor :items="doctors" @close="closeTab" />
                  </div>
                </div>
              </div>
            </li>
            <li
              class="nav-item yd-menu-open"
              @mouseover="isHoveringProcedures = true"
              @mouseout="isHoveringProcedures = false"
              :class="{ show: isHoveringProcedures }"
            >
              <a class="nav-link" href="#">{{ $t("procedures") }}</a>
              <div class="yd-menu">
                <div class="container">
                  <div class="tab-pane-block">
                    <!-- <TheTabProcedure /> -->
                    <BlockTab
                      :type="'service'"
                      :step="0"
                      @close="closeTab"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li
              class="nav-item yd-menu-open"
              @mouseover="isHoveringAnalyzes = true"
              @mouseout="isHoveringAnalyzes = false"
              :class="{ show: isHoveringAnalyzes }"
            >
              <a class="nav-link" href="#">{{ $t("analyzes") }}</a>
              <div class="yd-menu">
                <div class="container">
                  <div class="tab-pane-block">
                    <!-- <TheTabAnalyze /> -->
                    <BlockTab
                      :type="'analyze'"
                      :step="0"
                      @close="closeTab"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li
              class="nav-item active"
              @click="
                $ga.event({
                  eventCategory: 'Tracking',
                  eventAction: 'Нажатие на онлайн косультацию',
                  eventLabel: 'click',
                })
              "
            >
              <NuxtLink class="nav-link" to="/on_dev">{{
                $t("online_consultation")
              }}</NuxtLink>
            </li>
          </ul>
        </div>
        <ul class="nav yd-right-nav">
          <b-nav-item-dropdown menu-class="dropdown-menu-center" offset="-40">
            <template #button-content>
              <i class="fal fa-globe"></i>
              <span>{{ $t(`lang.${$i18n.locale}`) }}</span>
            </template>

            <b-dropdown-item
              v-if="$i18n.locale != 'ru'"
              :to="switchLocalePath('ru')"
            >
              {{ $t(`lang.ru`) }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="$i18n.locale != 'uz'"
              :to="switchLocalePath('uz')"
            >
              {{ $t(`lang.uz`) }}</b-dropdown-item
            >
            <!-- <b-dropdown-item
              v-if="$i18n.locale != 'en'"
              :to="switchLocalePath('en')"
            >
              {{ $t(`lang.en`) }}
            </b-dropdown-item> -->
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>{{ $t(`lang.${$i18n.locale}`) }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <li class="nav-item yd-collab d-none d-lg-flex">
            <a
              v-show="isUserRegistered()"
              class="nav-link btn btn-outline-light"
              v-b-modal.CollabModal
            >
              {{ $t("cooperation") }}
            </a>
            <a
              v-show="!isUserRegistered()"
              class="nav-link btn btn-outline-light"
              v-b-modal.AuthModal
            >
              {{ $t("cooperation") }}
            </a>
          </li>

          <div v-if="isUserRegistered()" class="yd-user">
            <b-nav-item-dropdown menu-class="dropdown-menu-center" offset="-60">
              <template #button-content>
                <!-- {{ getUserInitials(getUserData().name) }} -->
              </template>
              <b-dropdown-item @click="onExit()">
                <i class="far fa-sign-out mr-2"></i> {{ $t("exit") }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <li v-else class="yd-user">
            <a class="nav-link btn" v-b-modal.AuthModal>
              <i class="far fa-sign-out"></i>
            </a>
          </li>
        </ul>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="modal"
          v-b-modal.MenuModal
        >
          <i class="far fa-bars"></i>
        </button>
      </div>
    </nav>
  </header>
</template>  

<script>
export default {
  name: "TheHeader",
  data: () => ({
    isHoveringMenu: false,
    isHoveringDoctors: false,
    isHoveringProcedures: false,
    isHoveringAnalyzes: false,
  }),
  computed: {
    doctors() {
      return this.$store.getters['category/getDoctors'];
    },
  },
  methods: {
    isUserRegistered() {
      return this.$store.getters["isUserRegistered"];
    },
    onExit() {
      if (process.browser) {
        window.localStorage.removeItem("userData");
        this.$store.dispatch("setUserData", {});
      }
    },
    closeTab() {
      this.isHoveringMenu = true;
      this.isHoveringDoctors = false;
      this.isHoveringProcedures = false;
      this.isHoveringAnalyzes = false;
    },
  },
};
</script>