<template>
  <div class="home">
    <h1 class="title">Journal</h1>

    <ul class="dream-list">
      <li class="dream-list__dream" v-for="dream in dreams" :key="dream.id">
        <DreamPreview :dream="dream" />
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
    ...mapState(["dreams"]),
  },
  methods: {
    ...mapActions(["getDreamsFromApi"]),
  },
  mounted() {
    this.getDreamsFromApi();
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.home {
  @include backgroundDark;
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
