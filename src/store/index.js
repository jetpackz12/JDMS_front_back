import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";
import roomModule from "./room";
import tenantModule from "./tenant";
import guestModule from "./guest";
import waterBillingPaymentModule from "./water-billing-payment";
import electricityBillingPaymentModule from "./electricity-billing-payment";
import reportModule from "./report";
import homeModule from "./home";
import tenantBillingPaymentModule from "./tenant-billing-payment";

const store = createStore({
  modules: {
    authModule,
    homeModule,
    roomModule,
    tenantModule,
    guestModule,
    waterBillingPaymentModule,
    electricityBillingPaymentModule,
    tenantBillingPaymentModule,
    reportModule,
    changePasswordModule,
  },
});

export default store;
