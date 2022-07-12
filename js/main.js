// main.js

// import { createApp } from "https://unpkg.com/vue@3.2.33/dist/vue.esm-browser.prod.js"
import { createApp } from "https://unpkg.com/vue@3.2.33/dist/vue.esm-browser.js"
// import { createApp } from "./vue@3.2.31/dist/vue.esm-browser.js"
import vMainWrapper from "./components/v-main-wrapper.js"

createApp({
  data() {
    return {
      title: "TD2 Gear Proficiency Calculator"
    }
  },
  template: /*template*/ `{{title}}`
}).mount('#title')

createApp({
  components: {
    vMainWrapper,
  },
  data() {
    return {
    }
  },
  template: /*template*/ `
      <v-main-wrapper />
  `
}).mount('#app')





