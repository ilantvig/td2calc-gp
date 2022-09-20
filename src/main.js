import { createApp } from "vue";

import i18n from "./i18n.js";
import MainWrapper from "./components/MainWrapper.js";

createApp({
  components: {
    MainWrapper,
  },
  data() {
    return {};
  },
  template: /*template*/ `
      <main-wrapper></main-wrapper>
  `,
})
  .use(i18n)
  .mount("#app");
