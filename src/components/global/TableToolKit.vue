<template>
  <Toolbar class="mb-4">
    <template v-slot:start>
      <div class="my-2">
        <Button
          v-if="hasNew"
          label="New"
          icon="pi pi-plus"
          class="mr-2"
          severity="success"
          @click="openNew()"
        />
        <Button
          v-if="hasDelete"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteSelected()"
          :disabled="!selectedDatas || !selectedDatas.length"
        />
        <Button
          v-if="hasFilter"
          label="Filter"
          icon="pi pi-filter"
          severity="info"
          @click="filter()"
        />
      </div>
    </template>

    <template v-slot:end>
      <div class="">
        <Button
          label="Print"
          icon="pi pi-print"
          severity="info"
          @click="print()"
          class="mr-2"
        />
        <Button
          label="Export to excel"
          icon="pi pi-file-excel"
          @click="excel()"
          class="mr-2"
        />
        <Button
          label="Export to pdf"
          icon="pi pi-file-pdf"
          severity="danger"
          @click="pdf()"
        />
      </div>
    </template>
  </Toolbar>
</template>

<script>
export default {
  props: {
    selectedDatas: Object,
    hasNew: {
      type: Boolean,
      default: true,
    },
    hasDelete: {
      type: Boolean,
      default: true,
    },
    hasFilter: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openNew() {
      this.$emit("openNew");
    },
    confirmDeleteSelected() {
      this.$emit("confirmDeleteSelected");
    },
    filter() {
      this.$emit("filter");
    },
    print() {
      this.$emit("print");
    },
    excel() {
      this.$emit("excel");
    },
    pdf() {
      this.$emit("pdf");
    },
  },
};
</script>

<style scoped></style>
