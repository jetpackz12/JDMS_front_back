import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";
import roomModule from "./room";
import tenantModule from "./tenant";
import guestModule from "./guest";
import waterBillingPaymentModule from "./water-billing-payment";

const store = createStore({
  modules: {
    authModule,
    changePasswordModule,
    roomModule,
    tenantModule,
    guestModule,
    waterBillingPaymentModule,
  },
});

export default store;
