import electricityBillingPaymentGetters from "./getters";
import electricityBillingPaymentMutations from "./mutations";
import electricityBillingPaymentActions from "./actions";

const electricityBillingPaymentModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: electricityBillingPaymentGetters,
  mutations: electricityBillingPaymentMutations,
  actions: electricityBillingPaymentActions,
};

export default electricityBillingPaymentModule;
