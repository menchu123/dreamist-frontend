<template>
  <section class="login">
    <h1 class="login__title">Welcome back!</h1>
    <form action="" class="login__form" novalidate autocomplete="off" @submit.prevent="onSubmit">
      <input type="text" name="username" id="username" placeholder="Username" v-model="username" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
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
import { mapActions } from "vuex";

export default defineComponent({
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isDisabled: true,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onSubmit() {
      if (this.username !== "" && this.password !== "") {
        const userData = {
          username: this.username,
          password: this.password,
        };
        await this.loginUser(userData);
        this.$router.push("/");
      }
    },
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
