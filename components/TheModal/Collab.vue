<template>
  <b-modal
    id="CollabModal"
    modal-class="yd-auth-modal"
    size="xl"
    hide-header
    hide-footer
    @hidden="modalHidden"
  >
    <button
      type="button"
      class="close yd-close"
      data-dismiss="modal"
      aria-label="Close"
      @click="closeModal()"
    >
      <i class="far fa-times"></i>
    </button>

    <div class="modal-logo text-center">
      <img src="~/assets/img/Logo-alt.svg" alt="" class="w-5" />
    </div>
    <h2 class="modal-title" id="сollabModalLabel">{{ $t("cooperation") }}</h2>
    <div class="yd-modal-form">
      <p class="modal-text" v-html="$t('collab.modal_title')"></p>

      <b-tabs>
        <b-tab :title="$t('collab.clinic_title')" active>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <form @submit.prevent="">
                <div class="row justify-content-center">
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.clinic_name") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputClinicName"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.phone_number") }} </label>
                      <input
                        type="text"
                        v-mask="'+998 (##) ###-##-##'"
                        class="form-control"
                        required
                        v-model="inputPhone"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.head_fullname") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputHeadName"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="">
                        {{ $t("collab.head_phone_number") }}
                      </label>
                      <input
                        type="text"
                        v-mask="'+998 (##) ###-##-##'"
                        class="form-control"
                        required
                        v-model="inputHeadPhone"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.schedule") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputSchedule"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.address") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputAddress"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group text-center">
                      <label for="uploadP"> {{ $t("collab.logo") }} </label>
                      <label for="uploadP" class="file-input">
                        <div v-if="!inputLogo" class="mb-2">
                          <p class="label-info">
                            {{ $t("collab.drag_files") }}
                          </p>
                          <p class="label-info">{{ $t("collab.or") }}</p>
                        </div>
                        <div v-else>
                          <p class="label-stats">
                            <i class="fas fa-check"></i>
                            {{ $t("collab.file_downloaded") }}
                          </p>
                        </div>
                        <input
                          type="file"
                          name=""
                          id="uploadP"
                          @change="handleLogoUpload($event)"
                        />
                        <div v-if="!inputLogo" class="btn">
                          {{ $t("collab.down_f_comp") }}
                        </div>
                        <div v-else class="btn">
                          {{ $t("collab.resend") }}
                        </div>
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary w-100 mt-4"
                      @click="submitClinicForm"
                    >
                      {{ $t("collab.apply") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </b-tab>
        <b-tab :title="$t('collab.doctor_title')">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <form @submit.prevent="">
                <div class="row justify-content-center">
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.fullname") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputFullName"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.phone_number") }} </label>
                      <input
                        type="text"
                        v-mask="'+998 (##) ###-##-##'"
                        class="form-control"
                        required
                        v-model="inputPhone"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.schedule") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputSchedule"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for=""> {{ $t("collab.address") }} </label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        v-model="inputAddress"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="uploadP"> {{ $t("collab.photo") }}</label>
                      <label for="uploadP" class="file-input">
                        <div v-if="!inputPhoto" class="mb-2">
                          <p class="label-info">
                            {{ $t("collab.drag_files") }}
                          </p>
                          <p class="label-info">{{ $t("collab.or") }}</p>
                        </div>
                        <div v-else>
                          <p class="label-stats">
                            <i class="fas fa-check"></i>
                            {{ $t("collab.file_downloaded") }}
                          </p>
                        </div>

                        <input
                          type="file"
                          name=""
                          id="uploadP"
                          @change="handlePhotoUpload($event)"
                        />

                        <div v-if="!inputPhoto" class="btn">
                          {{ $t("collab.down_f_comp") }}
                        </div>
                        <div v-else class="btn">
                          {{ $t("collab.resend") }}
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label for="uploadP">
                        {{ $t("collab.confirm_doc") }}
                      </label>
                      <label for="uploadP" class="file-input">
                        <div v-if="!inputCertificate" class="mb-2">
                          <p class="label-info">
                            {{ $t("collab.drag_files") }}
                          </p>
                          <p class="label-info">{{ $t("collab.or") }}</p>
                        </div>
                        <div v-else>
                          <p class="label-stats">
                            <i class="fas fa-check"></i>
                            {{ $t("collab.file_downloaded") }}
                          </p>
                        </div>

                        <input
                          type="file"
                          name=""
                          id="uploadP"
                          @change="handleCertificateUpload($event)"
                        />
                        <div v-if="!inputCertificate" class="btn">
                          {{ $t("collab.down_f_comp") }}
                        </div>
                        <div v-else class="btn">
                          {{ $t("collab.resend") }}
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="col-6">
                    <button
                      type="submit"
                      class="btn btn-primary w-100 mt-4"
                      @click="submitDoctorForm"
                    >
                      {{ $t("collab.apply") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </b-modal>
</template>    

<script>
import { getUserData } from "~/plugins/custom.js";

export default {
  name: "TheCollabModal",
  data() {
    return {
      inputClinicName: "",
      inputPhone: "",
      inputHeadName: "",
      inputHeadPhone: "",
      inputSchedule: "",
      inputAddress: "",
      inputFullName: "",
      inputLogo: "",
      inputPhoto: "",
      inputCertificate: "",
    };
  },
  computed: {},
  methods: {
    getUserData,
    closeModal() {
      this.$bvModal.hide("CollabModal");
      this.$nuxt.refresh();
    },
    handleLogoUpload(event) {
      this.inputLogo = event.target.files[0];
    },
    handlePhotoUpload(event) {
      this.inputPhoto = event.target.files[0];
    },
    handleCertificateUpload(event) {
      this.inputCertificate = event.target.files[0];
    },
    async submitClinicForm() {
      if (!this.inputPhone || !this.inputHeadPhone) return;

      let rawPhone = this.inputPhone.match(/\d/g).join("");
      let rawHeadPhone = this.inputHeadPhone.match(/\d/g).join("");

      let user = this.getUserData();

      if (
        !this.inputClinicName ||
        !this.inputHeadName ||
        !rawPhone ||
        rawPhone.length != 12 ||
        !rawHeadPhone ||
        rawHeadPhone.length != 12 ||
        !this.inputSchedule ||
        !this.inputAddress ||
        !user
      )
        return;

      let formData = new FormData();
      if (!!this.inputLogo && this.inputLogo != "")
        formData.append("logo", this.inputLogo);

      formData.append("id", user.id);
      formData.append("type", "0");
      formData.append("system", "site");
      formData.append("clinic", this.inputClinicName);
      formData.append("name", this.inputHeadName);
      formData.append("phone", rawPhone);
      formData.append("director_phone", rawHeadPhone);
      formData.append("work_time", this.inputSchedule);
      formData.append("address", this.inputAddress);

      let res = await this.$axios
        .post("api/create-cooporation", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function (e) {
          console.log(e);
        });

      this.$bvModal.hide("CollabModal");
      this.$bvModal.show("CompletedModal");
    },
    async submitDoctorForm() {
      if (!this.inputPhone) return;

      let rawPhone = this.inputPhone.match(/\d/g).join("");

      let user = this.getUserData();

      if (
        !this.inputFullName ||
        !rawPhone ||
        rawPhone.length != 12 ||
        !this.inputSchedule ||
        !this.inputAddress ||
        !user
      )
        return;

      let formData = new FormData();
      if (!!this.inputPhoto && this.inputPhoto != "")
        formData.append("photo", this.inputPhoto);
      if (!!this.inputCertificate && this.inputCertificate != "")
        formData.append("certificate", this.inputCertificate);

      formData.append("id", user.id);
      formData.append("type", "1");
      formData.append("system", "site");
      formData.append("name", this.inputFullName);
      formData.append("phone", rawPhone);
      formData.append("work_time", this.inputSchedule);
      formData.append("address", this.inputAddress);

      let res = await this.$axios
        .post("api/create-cooporation", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function (e) {
          console.log(e);
        });

      this.$bvModal.hide("CollabModal");
      this.$bvModal.show("CompletedModal");
    },
    modalHidden() {
      this.inputClinicName = "";
      this.inputPhone = "";
      this.inputHeadName = "";
      this.inputHeadPhone = "";
      this.inputSchedule = "";
      this.inputAddress = "";
      this.inputFullName = "";
      this.inputLogo = "";
      this.inputPhoto = "";
      this.inputCertificate = "";
    },
  },
};
</script>