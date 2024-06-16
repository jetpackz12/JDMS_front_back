<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex justify-content-between align-items-center">
          <h5>
            <i class="pi pi-building"></i>
            Manage Rooms
          </h5>
          <Button
            label="Add Room"
            icon="pi pi-plus-circle"
            style="width: auto"
            @click="openAddDialog()"
          />
        </div>
        <hr />
        <DataView
          :value="dataviewValue"
          :layout="layout"
          :paginator="true"
          :rows="9"
          :sortOrder="sortOrder"
          :sortField="sortField"
        >
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left">
                <Dropdown
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Sort By Type"
                  @change="onSortChange($event)"
                />
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>

          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12"
              >
                <div
                  class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                  :class="{ 'border-top-1 surface-border': index !== 0 }"
                >
                  <div class="md:w-10rem relative">
                    <img
                      class="block xl:block mx-auto border-round w-full"
                      :src="`/layout/images/${item.image}`"
                      :alt="item.description"
                    />
                    <Tag
                      :value="item.availability === 0 ? 'Occupied' : 'Vacant'"
                      :severity="getSeverity(item)"
                      class="absolute"
                      style="left: 4px; top: 4px"
                    ></Tag>
                  </div>
                  <div
                    class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
                  >
                    <div
                      class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                    >
                      <div class="flex flex-column gap-2">
                        <div class="text-lg font-medium text-900 mt-2">
                          Room: {{ item.room }}
                        </div>
                        <span class="font-medium text-secondary text-sm"
                          >Description: {{ item.description }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Capacity: {{ item.capacity }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Type: {{ item.type }}</span
                        >
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <span class="text-xl font-semibold text-900"
                          >${{ item.price }}</span
                        >
                      </div>
                    </div>
                    <div class="flex flex-column md:align-items-end gap-5">
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button
                          icon="pi pi-pencil"
                          label="Edit"
                          :disabled="item.availability === 0"
                          class="flex-auto md:flex-initial white-space-nowrap"
                          @click="openUpdateDialog(item)"
                        ></Button>
                        <Button
                          :icon="
                            item.status === 1 ? 'pi pi-times' : 'pi pi-check'
                          "
                          :label="item.status === 1 ? 'Disable' : 'Enable'"
                          :disabled="item.availability === 0"
                          class="flex-auto md:flex-initial white-space-nowrap"
                          @click="openDeleteDialog(item)"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12 sm:col-6 md:col-4 p-2"
              >
                <div
                  class="p-4 border-1 surface-border surface-card border-round flex flex-column"
                >
                  <div
                    class="surface-50 flex justify-content-center border-round p-3"
                  >
                    <div class="relative mx-auto">
                      <Image
                        imageClass="border-round w-full"
                        :src="`/layout/images/${item.image}`"
                        :alt="item.description"
                        imageStyle="max-width: 300px max-height: 50px;"
                        preview
                      />
                      <Tag
                        :value="item.availability === 0 ? 'Occupied' : 'Vacant'"
                        :severity="getSeverity(item)"
                        class="absolute"
                        style="left: 4px; top: 4px"
                      ></Tag>
                    </div>
                  </div>
                  <div class="pt-4">
                    <div
                      class="flex flex-row justify-content-between align-items-start gap-2"
                    >
                      <div class="flex flex-column gap-2">
                        <div class="text-lg font-medium text-900 mt-1">
                          Room: {{ item.room }}
                        </div>
                        <span class="font-medium text-secondary text-sm"
                          >Description: {{ item.description }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Capacity: {{ item.capacity }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Type: {{ item.type }}</span
                        >
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <span class="text-2xl font-semibold text-900"
                          >${{ item.price }}</span
                        >
                      </div>
                    </div>
                    <div class="flex flex-column gap-4 mt-4">
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button
                          icon="pi pi-pencil"
                          label="Edit"
                          :disabled="item.availability === 0"
                          class="flex-auto white-space-nowrap"
                          @click="openUpdateDialog(item)"
                        ></Button>
                        <Button
                          :icon="
                            item.status === 1 ? 'pi pi-times' : 'pi pi-check'
                          "
                          :label="item.status === 1 ? 'Disable' : 'Enable'"
                          :disabled="item.availability === 0"
                          class="flex-auto md:flex-initial white-space-nowrap"
                          @click="openDeleteDialog(item)"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>

  <!-- Dailogs -->
  <AddRoomDialog
    v-model:visible="displayAddDialog"
    @formSubmit="closeDialog()"
    :formData="formData"
  />

  <EditRoomDialog
    v-model:visible="displayUpdateDialog"
    @formSubmit="closeDialog()"
    :formData="formData"
  />

  <DeleteRoomDialog
    v-model:visible="displayDeleteDialog"
    @formSubmit="closeDialog()"
    :formData="formData"
  />
</template>

<script>
import { RoomService } from "@/service/RoomService";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dataviewValue: null,
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Standard", value: "!type" },
        { label: "Premium", value: "type" },
        { label: "Reset", value: "reset" },
      ],
      displayAddDialog: false,
      displayUpdateDialog: false,
      displayDeleteDialog: false,
      roomService: new RoomService(),
      formData: this.getInitialFormData(),
      typeValues: [
        { label: "Standard", value: "Standard" },
        { label: "Premium", value: "Premium" },
      ],
    };
  },
  methods: {
    ...mapActions("authModule", ["checkAuth"]),
    getInitialFormData() {
      return {
        room: null,
        description: null,
        capacity: null,
        typeValues: this.typeValues,
        type: null,
        price: null,
      };
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value === "reset") {
        this.sortOrder = this.sortField = this.sortKey = null;
      } else if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
    getSeverity(room) {
      return room.availability === 1
        ? "success"
        : room.availability === 0
        ? "warning"
        : null;
    },
    openAddDialog() {
      this.formData = this.getInitialFormData();
      this.displayAddDialog = true;
    },
    openUpdateDialog(editData) {
      this.formData = { ...editData, typeValues: this.typeValues };
      this.displayUpdateDialog = true;
    },
    openDeleteDialog(editData) {
      this.formData = editData;
      this.displayDeleteDialog = true;
      console.log(this.formData);
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayDeleteDialog =
          false;
    },
  },
  mounted() {
    this.roomService.getRooms().then((data) => (this.dataviewValue = data));
    this.checkAuth();
  },
};
</script>

<style scoped></style>
