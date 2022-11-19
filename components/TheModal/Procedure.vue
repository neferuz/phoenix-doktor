<template>
  <b-modal
    id="ProcedureModal"
    modal-class="yd-modal"
    @hidden="modalHidden"
    hide-footer
  >
    <template #modal-header="{ close }">
      <h5 class="modal-title">{{ $t("procedures") }}</h5>
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
    <!-- <TheTabProcedure /> -->
    <BlockTab
      :items="items"
      :type="'service'"
      :step="step"
      @incrTabClick="incrStep"
      @close="closeModal"
    />
  </b-modal>
</template>  
  
<script>
export default {
  name: "TheProcedureModal",
  async created() {
    await this.$nuxt.$on("toggleProcedureModal", async (data) => {
      this.bindingData = data;
      this.$bvModal.show("ProcedureModal");
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
      return this.$store.getters['category/getProcedures'];
    },
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("ProcedureModal");
      this.$nuxt.refresh();
    },
    incrStep() {
      this.step++;
    },
    decrStep() {
      this.step--;
    },
    modalHidden() {
      this.step = 0;
      this.bindingData = null;
    },
  },
};
</script>