import homeGetters from "./getters";
import homeMutations from "./mutations";
import homeActions from "./actions";

const homeModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: homeGetters,
  mutations: homeMutations,
  actions: homeActions,
};

export default homeModule;
