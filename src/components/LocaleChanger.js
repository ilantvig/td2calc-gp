export default {
  name: "locale-changer",
  emits: ["update:modelValue"],
  props: {
    availableLocales: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    languageName(locale) {
      const fixLocale = locale.replace(/_/g, "-");
      let result = new Intl.DisplayNames([fixLocale], { type: "language" }).of(
        fixLocale
      );
      result = result[0].toLocaleUpperCase() + result.slice(1);
      return result;
    },
  },
  // watch: {},
  // created() {},
  // =======================================================
  template: /*template*/ `
    <select
      class="td2-input"
      v-model="value">
      <option 
        v-for="locale in availableLocales" 
        :key="'locale-'+locale"
        :value="locale">
        {{ languageName(locale) }}
      </option>
    </select>
  `,
};
