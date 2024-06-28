<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <Toast />
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <i class="pi pi-building" style="font-size: 2.5rem"></i>
            <span>JetDorm</span>
            <div class="text-900 text-3xl font-medium my-3">Welcome!</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div>
            <label for="email" class="block text-900 text-xl font-medium mb-2"
              >Email <br />
              <small
                class="p-invalid text-red-600"
                v-if="submitted && !formData.email"
                >This is required.</small
              ></label
            >
            <InputText
              id="email"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="formData.email"
              :invalid="submitted && !formData.email"
              :required="true"
              :disabled="isDisabled"
            />

            <label
              for="password"
              class="block text-900 font-medium text-xl mb-2"
              >Password <br />
              <small
                class="p-invalid text-red-600"
                v-if="submitted && !formData.password"
                >This is required.</small
              ></label
            >
            <Password
              id="password"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              autocomplete="current-password"
              :inputStyle="{ padding: '1rem' }"
              :feedback="false"
              v-model="formData.password"
              :invalid="submitted && !formData.password"
              :required="true"
              :disabled="isDisabled"
              @keydown.enter="submit()"
            ></Password>
            <Button
              label="Sign In"
              class="w-full p-3 text-xl mt-3"
              @click="submit()"
              :disabled="isDisabled"
            ></Button>
          </div>
        </div>
      </div>

      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <ProgressSpinner v-if="isShowLoadingCircle" />
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<script>
import { useLayout } from "@/layout/composables/layout";
import AppConfig from "@/layout/AppConfig.vue";

export default {
  components: {
    AppConfig,
  },
  data() {
    return {
      formData: this.getInitialFormData(),
      submitted: false,
      isShowLoadingCircle: false,
      isDisabled: false,
    };
  },
  methods: {
    getInitialFormData() {
      return {
        email: null,
        password: null,
      };
    },
    async submit() {
      this.submitted = true;
      this.isShowLoadingCircle = true;
      this.isDisabled = true;

      if (!this.formData.email || !this.formData.password) {
        return;
        this.isShowLoadingCircle = false;
        this.isDisabled = false;
      }

      await this.$store.dispatch("authModule/login", this.formData);

      if (this.isAuthenticated) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Login Failed",
          detail: "Username or password is invalid.",
          life: 3000,
        });
      }

      this.isShowLoadingCircle = false;
      this.isDisabled = false;
    },
  },
  computed: {
    logoUrl() {
      const { layoutConfig } = useLayout();
      return `/layout/images/${
        layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
      }.png`;
    },
    isAuthenticated() {
      return this.$store.getters["authModule/isAuthenticated"];
    },
  },
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
