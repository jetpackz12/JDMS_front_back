import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";
import roomModule from "./room";
import tenantModule from "./tenant";
import guestModule from "./guest";
import waterBillingPaymentModule from "./water-billing-payment";
import electricityBillingPaymentModule from "./electricity-billing-payment";

const store = createStore({
  modules: {
    authModule,
    changePasswordModule,
    roomModule,
    tenantModule,
    guestModule,
    waterBillingPaymentModule,
    electricityBillingPaymentModule
  },
});

export default store;
