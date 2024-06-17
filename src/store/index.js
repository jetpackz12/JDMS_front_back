import { createStore } from "vuex";
import authModule from "./auth";
import changePasswordModule from "./change-password";

const store = createStore({
  modules: {
    authModule,
    changePasswordModule,
  },
});

export default store;
