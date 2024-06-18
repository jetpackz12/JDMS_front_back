import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";
import roomModule from "./room";

const store = createStore({
  modules: {
    authModule,
    changePasswordModule,
    roomModule,
  },
});

export default store;
