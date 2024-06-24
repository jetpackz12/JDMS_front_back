<template>
  <Dialog
    header="Tenant Billing Payment"
    :style="{ width: '70vw' }"
    :modal="true"
    class="p-fluid"
  >
    <div id="print_billing">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4>
        Tenant: <b>{{ formData[0].tenant }}</b>
      </h4>
      <h4>
        Billing Status: <b>{{ formData[0].tenant_billing_status_name }}</b>
      </h4>
      </div>

      <h3>Room Billing</h3>
      <DataTable :value="formData" showGridlines tableStyle="min-width: 20rem">
        <Column field="room" header="Room"></Column>
        <Column field="price" header="Price">
          <template #body="slotProps">
            {{ "₱" + slotProps.data.price }}
          </template>
        </Column>
      </DataTable>

      <h3>Water Billing</h3>
      <DataTable :value="formData" showGridlines tableStyle="min-width: 20rem">
        <Column field="prev_read" header="Previous Reading"></Column>
        <Column field="pres_read" header="Present Reading"></Column>
        <Column field="water_amount" header="Amount">
          <template #body="slotProps">
            {{ "₱" + slotProps.data.water_amount }}
          </template>
        </Column>
        <Column field="water_due_date" header="Due Date"></Column>
        <Column field="water_date_issue" header="Date Issue"></Column>
      </DataTable>
      <h3>Electricity Billing</h3>
      <DataTable :value="formData" showGridlines tableStyle="min-width: 20rem">
        <Column field="unit_con" header="Unit Consumed"></Column>
        <Column field="electricity_amount" header="Amount">
          <template #body="slotProps">
            {{ "₱" + slotProps.data.electricity_amount }}
          </template>
        </Column>
        <Column field="electricity_due_date" header="Due Date"></Column>
        <Column field="electricity_date_issue" header="Date Issue"></Column>
      </DataTable>
      <h3>Total Billing Payment</h3>
      <DataTable :value="formData" showGridlines tableStyle="min-width: 20rem">
        <Column field="calculation" header="Calculation"></Column>
        <Column field="totalBilling" header="Total Billing">
          <template #body="slotProps">
            {{ "₱" + slotProps.data.totalBilling }}
          </template>
        </Column>
      </DataTable>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog()" />
      <Button label="Print" icon="pi pi-print" text="" @click="submit()" />
    </template>
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
    submit() {
      let contents = document.getElementById("print_billing").innerHTML;
      let frame1 = document.createElement("iframe");
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      document.body.appendChild(frame1);
      let frameDoc = frame1.contentWindow
        ? frame1.contentWindow
        : frame1.contentDocument.document
        ? frame1.contentDocument.document
        : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write(
        '<html lang="en"><head><title>Fiche Client</title>'
      );
      frameDoc.document.write(
        '<link rel="stylesheet" type="text/css" href="/print.css"/>'
      );
      frameDoc.document.write("</head><body>");
      frameDoc.document.write(contents);
      frameDoc.document.write("</body></html>");
      frameDoc.document.close();
      setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
      }, 500);

      return false;
    },
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
  computed: {
    isSuccess() {
      return this.$store.getters["electricityBillingPaymentModule/isSuccess"];
    },
    message() {
      return this.$store.getters["electricityBillingPaymentModule/message"];
    },
  },
};
</script>

<style scoped></style>
