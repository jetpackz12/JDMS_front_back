<template>
  <Dialog
    :style="{ width: '450px' }"
    header="Filter"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="date_issue">Filter by date issue ( Date range )</label>
      <Calendar
        id="date_issue"
        selectionMode="range"
        v-model.lazy="formData.date_issue"
        :manualInput="false"
        :showIcon="true"
        :showButtonBar="true"
        :disabled="formData.isDisabled"
      ></Calendar>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        text
        @click="hideDialog()"
        :disabled="formData.isDisabled"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
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

      if (
        !this.formData.date_issue ||
        !this.formData.date_issue[0] ||
        !this.formData.date_issue[1]
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please complete date filter form - to",
          life: 3000,
        });

        this.formData.isShowLoadingCircle = false;
        this.formData.isDisabled = false;

        return;
      }

      this.formData.date_issue[0] =
        this.formData.date_issue[0].toLocaleDateString("en-CA");
      this.formData.date_issue[1] =
        this.formData.date_issue[1].toLocaleDateString("en-CA");

      await this.$store.dispatch(
        "waterBillingPaymentModule/dateFilter",
        this.formData.date_issue
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

      this.formData.isShowLoadingCircle = false;
      this.formData.isDisabled = false;
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    isSuccess() {
      return this.$store.getters["waterBillingPaymentModule/isSuccess"];
    },
    message() {
      return this.$store.getters["waterBillingPaymentModule/message"];
    },
  },
};
</script>

<style scoped></style>
