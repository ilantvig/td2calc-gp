import { createI18n } from "vue-i18n";

const messages = {
  en: {
    totalArmor: "Total armor",
    proficiencyLevel: "Proficiency Level",
    allProficiencyLevel: "All Proficiency Level",
    gearUpgradeCosts: "Total gear upgrade costs",

    armorCore: "Armor Core",

    gearType: {
      mask: "Mask",
      backpack: "Backpack",
      chest: "Chest",
      gloves: "Gloves",
      holster: "Holster",
      kneepads: "Kneepads",
    },

    setTo: "Set to",

    attributeLabel: [
      "Set all gears to same value or",
      "Set each gear to individual value or",
    ],
    attributeButtonText: ["Switch to Individual Mode", "Switch to Group Mode"],

    gearMaterialNames: [
      "Protective Fabric",
      "Polycarbonate",
      "Carbon Fiber",
      "Field Recon Data",
      "SHD Calibration",
      "Exotic Material",
    ],

    invalidInput: "Invalid input",
  },
  ru: {
    totalArmor: "Всего брони",
    proficiencyLevel: "Уровень знатока",
    allProficiencyLevel: "Уровень знатока всего",
    gearUpgradeCosts: "Стоимость прокачки",

    armorCore: "Броня",

    gearType: {
      mask: "Маска",
      backpack: "Рюкзак",
      chest: "Жилет",
      gloves: "Перчатки",
      holster: "Кобура",
      kneepads: "Наколенники",
    },

    setTo: "Установить на",

    attributeLabel: [
      "Установите одинаковое значение или",
      "Установите различные значения или",
    ],

    attributeButtonText: ["Переключить режим", "Переключить режим"],

    gearMaterialNames: [
      "Защитная ткань",
      "Поликарбонат",
      "Углепластик",
      "Полевые даные",
      "Калибратор",
      "Экзот. комп.",
    ],

    invalidInput: "Недопустимое значение",
  },
};

const i18n = createI18n({
  locale: "en", // set current locale
  fallbackLocale: "en",
  messages,
});

export default i18n;
