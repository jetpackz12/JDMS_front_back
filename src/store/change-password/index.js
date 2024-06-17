import changePasswordGetters from "./getters";
import changePasswordMutations from "./mutations";
import changePasswordActions from "./actions";

const changePasswordModule = {
  namespaced: true,
  state() {
    return {
      message: null,
      isSuccess: false,
    };
  },
  getters: changePasswordGetters,
  mutations: changePasswordMutations,
  actions: changePasswordActions,
};

export default changePasswordModule;
