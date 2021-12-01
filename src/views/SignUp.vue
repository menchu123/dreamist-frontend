<template>
  <section class="signup">
    <h1 class="signup__title">Create your account</h1>
    <form action="" class="signup__form" novalidate autocomplete="off" @submit.prevent="onSubmit">
      <input type="text" name="name" id="name" placeholder="Name" v-model="name" maxlength="30" />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
        maxlength="30"
        :class="{ wrong: wrongCredentials, shake: wrongCredentials }"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        maxlength="30"
      />
      <button type="submit" :disabled="username === '' || password === '' || name === ''">
        SIGN UP
      </button>
      <span v-if="wrongCredentials" class="wrong-credentials"
        >Username taken! Please try again</span
      >
    </form>
    <div class="bottom-link">
      <p class="bottom-link__text">
        ALREADY HAVE AN ACCOUNT?
        <router-link to="/login">
          <span>LOG IN</span>
        </router-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "SignUp",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      isDisabled: true,
      wrongCredentials: false,
    };
  },
  methods: {
    async onSubmit() {
      this.wrongCredentials = false;
      const newUser = {
        name: this.name,
        username: this.username,
        password: this.password,
      };
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/users/register`, newUser);
        this.$router.push("/login");
      } catch {
        this.wrongCredentials = true;
      }
    },
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.signup {
  @include backgroundGradient;
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
