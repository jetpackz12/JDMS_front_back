import tenantBillingPaymentGetters from "./getters";
import tenantBillingPaymentMutations from "./mutations";
import tenantBillingPaymentActions from "./actions";

const tenantBillingPaymentModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: tenantBillingPaymentGetters,
  mutations: tenantBillingPaymentMutations,
  actions: tenantBillingPaymentActions,
};

export default tenantBillingPaymentModule;
