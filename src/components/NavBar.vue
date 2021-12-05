<template>
  <nav v-if="isMobile" class="nav">
    <router-link to="/">
      <font-awesome-icon class="nav__icon nav__icon-book" icon="book"></font-awesome-icon>
    </router-link>
    <router-link to="/dream-form" class="nav__add-dream-button"
      ><font-awesome-icon icon="plus"></font-awesome-icon
    ></router-link>
    <button class="microphone-button" @click="startRecording">
      <font-awesome-icon class="microphone" icon="microphone"></font-awesome-icon>
    </button>
    <router-link to="/statistics">
      <font-awesome-icon class="nav__icon nav__icon-stats" icon="chart-pie"></font-awesome-icon>
    </router-link>
  </nav>
  <nav v-else class="nav-desktop">
    <router-link to="/">
      <div class="logo">
        <img src="@/assets/luna.png" alt="" />
        <h1 class="page-title">Dreamist</h1>
      </div>
    </router-link>
    <div class="right-links">
      <router-link to="/">
        <span class="top-link">Journal</span>
      </router-link>
      <router-link to="/statistics">
        <span class="top-link">Analysis</span>
      </router-link>
      <router-link to="/dream-form" class="nav-desktop__add-dream-button"
        ><font-awesome-icon icon="plus"></font-awesome-icon
      ></router-link>
      <button @click.prevent="logout()" class="top-link">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "NavBar",

  computed: {
    ...mapState(["isMobile"]),
  },
  methods: {
    ...mapActions(["logoutUser", "startRecording"]),
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
.microphone-button {
  position: absolute;
  right: calc(50% - 80px);
  background-color: $pink2;
  font-size: 25px;
  color: #fff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &:active {
    background-color: $pink1;
  }
}
.nav-desktop {
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  &__add-dream-button {
    background-color: $pink1;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease-out 0.4s;
    &:hover {
      transform: rotate(180deg);
    }
  }
}
.logo {
  display: flex;
}
.right-links {
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .top-link {
    border: none;
    background: transparent;
    color: white;
    font-size: inherit;
    font-family: $font-family;
    &:hover {
      color: $pink1;
    }
  }
  button.top-link {
    padding: 3px 10px 6px;
    background-color: $blue1;
    border-radius: 15px;
    margin-bottom: 5px;
    &:hover {
      background-color: $blue2;
    }
    &:active {
      background-color: $lightgrey;
      color: $blue2;
    }
  }

  .router-link-active .top-link {
    color: $pink1;
  }
}

.nav {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 60px;
  width: 100%;
  background-color: $darkBackground;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: $blue1;
  border-top: 1px solid $blue1;

  &__icon {
    font-size: 25px;
    &:active {
      color: $lightgrey;
    }
  }
  .router-link-active {
    color: $lightgrey;
  }
  &__add-dream-button {
    color: #fff;
    font-size: 35px;
    background-color: $pink1;
    height: 100px;
    width: 100px;
    text-align: center;
    border-radius: 50%;
    position: relative;
    bottom: 10px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      background-color: $pink2;
    }
  }
}
</style>
