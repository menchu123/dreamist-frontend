<template>
  <div class="home">
    <font-awesome-icon
      @click.prevent="logout()"
      class="sign-out"
      icon="sign-out-alt"
    ></font-awesome-icon>
    <Moon />
    <h1 @click="enter = !enter" class="title">Journal</h1>
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
      <li class="dream-list__dream" v-for="dream in sortDreams" :key="dream.id">
        <DreamPreview :dream="dream" />
      </li>
    </ul>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import DreamPreview from "@/components/DreamPreview.vue";
import Moon from "@/components/Moon.vue";

export default defineComponent({
  name: "Home",
  components: {
    NavBar,
    DreamPreview,
    Moon,
  },
  data() {
    return {
      enter: false,
    };
  },
  computed: {
    ...mapState(["dreams", "user", "isLoading"]),
    ...mapGetters(["sortDreams"]),
  },
  methods: {
    ...mapActions(["getDreamsFromApi", "checkToken", "logoutUser"]),
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
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.checkToken();
    this.redirectToLogin();
    this.getDreamsFromApi();
    this.enter = true;
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";

.sign-out {
  position: absolute;
  right: calc(50% - (($content-width - 60px) / 2));
  top: 60px;
  font-size: 20px;
  color: $lightgrey;
  &:active {
    color: $blue1;
  }
  z-index: 2;
}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 110px - 130px);
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
  .dream-list__dream {
    max-width: $content-width;
    min-width: 280px;
    width: 100%;
  }
}
</style>
