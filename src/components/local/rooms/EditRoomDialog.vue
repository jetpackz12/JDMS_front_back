<template>
  <Dialog
    header="Edit Room"
    :breakpoints="{ '960px': '75vw' }"
    :style="{ width: '30vw' }"
    :modal="true"
  >
    <hr />
    <div class="flex justify-content-center">
      <Image
        :src="
          formData.image === null
            ? '/layout/images/imageicon.jpg'
            : apiUrl + '/storage/room-images/' + this.formData.image
        "
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
        @uploader="onUpload"
        customUpload
        :auto="true"
        chooseLabel="Select image"
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
export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
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
    async submit() {
      await this.$store.dispatch("roomModule/updateData", this.formData);

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
    },
    async onUpload(event) {
      await this.$store.dispatch("roomModule/uploadImage", event.files[0]);

      if (this.isUpload) {
        this.formData.image = this.$store.getters["roomModule/image"];
      }
    },
  },
  computed: {
    isUpload() {
      return this.$store.getters["roomModule/isUpload"];
    },
    isSuccess() {
      return this.$store.getters["roomModule/isSuccess"];
    },
    message() {
      return this.$store.getters["roomModule/message"];
    },
  },
};
</script>

<style scoped></style>
