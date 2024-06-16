<template>
  <Dialog header="Add Room" :style="{ width: '30vw' }" :modal="true">
    <hr />
    <div class="flex justify-content-center">
      <Image
        src="/layout/images/imageicon.jpg"
        alt="Image"
        width="250"
        preview
      />
    </div>
    <div
      class="flex flex-column justify-content-center align-items-center gap-2 pt-3"
    >
      <label>Upload image</label>
      <FileUpload
        mode="basic"
        name="demo[]"
        accept="image/*"
        :maxFileSize="1000000"
        @uploader="onUpload()"
        customUpload
        class="w-10rem sm:w-14rem lg:w-18rem"
      />
    </div>
    <div class="field flex flex-column">
      <label for="room">Room</label>
      <InputText v-model.lazy.trim="formData.room" id="room" type="text" />
    </div>
    <div class="field flex flex-column">
      <label for="description">Description</label>
      <InputText
        v-model.lazy.trim="formData.description"
        id="description"
        type="text"
      />
    </div>
    <div class="field flex flex-column">
      <label for="capacity">Capacity</label>
      <InputNumber
        v-model.lazy="formData.capacity"
        inputId="withoutgrouping"
        :useGrouping="false"
        id="capacity"
      />
    </div>
    <div class="field flex flex-column">
      <label for="type">Type</label>
      <Dropdown
        v-model.lazy="formData.type"
        :options="formData.typeValues"
        id="type"
        optionLabel="label"
        optionValue="value"
        placeholder="Select"
      />
    </div>
    <div class="field flex flex-column">
      <label for="price">Price</label>
      <InputNumber
        v-model.lazy="formData.price"
        inputId="integeronly"
        id="price"
      />
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
  emits: ["formSubmit"],
  methods: {
    hideDialog() {
      this.$emit("formSubmit");
    },
    submit() {
      this.$toast.add({
        severity: "success",
        summary: "Adding Room",
        detail: "You have successfully add new room.",
        life: 3000,
      });
      this.$emit("formSubmit");
    },
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },
  },
  mounted() {
    this.$toast = useToast();
  },
};
</script>

<style scoped></style>
