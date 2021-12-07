<template>
  <div class="home" :class="{ light: isLight }">
    <font-awesome-icon
      v-if="isMobile"
      @click.prevent="logout()"
      class="sign-out"
      icon="sign-out-alt"
    ></font-awesome-icon>
    <Moon v-if="isMobile" />
    <h2 class="title">Journal</h2>
    <section v-if="isLoading && isMobile" class="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </section>
    <section v-if="noDreams() && !isLoading" class="no-dreams">
      <h2>
        You have not yet logged any dreams<span class="no-dreams--small"
          >When you are ready, tap below to record your first dream</span
        >
      </h2>
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
    ...mapState(["dreams", "user", "isLoading", "isMobile", "isLight"]),
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
@import "./src/styles/variables-light";
@import "./src/styles/mixins-light";

.home {
  @include backgroundDark;
  @include loading;
  padding: 132px 20px 0;
  @media only screen and (min-width: 768px) {
    padding-top: 60px;
    height: 100%;
  }
  .title {
    max-width: $content-width;
    margin: 0 auto 10px;
  }
  .dream-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 110px - 130px);
    overflow: scroll;
    padding-bottom: 30px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    list-style: none;
    padding-left: 0;
    @media only screen and (min-width: 768px) {
      height: calc(100vh - 143px);
      padding-bottom: 0;
    }
  }
  .dream-list__dream {
    max-width: $content-width;
    min-width: 280px;
    width: 100%;
    .router-link-active .dream-prev,
    .dream-prev:hover {
      border: 1px solid white;
    }
  }
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
    h2 {
      width: $content-width;
    }
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
}
.home.light {
  @include backgroundLight;
  .title {
    color: $lightgrey-light;
  }
  .sign-out {
    color: $lightgrey-light;
  }
}
</style>
