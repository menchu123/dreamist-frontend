<template>
  <div class="home">
    <h1 class="title">Journal</h1>
    <section v-if="isLoading" class="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </section>
    <section v-else-if="noDreams()" class="no-dreams">
      You have not yet logged any dreams<span class="no-dreams--small"
        >When you are ready, tap below to record your first dream</span
      >
    </section>
    <ul v-else class="dream-list">
      <li class="dream-list__dream" v-for="dream in dreams" :key="dream.id">
        <router-link :to="/dream-form/ + dream.id">
          <DreamPreview :dream="dream" />
        </router-link>
      </li>
    </ul>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import DreamPreview from "@/components/DreamPreview.vue";

export default defineComponent({
  name: "Home",
  components: {
    NavBar,
    DreamPreview,
  },
  computed: {
    ...mapState(["dreams", "user", "isLoading"]),
  },
  methods: {
    ...mapActions(["getDreamsFromApi", "checkToken"]),
    redirectToLogin() {
      if (!this.user.isAuthenticated) {
        this.$router.push("/login");
      }
    },
    noDreams() {
      if (this.dreams.length === 0) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.checkToken();
    this.redirectToLogin();
    this.getDreamsFromApi();
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.no-dreams {
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  margin-top: 200px;
  &--small {
    display: block;
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
  }
}
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 200px;
}
.home {
  @include backgroundDark;
  @include loading;
  padding: 132px 20px 0;
  .title {
    max-width: $content-width;
    margin: 0 auto 10px;
  }
  .dream-list {
    height: calc(100vh - 110px - 150px);
    overflow-y: scroll;
    padding-bottom: 30px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    list-style: none;
    padding-left: 0;
  }
}
</style>
