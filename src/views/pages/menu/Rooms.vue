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
        >
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left flex gap-1">
                <Dropdown
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Sort By Type"
                  @change="onSortChange($event)"
                />
                <Dropdown
                  v-model="sortAvailabilityKey"
                  :options="sortAvailabilityOptions"
                  optionLabel="label"
                  placeholder="Sort By Availability"
                  @change="onSortAvailabilityChange($event)"
                />
                <Button
                  type="button"
                  label="Filter"
                  icon="pi pi-filter"
                  @click="onSortFilter()"
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
                      :src="`${apiUrl}/storage/room-images/${item.image}`"
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
                          >Capacity: {{ item.occupies }} / {{ item.capacity }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Type:
                          {{ item.type === 1 ? "Standard" : "Premium" }}</span
                        >
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <span class="text-xl font-semibold text-900"
                          >₱{{ item.price }}</span
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
                        :src="`${apiUrl}/storage/room-images/${item.image}`"
                        :alt="item.description"
                        preview
                        style="
                          width: 100%;
                          max-width: 22rem;
                          height: 300px;
                          object-fit: cover;
                        "
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
                          >Capacity: {{ item.occupies }} / {{ item.capacity }}</span
                        >
                        <span class="font-medium text-secondary text-sm"
                          >Type:
                          {{ item.type === 1 ? "Standard" : "Premium" }}</span
                        >
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <span class="text-2xl font-semibold text-900"
                          >₱{{ item.price }}</span
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

export default {
  data() {
    return {
      dataviewValue: null,
      layout: "grid",
      sortKey: null,
      sortOptions: [
        { label: "Standard", value: 1 },
        { label: "Premium", value: 2 },
        { label: "Reset", value: "reset" },
      ],
      sortAvailabilityKey: null,
      sortAvailabilityOptions: [
        { label: "Occupied", value: 0 },
        { label: "Vacant", value: 1 },
        { label: "Reset", value: "reset" },
      ],
      displayAddDialog: false,
      displayUpdateDialog: false,
      displayDeleteDialog: false,
      roomService: new RoomService(),
      formData: this.getInitialFormData(),
      typeValues: [
        { label: "Standard", value: 1 },
        { label: "Premium", value: 2 },
      ],
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    getInitialFormData() {
      return {
        image: null,
        room: null,
        description: null,
        capacity: null,
        typeValues: this.typeValues,
        type: null,
        price: null,
        isShowLoadingCircle: false,
        isDisabled: false,
      };
    },
    onSortChange(event) {
      const value = event.value.value;
      const rooms = this.getData.rooms;

      if (value === "reset") {
        this.dataviewValue = rooms;
        this.sortAvailabilityKey = null;
        this.sortKey = null;
      }
    },
    onSortFilter() {
      const rooms = this.getData.rooms;
      const type = this.sortKey?.value ?? null;
      const availability = this.sortAvailabilityKey?.value ?? null;

      if (availability === "reset") {
        this.dataviewValue = rooms.filter((item) => item.type === type);
        return;
      }

      if (type !== null || availability !== null) {
        this.dataviewValue = rooms.filter((item) => {
          const matchesType = type !== null ? item.type === type : true;
          const matchesAvailability =
            availability !== null ? item.availability === availability : true;
          return matchesType && matchesAvailability;
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please choose the filtering option.",
          life: 3000,
        });
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
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayDeleteDialog =
          false;

      this.getRooms();
    },
    async getRooms() {
      await this.$store.dispatch("roomModule/getRooms");

      this.dataviewValue = this.getData.rooms;
    },
  },
  computed: {
    getData() {
      return this.$store.getters["roomModule/data"];
    },
  },
  mounted() {
    this.getRooms();
  },
};
</script>

<style scoped></style>
