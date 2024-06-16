<template>
  <Dialog
    :style="{ width: '450px' }"
    header="Filter"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="date_issue">Filter by date issue</label>
      <Calendar
        id="date_issue"
        selectionMode="range"
        v-model.lazy="formData.date_issue"
        :manualInput="false"
        :showIcon="true"
        :showButtonBar="true"
      ></Calendar>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="hideDialog()" />
      <Button label="Yes" icon="pi pi-check" text @click="submit()" />
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
        summary: "Filter success",
        detail: "You have successfully filter the data.",
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
