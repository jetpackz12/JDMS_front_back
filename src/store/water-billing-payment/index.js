import waterBillingPaymentGetters from "./getters";
import waterBillingPaymentMutations from "./mutations";
import waterBillingPaymentActions from "./actions";

const waterBillingPaymentModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      message: null,
      isSuccess: false,
    };
  },
  getters: waterBillingPaymentGetters,
  mutations: waterBillingPaymentMutations,
  actions: waterBillingPaymentActions,
};

export default waterBillingPaymentModule;
