<template>
  <Dialog
    header="Add Electricity Payment"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="tenant" class="mb-3">Tenant</label>
      <Dropdown
        id="tenant"
        v-model.lazy="formData.tenant_id"
        :options="formData.tenants"
        optionLabel="label"
        optionValue="value"
        placeholder="Select tenant"
        :disabled="formData.isDisabled"
      >
      </Dropdown>
    </div>
    <div class="field">
      <label for="unit_con">Unit Consumed</label>
      <InputNumber
        id="unit_con"
        v-model.lazy="formData.unit_con"
        inputId="withoutgrouping"
        :useGrouping="false"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="amount">Amount</label>
      <InputNumber
        id="amount"
        v-model.lazy="formData.amount"
        mode="currency"
        currency="PHP"
        locale="en-US"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field">
      <label for="due_date">Due Date</label>
      <Calendar
        id="due_date"
        :showIcon="true"
        :showButtonBar="true"
        v-model.lazy="formData.due_date"
        :disabled="formData.isDisabled"
      ></Calendar>
    </div>
    <div class="field">
      <label for="date_issue">Date Issue</label>
      <Calendar
        id="date_issue"
        :showIcon="true"
        :showButtonBar="true"
        v-model.lazy="formData.date_issue"
        :disabled="formData.isDisabled"
      ></Calendar>
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

      let original_due_date = this.formData.due_date;
      let original_date_issue = this.formData.date_issue;

      this.formData.due_date =
        this.formData.due_date.toLocaleDateString("en-CA");
      this.formData.date_issue =
        this.formData.date_issue.toLocaleDateString("en-CA");

      await this.$store.dispatch(
        "electricityBillingPaymentModule/storeData",
        this.formData
      );

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

      this.formData.due_date = original_due_date;
      this.formData.date_issue = original_date_issue;

      this.formData.isShowLoadingCircle = false;
      this.formData.isDisabled = false;
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    isSuccess() {
      return this.$store.getters["electricityBillingPaymentModule/isSuccess"];
    },
    message() {
      return this.$store.getters["electricityBillingPaymentModule/message"];
    },
  },
};
</script>

<style scoped></style>
