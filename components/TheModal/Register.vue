<template>
  <b-modal
    id="RegisterModal"
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
     <!--  <img src="~assets/img/Logo-alt.svg" alt="" class="w-5" /> -->
    </div>
    <h2 class="modal-title" id="RegisterModalLabel">
      {{ $t("profile.register2") }}
    </h2>
    <p class="modal-text" v-html="$t('profile.auth_text_preview')" style="color:#0056b3"></p>
    <div class="yd-modal-form">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <form class="yd-step-form" @submit.prevent="">
            <p class="text-danger d-block">{{ errorMsg }}</p>
            <div class="yd-step active">
              <div class="form-group">
                <label for="regName">{{ $t("profile.first_name") }}</label>
                <input
                  type="name"
                  class="form-control"
                  v-model="inputFirstName"
                  id="regName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="regName">{{ $t("profile.last_name") }}</label>
                <input
                  type="name"
                  class="form-control"
                  v-model="inputLastName"
                  id="regName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="loginNum">{{ $t("profile.phone_number") }}</label>
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
              <button
                v-else
                class="btn btn-primary w-100"
                @click="onRegisterClick"
              >
                {{ $t("profile.register2") }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center mt-4">
        <p>
          {{ $t("profile.yet_registered") }}
          <a
            href="#"
            data-dismiss="modal"
            aria-label="Close"
            data-toggle="modal"
            @click="onAuthModal"
          >
            {{ $t("profile.login") }}
          </a>
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "TheRegisterModal",
  async created() {
    await this.$nuxt.$on("toggleRegisterModal", async (data) => {
      if (data.rawPhone && data.inputPhoneModel) {
        this.rawPhone = data.rawPhone;
        this.inputPhoneModel = data.inputPhoneModel;
        this.isCodeSend = true;
      }
      this.$bvModal.show("RegisterModal");
    });
  },
  data() {
    return {
      isCodeSend: false,
      inputFirstName: "",
      inputLastName: "",
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
      if (!this.inputFirstName.length || !this.inputLastName.length) return;
      this.errorMsg = "";

      this.rawPhone = this.inputPhoneModel.match(/\d/g).join("");

      let qData = { phone: this.rawPhone };

      let res;
      try {
        res = await this.$axios.post("api/send-code", qData);

        // res = { data: { isRegistered: true, state: "OK", stateCode: 200 } };
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
        this.errorMsg = res.data.message || "";
        // this.incorPhoneNumber = true;
      }

      if (
        res.data.hasOwnProperty("isRegistered") &&
        res.data.isRegistered == true
      ) {
        this.onAuthModal(true);
      }
    },
    async onRegisterClick() {
      if (!this.inputFirstName.length || !this.inputLastName.length || !this.rawPhone) return;
      this.errorMsg = "";

      let qData = {
        phone: this.rawPhone,
        name: this.inputFullName,
        code: this.confirmCode,
      };

      let res;
      try {
        res = await this.$axios.post("api/register", qData);
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
        this.errorMsg = res.data.message || "";
        // this.onAuthModal();
      }
    },
    onAuthModal(isSendProps = false) {
      this.closeModal();
      // this.$bvModal.show("AuthModal");

      let data = {};
      if (isSendProps) {
        data.inputPhoneModel = this.inputPhoneModel;
        data.rawPhone = this.rawPhone;
      }

      $nuxt.$emit("toggleAuthModal", data);
    },
    closeModal() {
      this.$bvModal.hide("RegisterModal");
    },
    modalHidden() {
      this.isCodeSend = false;
      this.inputFullName = "";
      this.inputPhoneModel = "";
      this.confirmCode = "";
      this.rawPhone = "";
      this.incorPhoneNumber = false;
      this.incorConfCode = false;
    },
  },
};
</script>
