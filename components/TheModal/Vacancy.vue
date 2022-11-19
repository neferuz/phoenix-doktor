<template>
  <b-modal
    id="VacancyModal"
    modal-class="vacan-modal"
    size="xl"
    header-class="bg-none"
    hide-footer
    @hidden="modalHidden"
  >
    <template #modal-header="{ close }">
      <h4 class="modal-title">{{ getName(item, true) }}</h4>
      <p class="vacan-modal_cat">{{ getDepartment(item) }}</p>
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

    <div class="mb-3" v-html="getDescription(item, true)"></div>

    <form @submit.prevent="">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="">{{ $t("collab.fullname") }}</label>
            <input
              type="text"
              class="form-control"
              v-model="inputName"
              required
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="">{{ $t("collab.phone_number") }}</label>
            <input
              type="tel"
              v-mask="'+998 (##) ###-##-##'"
              class="form-control"
              v-model="inputPhone"
              required
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group text-center">
            <label for="uploadP">{{ $t("cv") }}</label>
            <label for="uploadP" class="file-input">
              <div v-if="!inputFile" class="mb-2">
                <p class="label-info">{{ $t("collab.drag_files") }}</p>
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
                class="c-pointer"
                required
                @change="handleFileUpload($event)"
              />
              <div v-if="!inputFile" class="btn">
                {{ $t("collab.down_f_comp") }}
              </div>
              <div v-else class="btn">
                {{ $t("collab.resend") }}
              </div>
            </label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="">{{ $t("describe_work_want") }}</label>
            <textarea
              class="form-control"
              name=""
              id=""
              cols="30"
              rows="10"
              :placeholder="$t('write')"
              v-model="inputDescription"
              required
            ></textarea>
          </div>
        </div>
        <div class="col-lg-6">
          <button
            type="submit"
            class="btn btn-primary w-100 mt-4"
            @click="submitForm"
          >
            {{ $t("collab.apply") }}
          </button>
        </div>
      </div>
    </form>
  </b-modal>
</template>    

<script>
// import FormData from "form-data";
import { getName, getDepartment, getDescription } from "~/plugins/custom.js";

export default {
  name: "TheVacancyModal",
  async created() {
    await this.$nuxt.$on("toggleVacancyModal", async (item) => {
      this.item = item;
      this.$bvModal.show("VacancyModal");
    });
  },
  data() {
    return {
      item: {},
      inputName: "",
      inputPhone: "",
      inputFile: "",
      inputDescription: "",
    };
  },
  computed: {},
  methods: {
    getName,
    getDepartment,
    getDescription,
    handleFileUpload(event) {
      this.inputFile = event.target.files[0];
    },
    async submitForm() {
      if (!this.inputPhone) return;

      let rawPhone = this.inputPhone.match(/\d/g).join("");

      if (
        !this.item ||
        !this.inputName ||
        !this.inputPhone ||
        !rawPhone ||
        rawPhone.length != 12 ||
        !this.inputFile ||
        !this.inputDescription
      )
        return;

      let formData = new FormData();
      formData.append("cv", this.inputFile);

      formData.append("vacancy_id", this.item.id);
      formData.append("name", this.inputName);
      formData.append("phone", rawPhone);
      formData.append("description", this.inputDescription);

      let res = await this.$axios
        .post("api/create-vacancy", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function (e) {
          console.log(e);
        });

      this.$bvModal.hide("VacancyModal");
      this.$bvModal.show("CompletedModal");
    },
    modalHidden() {
      this.item = {};
      this.inputName = "";
      this.inputPhone = "";
      this.inputFile = "";
      this.inputDescription = "";
    },
  },
};
</script>  