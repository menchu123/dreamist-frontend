<template>
  <section class="nav">
    <router-link to="/">
      <font-awesome-icon class="nav__icon nav__icon-book" icon="book"></font-awesome-icon>
    </router-link>
    <router-link to="/dream-form" class="nav__add-dream-button"
      ><font-awesome-icon icon="plus"></font-awesome-icon
    ></router-link>
    <router-link to="/statistics">
      <font-awesome-icon class="nav__icon nav__icon-stats" icon="chart-pie"></font-awesome-icon>
    </router-link>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style lang="scss">
@import "./src/styles/variables";

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
