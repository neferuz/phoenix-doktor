<template>
  <b-modal
    id="CompletedModal"
    modal-class="yd-auth-modal"
    size="md"
    header-class="bg-none"
    hide-footer
    centered
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

    <!-- <div class="modal-logo text-center mb-5">
      <img src="~assets/img/Logo-alt.svg" alt="" class="w-5" />
    </div> -->
    <div class="yd-modal-form">
      <div class="modal-text">
        <img class="mb-4" src="~/assets/img/svg/check-circle.svg" alt="" />
        <p v-html="$t('form_success_text')"></p>
      </div>
    </div>
  </b-modal>
</template>    

<script>
export default {
  name: "TheCompletedModal",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script> 