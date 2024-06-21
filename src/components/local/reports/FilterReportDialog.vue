<template>
  <Dialog
    :style="{ width: '450px' }"
    header="Filter"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="transaction" class="mb-3">Transaction</label>
      <Dropdown
        id="transaction"
        v-model.lazy="formData.transaction"
        :options="formData.transactions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select transaction"
        :disabled="formData.isDisabled"
      >
      </Dropdown>
    </div>
    <div class="field">
      <label for="date">Filter by date</label>
      <Calendar
        id="date"
        selectionMode="range"
        v-model.lazy="formData.date"
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
        this.formData.transaction === null ||
        !this.formData.date ||
        !this.formData.date[0] ||
        !this.formData.date[1]
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please complete filteration, transaction and date form - to",
          life: 3000,
        });

        this.formData.isShowLoadingCircle = false;
        this.formData.isDisabled = false;

        return;
      }

      this.formData.date[0] = this.formData.date[0].toLocaleDateString("en-CA");
      this.formData.date[1] = this.formData.date[1].toLocaleDateString("en-CA");

      await this.$store.dispatch("reportModule/dateFilter", this.formData);

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
      return this.$store.getters["reportModule/isSuccess"];
    },
    message() {
      return this.$store.getters["reportModule/message"];
    },
  },
};
</script>

<style scoped></style>
