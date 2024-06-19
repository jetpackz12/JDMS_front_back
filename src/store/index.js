import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";
import roomModule from "./room";
import tenantModule from "./tenant";
import guestModule from "./guest";

const store = createStore({
  modules: {
    authModule,
    changePasswordModule,
    roomModule,
    tenantModule,
    guestModule
  },
});

export default store;
