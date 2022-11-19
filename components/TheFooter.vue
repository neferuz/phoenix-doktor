<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <div class="row justify-content-between">
          <div class="mb-xl-3 col-xl-auto order-1 order-xl-0">
            <div class="footer-logo">
             <!--  <img src="~/assets/img/logo.svg" alt="YaqinDoctor" class="w-5" /> -->
              <p>
                <b>©{{ current_year }}. {{ $t("footer.label") }}</b>
              </p>
              <p>{{ $t("footer.all_rights") }}</p>
            </div>
          </div>
          <div class="mb-3 col-6 col-lg-auto">
            <div class="footer-list">
              <h5 class="title">{{ $t("footer.service") }}</h5>
              <ul>
                <li>
                  <nuxt-link class="c-ponter" :to="localePath('/blog/list')">
                    {{ $t("blog") }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-3 col-6 col-lg-auto">
            <div class="footer-list">
              <h5 class="title">{{ $t("footer.patient") }}</h5>
              <ul>
                <!-- <li>
                  <a class="c-ponter" v-b-modal.DoctorsModal>
                    {{ $t("doctors") }}
                  </a>
                </li> -->
                <li>
                  <a class="c-ponter" v-b-modal.ProcedureModal>
                    {{ $t("procedures") }}
                  </a>
                </li>
                <li>
                  <a class="c-ponter" v-b-modal.AnalyzeModal>
                    {{ $t("analyzes") }}
                  </a>
                </li>
                <li>
                  <nuxt-link :to="localePath('/clinics')">
                    {{ $t("clinics") }}
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/doctors')">
                    {{ $t("doctors") }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-3 col-sm-6 col-lg-auto">
            <div class="footer-list">
              <ul class="footer-contacts">
               
                <li>
                  <a href="tel:+998935653801">
                    <img src="~/assets/img/icons/social/phone.svg" alt="" />
                    <span>+998 93 565 38 01</span>
                  </a>
                </li>
                <li>
                  <ul class="social">
                    <li>
                      <a
                        rel="nofollow"
                        href=""
                        target="_blank"
                      >
                        <img
                          src="~/assets/img/icons/social/telegram.svg"
                          alt="Telegram"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href=""
                        target="_blank"
                      >
                        <img
                          src="~/assets/img/icons/social/instagram.svg"
                          alt="Instagram"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href=""
                        target="_blank"
                      >
                        <img
                          src="~/assets/img/icons/social/facebook.svg"
                          alt="Facebook"
                        />
                      </a>
                    </li>
                    <!-- <li>
                      <a rel="nofollow" href="#"
                        ><img
                          src="~/assets/img/icons/social/youtube.svg"
                          alt="Youtube"
                      /></a>
                    </li> -->
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-3 col-sm-6 col-lg-auto">
            <div class="footer-list">
              <h5 class="title">{{ $t("footer.download") }}</h5>
              <ul class="download-app">
                <li>
                  <nuxt-link :to="localePath('/on_dev')">
                    <img
                      src="~/assets/img/icons/social/gp.svg"
                      alt="Google Play"
                    />
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/on_dev')">
                    <img
                      src="~/assets/img/icons/social/as.svg"
                      alt="App Store"
                    />
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      current_year: new Date().getFullYear()
    };
  },
};
</script>