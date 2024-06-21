import reportGetters from "./getters";
import reportMutations from "./mutations";
import reportActions from "./actions";

const reportModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: reportGetters,
  mutations: reportMutations,
  actions: reportActions,
};

export default reportModule;
