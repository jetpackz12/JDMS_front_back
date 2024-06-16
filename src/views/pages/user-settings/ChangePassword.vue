<template>
  <div class="flex justify-content-center align-items-center">
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Change Password</h5>
        <div class="field">
          <label for="current_password">Current Password</label>
          <Password
            id="current_password"
            :feedback="false"
            toggleMask
            v-model="fromData.currentPassword"
          />
        </div>
        <div class="field">
          <label for="new_password">New Password</label>
          <Password
            id="new_password"
            toggleMask
            v-model="fromData.newPassword"
          />
        </div>
        <div class="field">
          <label for="confirm_password">Confirm Password</label>
          <Password
            id="confirm_password"
            toggleMask
            v-model="fromData.confirmPassword"
          />
        </div>
        <Button label="Submit" @click="submit()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: this.getInitialFormData(),
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
    submit() {
      this.$toast.add({
        severity: "success",
        summary: "Change Password",
        detail: "You have successfully change your password.",
        life: 3000,
      });
    },
  },
};
</script>

<style scoped></style>
