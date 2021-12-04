<template>
  <section class="login">
    <Moon />
    <h1 class="login__title">Welcome back!</h1>
    <form class="login__form" novalidate autocomplete="off" @submit.prevent="onSubmit">
      <span v-if="wrongCredentials" class="wrong-credentials"
        >Wrong credentials! Please try again</span
      >
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
        :class="{ wrong: wrongCredentials, shake: wrongCredentials }"
        maxlength="30"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        :class="{ wrong: wrongCredentials, shake: wrongCredentials }"
        maxlength="30"
      />
      <button type="submit" :disabled="username === '' || password === ''">LOG IN</button>
    </form>
    <div class="bottom-link">
      <p class="bottom-link__text">
        DON’T HAVE AN ACCOUNT?
        <router-link to="signup">
          <span>SIGN UP</span>
        </router-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Moon from "@/components/Moon.vue";

export default defineComponent({
  name: "Login",
  components: {
    Moon,
  },
  data() {
    return {
      username: "",
      password: "",
      isDisabled: true,
      wrongCredentials: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["loginUser", "checkToken"]),
    async onSubmit() {
      this.wrongCredentials = false;
      try {
        if (this.username !== "" && this.password !== "") {
          const userData = {
            username: this.username,
            password: this.password,
          };
          await this.loginUser(userData);
          this.$router.push("/");
        }
      } catch {
        this.wrongCredentials = true;
      }
    },
    redirectToHome() {
      if (this.user.isAuthenticated) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.checkToken();
    this.redirectToHome();
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.login {
  @include backgroundGradient;
  overflow: hidden;
  padding: 132px 20px 0;
  &__title {
    text-align: center;
    margin-top: 20px;
  }
  &__form {
    @include userForm;
    margin-top: 100px;
  }
  .bottom-link {
    @include bottomLink;
  }
}
</style>
