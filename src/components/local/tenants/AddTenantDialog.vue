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
        v-model.lazy="formData.room"
        :options="formData.rooms"
        optionLabel="label"
        optionValue="value"
        placeholder="Select room"
      >
      </Dropdown>
    </div>
    <div class="field">
      <label for="first_name">First name</label>
      <InputText
        id="first_name"
        v-model.lazy.trim="formData.first_name"
        required="true"
      />
    </div>
    <div class="field">
      <label for="middle_name">Middle name</label>
      <InputText
        id="middle_name"
        v-model.lazy.trim="formData.middle_name"
        required="true"
      />
    </div>
    <div class="field">
      <label for="last_name">Last name</label>
      <InputText
        id="last_name"
        v-model.lazy.trim="formData.last_name"
        required="true"
      />
    </div>
    <div class="field">
      <label for="address">Address</label>
      <InputText
        id="address"
        v-model.lazy.trim="formData.address"
        required="true"
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
      />
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="deposit">Month Deposit</label>
        <InputNumber
          id="deposit"
          v-model.lazy="formData.month_deposit"
          mode="currency"
          currency="PHP"
          locale="en-US"
        />
      </div>
      <div class="field col">
        <label for="advance">Month Advance</label>
        <InputNumber
          id="deposit"
          v-model.lazy="formData.month_advance"
          mode="currency"
          currency="PHP"
          locale="en-US"
        />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog()" />
      <Button label="Save" icon="pi pi-check" text="" @click="submit()" />
    </template>
  </Dialog>
</template>

<script>
import { useToast } from "primevue/usetoast";

export default {
  props: {
    formData: {
      type: Object,
      default: {},
    },
  },
  emits: ["formSubmit", "hideDialog"],
  methods: {
    submit() {
      this.$toast.add({
        severity: "success",
        summary: "Adding Tenant",
        detail: "You have successfully add new tenant.",
        life: 3000,
      });
      this.$emit("formSubmit");
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  mounted() {
    this.$toast = useToast();
  },
};
</script>

<style scoped></style>
