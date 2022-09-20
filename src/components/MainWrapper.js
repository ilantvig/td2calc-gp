import LocaleChanger from "./LocaleChanger.js";
import MainContent from "./MainContent.js"

export default {
    name: 'main-wrapper',
    components: {
        LocaleChanger,
        MainContent,
    },
  // emits: [],
  // props: {},
  data() {
        return {
            documentTitle: "TD2 Gear Proficiency Calculator",
        }
    },
    // computed: {},
    // methods: {},
    // watch: {},
    mounted() {
        document.title = this.documentTitle;
    },
    template: /*template*/ `
        <div class="main-wrapper">
            <h2 class="box-lime" style="text-align: center;">
                The Division 2 Gear Proficiency Calculator
            </h2>
            <div class="locale-container">
                <locale-changer v-model="$i18n.locale"
                    :availableLocales = "$i18n.availableLocales">
                </locale-changer>
            </div>
            <main-content></main-content>
        </div>
    `
}