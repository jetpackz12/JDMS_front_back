<template>
  <Dialog
    header="Add Tenant"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="room" class="mb-3">Room</label>
      <Dropdown
        id="room"
        v-model.lazy="formData.room_id"
        :options="formData.rooms"
        optionLabel="label"
        optionValue="value"
        placeholder="Select room"
        :disabled="formData.isDisabled"
      >
      </Dropdown>
    </div>
    <div class="field">
      <label for="first_name">First name</label>
      <InputText
        id="first_name"
        v-model.lazy.trim="formData.first_name"
        required="true"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="middle_name">Middle name</label>
      <InputText
        id="middle_name"
        v-model.lazy.trim="formData.middle_name"
        required="true"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="last_name">Last name</label>
      <InputText
        id="last_name"
        v-model.lazy.trim="formData.last_name"
        required="true"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="address">Address</label>
      <InputText
        id="address"
        v-model.lazy.trim="formData.address"
        required="true"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="contact_number">Contact number</label>
      <InputMask
        id="contact_number"
        v-model.lazy="formData.contact_number"
        mask="(999) 999-9999"
        placeholder="(999) 999-9999"
        required="true"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="advance">Month Advance</label>
      <InputNumber
        id="deposit"
        v-model.lazy="formData.advance"
        mode="currency"
        currency="PHP"
        locale="en-US"
        :disabled="formData.isDisabled"
      />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text=""
        @click="hideDialog()"
        :disabled="formData.isDisabled"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        text=""
        @click="submit()"
        :disabled="formData.isDisabled"
      />
    </template>

    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <ProgressSpinner v-if="formData.isShowLoadingCircle" />
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: {},
    },
  },
  emits: ["formSubmit", "hideDialog"],
  methods: {
    async submit() {
      this.formData.isShowLoadingCircle = true;
      this.formData.isDisabled = true;

      await this.$store.dispatch("tenantModule/storeData", this.formData);

      if (this.isSuccess) {
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: this.message,
          life: 3000,
        });
        this.$emit("formSubmit");
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: this.message,
          life: 3000,
        });
      }
      this.formData.isShowLoadingCircle = false;
      this.formData.isDisabled = false;
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    isSuccess() {
      return this.$store.getters["tenantModule/isSuccess"];
    },
    message() {
      return this.$store.getters["tenantModule/message"];
    },
  },
};
</script>

<style scoped></style>
