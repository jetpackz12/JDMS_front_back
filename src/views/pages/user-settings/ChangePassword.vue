<template>
  <div class="flex justify-content-center align-items-center">
    <div class="col-12 md:col-6">
      <div class="card p-fluid relative">
        <h5>Change Password</h5>
        <div class="field">
          <label for="current_password"
            >Current Password <br />
            <small
              class="p-invalid text-red-600"
              v-if="submitted && !formData.currentPassword"
              >This is required.</small
            ></label
          >
          <Password
            id="current_password"
            :feedback="false"
            toggleMask
            v-model="formData.currentPassword"
            :invalid="submitted && !formData.currentPassword"
            :required="true"
            :disabled="isDisabled"
          />
        </div>
        <div class="field">
          <label for="new_password"
            >New Password <br />
            <small
              class="p-invalid text-red-600"
              v-if="submitted && !formData.newPassword"
              >This is required.</small
            ></label
          >
          <Password
            id="new_password"
            toggleMask
            v-model="formData.newPassword"
            :invalid="submitted && !formData.newPassword"
            :required="true"
            :disabled="isDisabled"
          />
        </div>
        <div class="field">
          <label for="confirm_password"
            >Confirm Password <br />
            <small
              class="p-invalid text-red-600"
              v-if="submitted && !formData.confirmPassword"
              >This is required.</small
            ></label
          >
          <Password
            id="confirm_password"
            toggleMask
            v-model="formData.confirmPassword"
            :invalid="submitted && !formData.confirmPassword"
            :required="true"
            :disabled="isDisabled"
          />
        </div>
        <Button label="Submit" :disabled="isDisabled" @click="submit()" />
        <div
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <ProgressSpinner v-if="isShowLoadingCircle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: this.getInitialFormData(),
      submitted: false,
      isShowLoadingCircle: false,
      isDisabled: false,
    };
  },
  methods: {
    getInitialFormData() {
      return {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
      };
    },
    async submit() {
      this.submitted = true;
      this.isShowLoadingCircle = true;
      this.isDisabled = true;

      if (
        !this.formData.currentPassword ||
        !this.formData.newPassword ||
        !this.formData.confirmPassword
      ) {
        this.isShowLoadingCircle = false;
        this.isDisabled = false;
        return;
      }

      await this.$store.dispatch(
        "changePasswordModule/changePassword",
        this.formData
      );

      if (this.isSuccess) {
        this.$toast.add({
          severity: "success",
          summary: "Change Password",
          detail: this.message,
          life: 3000,
        });

        this.formData = this.getInitialFormData();
        this.submitted = false;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Change Password Failed",
          detail: this.message,
          life: 3000,
        });
      }

      this.isShowLoadingCircle = false;
      this.isDisabled = false;
    },
  },
  computed: {
    message() {
      return this.$store.getters["changePasswordModule/message"];
    },
    isSuccess() {
      console.log(this.$store.getters["changePasswordModule/isSuccess"]);
      return this.$store.getters["changePasswordModule/isSuccess"];
    },
  },
};
</script>

<style scoped></style>
