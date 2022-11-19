<template>
  <b-modal id="DoctorsModal" modal-class="yd-modal" hide-footer>
    <template #modal-header="{ close }">
      <h5 class="modal-title">{{ $t("doctors") }}</h5>
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
    <BlockTabDoctor :items="items" @close="closeModal" />
  </b-modal>
</template>  
   
<script>
export default {
  name: "TheDoctorsModal",
  data() {
    return { step: 0 };
  },
  computed: {
    items() {
      return this.$store.getters['category/getDoctors'];
    },
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("DoctorsModal");
      this.$nuxt.refresh();
    },
  },
};
</script>