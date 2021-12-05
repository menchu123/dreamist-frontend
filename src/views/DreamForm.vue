<template>
  <FormComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormComponent from "@/components/FormComponent.vue";

export default defineComponent({
  name: "DreamForm",
  components: {
    FormComponent,
  },
});
</script>
