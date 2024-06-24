<template>
  <Dialog header="Add Room" :style="{ width: '30vw' }" :modal="true">
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
        name="image[]"
        accept="image/*"
        :maxFileSize="1000000"
        @uploader="onUpload"
        customUpload
        :auto="true"
        chooseLabel="Select image"
        class="w-10rem sm:w-14rem lg:w-18rem"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field flex flex-column">
      <label for="room">Room</label>
      <InputText
        v-model.lazy.trim="formData.room"
        id="room"
        type="text"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field flex flex-column">
      <label for="description">Description</label>
      <InputText
        v-model.lazy.trim="formData.description"
        id="description"
        type="text"
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field flex flex-column">
      <label for="capacity">Capacity</label>
      <InputNumber
        v-model.lazy="formData.capacity"
        inputId="withoutgrouping"
        :useGrouping="false"
        id="capacity"
        :disabled="formData.isDisabled"
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
        :disabled="formData.isDisabled"
      />
    </div>
    <div class="field flex flex-column">
      <label for="price">Price</label>
      <InputNumber
        v-model.lazy="formData.price"
        inputId="integeronly"
        id="price"
        :disabled="formData.isDisabled"
      />
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
      this.formData.isShowLoadingCircle = true;
      this.formData.isDisabled = true;

      await this.$store.dispatch("roomModule/storeData", this.formData);

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
