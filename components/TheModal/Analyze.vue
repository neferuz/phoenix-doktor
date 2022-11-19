<template>
  <b-modal
    id="AnalyzeModal"
    modal-class="yd-modal"
    @hidden="modalHidden"
    hide-footer
  >
    <template #modal-header="{ close }">
      <h5 class="modal-title">{{ $t("analyzes") }}</h5>
      <!-- <button
        type="button"
        class="close yd-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
      >
        <i class="far fa-times"></i>
      </button> -->
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
    <!-- <TheTabAnalyze /> -->
    <BlockTab
      :type="'analyze'"
      :step="step"
      @incrTabClick="incrStep"
      @close="closeModal"
    />
  </b-modal>
</template>    
     
<script>
export default {
  name: "TheAnalyzeModal",
  async created() {
    await this.$nuxt.$on("toggleAnalyzeModal", async (data) => {
      this.bindingData = data;
      this.$bvModal.show("AnalyzeModal");
    });
  },
  data() {
    return {
      bindingData: null,
      step: 0,
    };
  },
  computed: {
    items() {
      if (this.bindingData) return this.bindingData;
      return this.$store.getters['category/getAnalyzes']
    },
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("AnalyzeModal");
      this.$nuxt.refresh();
    },
    incrStep() {
      this.step++;
    },
    decrStep() {
      this.step--;
    },
    modalHidden() {
      this.bindingData = null;
      this.step = 0;
    },
  },
};
</script>