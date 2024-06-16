<template>
  <Dialog
    header="Edit Water Payment"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="tenant" class="mb-3">Tenant</label>
      <Dropdown
        id="tenant"
        v-model.lazy="formData.tenant"
        :options="formData.tenants"
        optionLabel="label"
        optionValue="value"
        placeholder="Select tenant"
      >
      </Dropdown>
    </div>
    <div class="field">
      <label for="prev_read">Previous Reading</label>
      <InputNumber
        id="prev_read"
        v-model.lazy="formData.prev_read"
        inputId="withoutgrouping"
        :useGrouping="false"
      />
    </div>
    <div class="field">
      <label for="pres_read">Present Reading</label>
      <InputNumber
        id="pres_read"
        v-model.lazy="formData.pres_read"
        inputId="withoutgrouping"
        :useGrouping="false"
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
      />
    </div>
    <div class="field">
      <label for="due_date">Due Date</label>
      <Calendar
        id="due_date"
        :showIcon="true"
        :showButtonBar="true"
        v-model.lazy="formData.due_date"
      ></Calendar>
    </div>
    <div class="field">
      <label for="date_issue">Date Issue</label>
      <Calendar
        id="date_issue"
        :showIcon="true"
        :showButtonBar="true"
        v-model.lazy="formData.date_issue"
      ></Calendar>
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
        summary: "Updating Water Payment",
        detail: "You have successfully update this water payment.",
        life: 3000,
      });
      this.$emit("formSubmit");
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  watch: {
    "formData.duration": function (newValue) {
      if (typeof newValue === "string") {
        const newValDuration = newValue.split(" ");
        this.formData.duration = parseInt(newValDuration[0]);
      }
    },
  },
  mounted() {
    this.$toast = useToast();
  },
};
</script>

<style scoped></style>
