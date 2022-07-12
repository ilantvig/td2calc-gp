import vContent from "./v-content.js"

export default {
    name: 'v-main-wrapper',
    components: {
        vContent,
    },
    // принимает данные из родителя 
    // props: {},
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    // computed: {},
    // methods: {},
    // watch: {},
    // mounted() {},
    template: /*template*/ `
        <div class="v-main-wrapper">
            <h2 class="box-lime" style="text-align: center;">
                The Division 2 Gear Proficiency Calculator
            </h2>
            <v-content></v-content>
        </div>
    `
}