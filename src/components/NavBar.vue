<template>
  <section class="nav">
    <router-link to="/">
      <font-awesome-icon class="nav__icon nav__icon-book" icon="book"></font-awesome-icon>
    </router-link>
    <router-link to="/dream-form">
      <div class="nav__add-dream-button">+</div>
    </router-link>
    <font-awesome-icon class="nav__icon nav__icon-stats" icon="chart-pie"></font-awesome-icon>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style lang="scss"></style>
