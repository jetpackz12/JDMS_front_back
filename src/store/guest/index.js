import guestGetters from "./getters";
import guestMutations from "./mutations";
import guestActions from "./actions";

const guestModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: guestGetters,
  mutations: guestMutations,
  actions: guestActions,
};

export default guestModule;
