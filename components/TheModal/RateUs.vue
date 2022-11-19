<template>

</template>
<script>
import { getUserData, normalizeRating, setTrack } from '~/plugins/custom.js'
export default {
  name: 'RateUs',
  data: () => ({
    rate: 0,
    reviewText: ''
  }),
  methods: {
    getUserData,
    normalizeRating,
    setTrack,
    closeModal() {
      this.$bvModal.hide("RateUsModal");
      this.$nuxt.refresh();
    },
    async onReviewClick() {
      if (!this.getUserData().id) return this.$bvModal.show("AuthModal");
      let rRes, fRes;
      if (this.rate > 0) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.item.id,
            obj_type: "doctor",
            rating: this.rate * 2,
          };
          rRes = await this.$axios.post(
            "api/create-rating",
            data
          );
          rRes = rRes.data.model;
          this.setTrack({
            clinic: this.item.clinic_id,
            doctor: this.item.id,
            direction: this.item.directionInfo.id,
            action: "RATE",
            selector: "DOCTOR",
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (!!this.reviewText.length) {
        try {
          let data = {
            id: this.getUserData().id,
            obj_id: this.item.id,
            obj_type: "doctor",
            text: this.reviewText,
          };
          fRes = await this.$axios.post(
            "api/create-feedback",
            data
          );
          fRes = fRes.data.model;

          // Set track
          this.setTrack({
            clinic: this.item.clinic_id,
            doctor: this.item.id,
            direction: this.item.directionInfo.id,
            action: "FEEDBACK",
            selector: "DOCTOR",
          });
        } catch (e) {
          console.log(e);
        }
      }

      await this.setFeedback();

      this.rate = 0;
      this.reviewText = "";
    },
  }
}
</script>