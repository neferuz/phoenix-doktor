<template>
  <b-modal
    id="AuthModal"
    modal-class="yd-auth-modal"
    size="lg"
    header-class="bg-none"
    @hidden="modalHidden"
    hide-footer
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

    <div class="modal-logo">
      <img src="~assets/img/Logo-alt.svg" alt="" class="w-5" />
    </div>
    <h2 class="modal-title" id="authModalLabel">{{ $t("profile.login2") }}</h2>
    <p
      class="modal-text"
      v-html="$t('profile.auth_text_preview')"
      style="color: #4c6fff; font-weight: bold"
    ></p>
    <div class="yd-modal-form">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <form @submit.prevent="">
            <p class="text-danger d-block">{{ errorMsg }}</p>
            <div class="form-group">
              <label for="loginNum"> {{ $t("profile.phone_number") }} </label>
              <input
                type="tel"
                v-mask="'+998 (##) ###-##-##'"
                class="form-control"
                v-model="inputPhoneModel"
                id="loginNum"
                required
              />
              <div
                v-if="incorPhoneNumber"
                class="invalid-feedback text-right d-block"
              >
                {{ $t("profile.incorrect_phone_number") }}
              </div>
            </div>
            <div class="form-group" v-if="isCodeSend">
              <label for="smsCode">
                {{ $t("profile.confirmation_code") }}
              </label>
              <input
                type="tel"
                class="form-control"
                v-model="confirmCode"
                id="smsCode"
                required
              />
              <div
                v-if="incorConfCode"
                class="invalid-feedback text-right d-block"
              >
                {{ $t("profile.incorrect_confirmation_code") }}
              </div>
            </div>
            <button
              v-if="!isCodeSend"
              class="btn btn-primary w-100"
              @click="onSendCodeClick"
            >
              {{ $t("profile.send_code") }}
            </button>
            <button v-else class="btn btn-primary w-100" @click="onLoginClick">
              {{ $t("profile.login") }}
            </button>
          </form>
          <div class="text-center mt-4">
            <p>
              {{ $t("profile.not_yet_registered") }}
              <a
                class="c-pointer"
                data-dismiss="modal"
                aria-label="Close"
                data-toggle="modal"
                @click="onRegisterModal()"
              >
                {{ $t("profile.register") }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>    

<script>
export default {
  name: "TheAuthModal",
  async created() {
    await this.$nuxt.$on("toggleAuthModal", async (data) => {
      if (data.rawPhone && data.inputPhoneModel) {
        this.rawPhone = data.rawPhone;
        this.inputPhoneModel = data.inputPhoneModel;
        this.isCodeSend = true;
      }
      this.$bvModal.show("AuthModal");
    });
  },
  data() {
    return {
      isCodeSend: false,
      inputPhoneModel: "",
      confirmCode: "",
      rawPhone: "",
      incorPhoneNumber: false,
      incorConfCode: false,
      errorMsg: "",
    };
  },
  methods: {
    async onSendCodeClick() {
      this.rawPhone = this.inputPhoneModel.match(/\d/g).join("");
      this.errorMsg = "";

      let qData = { phone: this.rawPhone };

      let res;
      try {
        // res = await this.$axios.post("auth/login", qs.stringify(qData));
        await this.$store.dispatch('auth/login', qData)
        res = this.$store.state.user
        // res = { data: { isRegistered: true, state: "OK", stateCode: 200 } };
        // res = { data: { isRegistered: false, state: "OK", stateCode: 200 } };
      } catch (e) {
        console.log(e);
        return;
      }

      if (res.data.stateCode == 200) {
        this.isCodeSend = true;
        this.incorPhoneNumber = false;
      }
      if (res.data.stateCode == 401) {
        this.isCodeSend = false;
        // this.incorPhoneNumber = true;
        this.errorMsg = res.data.message || "";
      }
      if (
        res.data.hasOwnProperty("isRegistered") &&
        res.data.isRegistered == false
      ) {
        this.onRegisterModal(true);
      }
    },
    async onLoginClick() {
      this.errorMsg = "";

      let qData = { code: this.confirmCode };

      let res;
      try {
        // res = await this.$axios.post("auth/confirm", qs.stringify(qData));
        await this.$store.dispatch('auth/confirm', qData)
        ret = this.$store.state.userData
      } catch (e) {
        console.log(e);
        return;
      }

      if (res.data.stateCode == 200 && process.browser) {
        this.incorConfCode = false;
        let userData = res.data.data;
        this.$store.dispatch("setUserData", userData);
        window.localStorage.setItem("userData", JSON.stringify(userData));
        this.closeModal();
      }

      if (res.data.stateCode == 401) {
        // this.incorConfCode = true;
        this.errorMsg = "";
      }
    },
    onRegisterModal(isSendProps = false) {
      this.closeModal();
      // this.$bvModal.show("RegisterModal");

      let data = {};
      if (isSendProps) {
        data.inputPhoneModel = this.inputPhoneModel;
        data.rawPhone = this.rawPhone;
      }

      $nuxt.$emit("toggleRegisterModal", data);
    },
    closeModal() {
      this.$bvModal.hide("AuthModal");
    },
    modalHidden() {
      this.isCodeSend = false;
      this.inputPhoneModel = "";
      this.confirmCode = "";
      this.rawPhone = "";
      this.incorPhoneNumber = false;
      this.incorConfCode = false;
    },
  },
};
</script> 