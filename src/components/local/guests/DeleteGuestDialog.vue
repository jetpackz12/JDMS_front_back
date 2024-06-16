<template>
  <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex align-items-center justify-content-center">
      <i
        class="pi pi-exclamation-triangle mr-3"
        style="font-size: 2rem; color: #f97316"
      />
      <span v-if="formData"
        >Are you sure you want to delete <b>{{ formData.full_name }}</b
        >?</span
      >
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
        summary: "Deleting Guest",
        detail: "You have successfully delete this guest.",
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
