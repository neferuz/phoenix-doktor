// This for sitemap
import axios from "axios";
// ----------------

export default {
  server: {
    host: '0.0.0.0', 
    timing: false // default: localhost
  },

  head: {
    title: "YaqinDoctor",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "theme-color", content: "#4c6fff" },
      { name: "yandex-verification", content: "ba38a5820f343035" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stlysheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
      {
        defer: true,
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
      },
    ],
  },

  css: [
    "~/assets/css/style.css",
  ],

  plugins: ["~plugins/filters.js", "~plugins/v-mask.js"],

  components: true,

  publicRuntimeConfig: {
    media_url: "https://panel.yaqin-doctor.uz/uploads/",
    paginationItemSize: 10,
    googleAnalytics: {
      id: "UA-192572954-2",
    },
    baseURL: "https://yaqin-doctor.uz",
    defaultRegionURL: "tashkent",
  },

  buildModules: [
    "nuxt-compress",
    [
      "@nuxtjs/moment",
      { locales: ["ru"], timezone: true, defaultTimezone: "Asia/Tashkent" },
    ],
    "@nuxtjs/google-analytics",
  ],

  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/i18n",
    [
      "nuxt-compress",
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    "@nuxtjs/sitemap",
    "@nuxtjs/yandex-metrika",
    "nuxt-speedkit",
  ],

  axios: {
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: process.env.API_URL,
      pathRewrite: { "^/api/": "" },
    },
  },
  i18n: {
    locales: [
      {
        name: "O'zbekcha",
        code: "uz",
        iso: "uz-UZ",
        file: "uz.js",
      },
      {
        name: "Русский",
        code: "ru",
        iso: "ru-RU",
        file: "ru.js",
      },
      // {
      //   name: "English",
      //   code: "en",
      //   iso: "en-US",
      //   file: "en.js",
      // },
    ],
    lazy: true,
    seo: false,
    parsePages: true,
    langDir: "locales/",
    defaultLocale: "ru",
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: null,
    },
  },
  sitemap: function () {
    return {
      hostname: "https://yaqin-doctor.uz/",
      gzip: true,
      routes: async () => {
        let wrapArr = [];

        let apiHeaderObj = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Token:
              "APA91bGy-yeGMvvM465TVYjN-Hj-oNKDk2-nHAJ1MmP4Kbx2dRZnIaUyOkNSySCo1KBEuKy-h6BrE3zD-uHkfJxPH--bp1pQTyDdLc2lREQ8O-Y8stuPFpQjr-xOVv0ASNpFeSl0Ee4V",
          },
        };

        // --- Get Data Routes ------
        let dataRes = (
          await axios.get("https://yaqin-doctor.uz/api/get-data", apiHeaderObj)
        ).data;

        let analyzeRoutes = dataRes.analyzes.map((x) => `/analyze/${x.url}`);
        let serviceRoutes = dataRes.services.map((x) => `/service/${x.url}`);
        let directionRoutes = dataRes.directions.map(
          (x) => `/direction/${x.url}`
        );
        let otherAnalyzeRoutes = dataRes.otherAnalyzes.map(
          (x) => `/analyze/${x.url}`
        );
        let otherServiceRoutes = dataRes.otherServices.map(
          (x) => `/service/${x.url}`
        );

        wrapArr.push(
          ...analyzeRoutes,
          ...directionRoutes,
          ...serviceRoutes,
          ...otherAnalyzeRoutes,
          ...otherServiceRoutes
        );

        // --- Get Clinics Routes ------
        let clinicsRes = (
          await axios.post(
            "https://yaqin-doctor.uz/api/get-clinics",
            { all: 1 },
            apiHeaderObj
          )
        ).data;

        let clinicRoutes = clinicsRes.clinics.map((x) => `/clinic/${x.url}`);

        wrapArr.push(...clinicRoutes);

        // --- Get Doctors Routes ------
        let doctorsRes = (
          await axios.post(
            "https://yaqin-doctor.uz/api/get-doctors",
            { all: 1 },
            apiHeaderObj
          )
        ).data;

        let doctorRoutes = doctorsRes.doctors.map((x) => `/doctor/${x.url}`);

        wrapArr.push(...doctorRoutes);

        // ---- Get Data With Regions Routes ----
        let analyzeRegionRoutes = [];
        let serviceRegionRoutes = [];
        let directionRegionRoutes = [];
        for (let item of dataRes.analyzes) {
          let dictionary = clinicsRes.analyzes.filter(
            (x) => x.analyse_id == item.id
          );
          let clinicsIds = dictionary.map((x) => x.clinic_id);
          let clinics = clinicsRes.clinics.filter((x) =>
            clinicsIds.includes(x.id)
          );
          let regionIds = clinics.map((x) => x.region_id);
          let regions = dataRes.regions.filter((x) => regionIds.includes(x.id));
          for (let r of regions) {
            analyzeRegionRoutes.push(`/analyze/${item.url}/${r.url}`);
          }
        }
        for (let item of dataRes.services) {
          let dictionary = clinicsRes.services.filter(
            (x) => x.service_id == item.id
          );
          let clinicsIds = dictionary.map((x) => x.clinic_id);
          let clinics = clinicsRes.clinics.filter((x) =>
            clinicsIds.includes(x.id)
          );
          let regionIds = clinics.map((x) => x.region_id);
          let regions = dataRes.regions.filter((x) => regionIds.includes(x.id));
          for (let r of regions) {
            serviceRegionRoutes.push(`/service/${item.url}/${r.url}`);
          }
        }
        for (let item of dataRes.directions) {
          let dictionary = doctorsRes.directions.filter(
            (x) => x.direction_id == item.id
          );
          let doctorsIds = dictionary.map((x) => x.doctor_id);
          let doctors = doctorsRes.doctors.filter((x) =>
            doctorsIds.includes(x.id)
          );
          let regionIds = doctors.map((x) => x.region_id);
          let regions = dataRes.regions.filter((x) => regionIds.includes(x.id));
          for (let r of regions) {
            directionRegionRoutes.push(`/direction/${item.url}/${r.url}`);
          }
        }

        wrapArr.push(
          ...analyzeRegionRoutes,
          ...serviceRegionRoutes,
          ...directionRegionRoutes
        );

        // --- Get Blog Routes ------
        let blogRes = (
          await axios.post(
            "https://yaqin-doctor.uz/api/get-blog",
            { all: 1 },
            apiHeaderObj
          )
        ).data;

        let blogRoutes = blogRes.blog.map((x) => `/blog/${x.url}`);

        wrapArr.push(...blogRoutes);

        return wrapArr;
      },
    };
  },
  googleAnalytics: {
    id: "UA-192572954-2",
  },
  yandexMetrika: {
    id: "87597191",
    webvisor: true,
  },
  speedkit: {
    detection: {
      performance: true,
      browserSupport: true,
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },

    componentAutoImport: false,
    componentPrefix: undefined,

    lazyOffset: {
      component: "0%",
      asset: "0%",
    },

    loader: {
      dataUri: null,
      size: "100px",
      backgroundColor: "grey",
    },
  },

  build: {
    transpile: ["lodash-es"],
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
  },
};
