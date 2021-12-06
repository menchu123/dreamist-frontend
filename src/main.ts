import { createApp } from "vue";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import './registerServiceWorker'

library.add(fas);
library.add(fab);
library.add(far);

dom.watch();

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
