import tenantGetters from "./getters";
import tenantMutations from "./mutations";
import tenantActions from "./actions";

const tenantModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: tenantGetters,
  mutations: tenantMutations,
  actions: tenantActions,
};

export default tenantModule;
