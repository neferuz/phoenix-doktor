<template>
  <div class="header-yd-tabs">
    <BlockSearch :origin="'tabdoctor'" />
    <div class="yd-hide-list">
      <ul class="d-lg-none">
        <b-tabs pills content-class="mt-3" lazy>
          <b-tab
            v-for="(values, propertyName) in items"
            :key="values.id"
            :title="propertyName"
            title-link-class="btn yd-symbol"
          >
            <ul class="yd-list">
              <li v-for="value in values" :key="value.id" @click="close">
                <nuxt-link
                  :to="
                    localePath(
                      `/direction/${value.slug}/${$config.defaultRegionURL}`
                    )
                  "
                >
                  {{ value.name }}
                </nuxt-link>
              </li>
            </ul>
          </b-tab>
        </b-tabs>
      </ul>
      <div class="row mt-3 mt-lg-5 yd-toggle-list">
        <div
          class="col-lg-3 mb-4"
          v-for="(values, propertyName) in items"
          :key="values[0].id"
        >
          <h5 class="yd-symbol">{{ propertyName }}</h5>
          <ul class="yd-list">
            <li v-for="value in values" :key="value.id" @click="close">
              <nuxt-link
                :to="
                  localePath(
                    `/direction/${value.slug}/${$config.defaultRegionURL}`
                  )
                "
              >
                {{ value.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BlockTabDoctor",
  props: ["items"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>