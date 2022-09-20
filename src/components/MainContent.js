
import LocaleChanger from "./LocaleChanger.js";

export default {
  name: "v-content",
  components: {
    LocaleChanger,
  },
  // emits: [],
  // props: {},
  data() {
    return {
      text: "v-content text",
      
      totalGearUpgradeCoast: [0, 0, 0, 0, 0, 0],
      gearUpgradeCoast: [
        // Protective Fabric, Polycarbonate, Carbon Fiber,
        // Field Recon Data, SHD Calibration, Exotic Material
        [0, 0, 0, 0, 0, 0],
        [148, 118, 76, 0, 0, 0],
        [321, 254, 165, 0, 0, 0],
        [519, 408, 267, 0, 0, 0],
        [742, 580, 382, 0, 0, 0],
        [990, 770, 510, 0, 0, 0],
        [1240, 770, 651, 1, 0, 0],
        [1490, 770, 805, 3, 0, 0],
        [1740, 770, 972, 6, 0, 0],
        [1990, 770, 1152, 10, 0, 0],
        [2240, 770, 1345, 15, 0, 0],
        [2240, 770, 1345, 21, 1, 0],
        [2240, 770, 1345, 28, 3, 1],
        [2240, 770, 1345, 36, 6, 2],
        [2240, 770, 1345, 45, 10, 4],
        [2240, 770, 1345, 55, 15, 6],
        [2240, 770, 1345, 66, 21, 9],
        [2240, 770, 1345, 78, 28, 12],
        [2240, 770, 1345, 91, 36, 16],
        [2240, 770, 1345, 105, 45, 20],
        [2240, 770, 1345, 120, 55, 25],
        [2240, 770, 1345, 150, 70, 35],
      ],
      gearArmorList: [
        // https://www.reddit.com/r/thedivision/comments/jd1jae/anyone_know_where_i_can_find_datamined_base_armor/
        80297, 130844, 157961, 80297, 111889, 98726,
      ],
      isIndividual: false,
      gearProfLevelList: [0, 0, 0, 0, 0, 0],
      gearWithArmorList: [false, false, false, false, false, false],
      gearWithArmorCount: 0,
      totalArmorBonus: 10,
      oneProfLevelValue: 0,
      oneProfLevelValueError: "",
      oneWithArmorValue: false,
      totalArmor: 0,
      valueList: [0, 0, 0, 0, 0, 0],
      gearItems: [
        { type: "mask", value: 80297 },
        { type: "backpack", value: 130844 },
        { type: "chest", value: 157961 },
        { type: "gloves", value: 80297 },
        { type: "holster", value: 111889 },
        { type: "kneepads", value: 98726 },
      ],
    };
  },
  // ================================================================
  computed: {
    // translation begin

    gearUpgradeCosts() {
      return this.$t('gearUpgradeCosts');
    },
    
    totalArmorText() {
      return this.$t('totalArmor');
    },
    
    proficiencyLevel() {
      return this.$t('proficiencyLevel');
    },
    allProficiencyLevel() {
      return this.$t('allProficiencyLevel');
    },
    
    armorCore() {
      return this.$t('armorCore');
    },
    
    setTo() {
      return this.$t('setTo');
    },
    
    invalidInput() {
      return this.$t('invalidInput');
    },
    
    gearType() {
      return this.objectFromLoacale('gearType');
    },

    switchLabelText() {
      return this.objectFromLoacale('attributeLabel');
    },

    switchButtonText() {
      return this.objectFromLoacale('attributeButtonText');
    },

    gearMaterialNames() {
      return this.objectFromLoacale('gearMaterialNames');
    },


    // translation end

  },
  // ================================================================
  methods: {
    objectFromLoacale(key) {
      return this.$i18n['messages'][this.$i18n.locale][key];
    },

    updateTotalArmor() {
      let sum = 0;
      for (let i = 0; i < 6; i++) {
        sum +=
          this.gearArmorList[i] * (1 + this.gearProfLevelList[i] / 100) +
          170000 * this.gearWithArmorList[i];
      }
      sum *= 1 + this.totalArmorBonus / 100;
      this.totalArmor = Math.round(sum);
      return sum;
    },
    updateTotalUpgradeCoasts() {
        let result = [    0,    0,    0,    0,    0,    0];

        for (let m = 0; m < 6; m++) { // materials index
            for (let g = 0; g < 6; g++) { // gears index
                result[m] += this.gearUpgradeCoast[this.gearProfLevelList[g]][m];
            }
        }
        this.totalGearUpgradeCoast = result;
        return result;
    },
    setAllToOneValue() {
      for (let i = 0; i < 6; i++) {
        this.gearProfLevelList[i] = this.oneProfLevelValue;
        this.gearWithArmorList[i] = this.oneWithArmorValue;
      }
    },
    shortNumber(value) {
      value = +value;
      if (value < 1000) {
        return value;
      } else if (value < 1000000) {
        return (value / 1000).toFixed(1) + " k";
      } else {
        return (value / 1000000).toFixed(1) + " M";
      }
    },
    isCorrectkProfLevel(level) {
      return (typeof(level) == 'number' && 
              level == Math.round(level) &&
              0 <= level && level <= 21)
    },
    decAllProfLevel() {
      let result = [...this.gearProfLevelList];

      for (let g = 0; g < 6; g++) { // gears index
        if (result[g] > 0) {
          result[g] -= 1;
        }
      }
      this.gearProfLevelList = [...result];
      return result;
    },
    incAllProfLevel() {
      let result = [...this.gearProfLevelList];

      for (let g = 0; g < 6; g++) { // gears index
        if (result[g] < 21) {
          result[g] += 1;
        }
      }
      this.gearProfLevelList = [...result];
      return result;
    },
    setAllProfLevelZero() {
      let result = [...this.gearProfLevelList];

      for (let g = 0; g < 6; g++) { // gears index
        result[g] = 0;
      }
      this.gearProfLevelList = [...result];
      return result;
    },
    setAllProfLevelMax() {
      let result = [...this.gearProfLevelList];

      for (let g = 0; g < 6; g++) { // gears index
        result[g] = 21;
      }
      this.gearProfLevelList = [...result];
      return result;
    },
    setAllProfLevel(value) {
      let result = [...this.gearProfLevelList];

      for (let g = 0; g < 6; g++) { // gears index
        result[g] = value;
      }
      this.gearProfLevelList = [...result];
      return result;
    },


  },
  // =======================================================
  watch: {
    gearProfLevelList: {
        handler(newValue, oldValue) {
          let i = 0;
          while (i < 6 && this.isCorrectkProfLevel(newValue[i])) { i++; }
          if (i == 6) {
            this.updateTotalArmor();
            this.updateTotalUpgradeCoasts();
          }
        },
        deep: true,
    },
    gearWithArmorList: {
        handler(newValue, oldValue) {
            this.updateTotalArmor();
            let gearWithArmorCount = 0;
            for (let i = 0; i < 6; i++) {
                gearWithArmorCount += +this.gearWithArmorList[i];
            }
            if (gearWithArmorCount == 6) {
                this.oneWithArmorValue = true;
            } else if (gearWithArmorCount == 0) {
                this.oneWithArmorValue = false;
            }
            this.gearWithArmorCount = gearWithArmorCount;
        },
        deep: true,
    },
    oneProfLevelValue(newValue, oldValue) {
      // console.log(newValue, typeof(newValue));
      if (this.isCorrectkProfLevel(newValue)) {
        this.oneProfLevelValueError = "";
        this.oneProfLevelValue = newValue;
        for (let i = 0; i < 6; i++) {
            this.gearProfLevelList[i] = this.oneProfLevelValue;
        }
      } else {
        this.oneProfLevelValueError = this.invalidInput;
      }
    },
    oneWithArmorValue(newValue, oldValue) {
        for (let i = 0; i < 6; i++) {
            this.gearWithArmorList[i] = this.oneWithArmorValue;
        }
    },
  },
  // =======================================================
  created() {
    this.updateTotalArmor();
  },
  // mounted() {},
  // styles: [`/* inlined css */`],
  // =======================================================
  template: /*template*/ `
        <div class="main-content">
            
            <div class="stick stick-top">
              <h2 style="text-align: center;">
                {{totalArmorText}}: {{shortNumber(totalArmor)}} 
                ({{(totalArmor).toLocaleString()}})
              </h2>
            </div>

<!-- ///////////////////////////////////////////////////////// -->

            <div class="box-orange">
                <label :for="'totalArmorBonus_id'">{{totalArmorText}}: </label>
                <input :id="'totalArmorBonus_id'"
                    v-model="totalArmorBonus"
                    @change="updateTotalArmor()"
                    class="text-lg td2-input"
                    style="width: 7ex; text-align: end;"
                    type="number" placeholder="10" 
                    min="0" max="35" step="1">%
                <button class="td2-button" @click="totalArmorBonus = 0; updateTotalArmor()">{{setTo}} 0</button>
                <button class="td2-button" @click="totalArmorBonus = 10; updateTotalArmor()">{{setTo}} 10</button>
                <button class="td2-button" @click="totalArmorBonus = 15; updateTotalArmor()">{{setTo}} 15</button>
            </div>


<!-- ///////////////////////////////////////////////////////// -->

            <div class="box-orange">
              {{switchLabelText[+isIndividual]}} 
              <button class="td2-button" @click="isIndividual = !isIndividual">
                  {{switchButtonText[+isIndividual]}}
              </button>

              <div v-show="!isIndividual">
                <div style="padding: 10px">
                  <hr class="td2-hr"/>
                  <label :for="'oneProfLevelValue_id'">{{proficiencyLevel}}: </label>
                  <input :id="'oneProfLevelValue_id'"
                      v-model="oneProfLevelValue"
                      class="text-lg td2-input"
                      style="width: 7ex; text-align: end;"
                      type="number" placeholder="0" 
                      min="0" max="21" step="1"
                  />
                  {{oneProfLevelValueError}}
                  <br/>
                  
                  <button class="td2-button" @click="oneProfLevelValue = 0">{{setTo}} 0</button>
                  <button class="td2-button" @click="oneProfLevelValue = 10">{{setTo}} 10</button>
                  <button class="td2-button" @click="oneProfLevelValue = 20">{{setTo}} 20</button>
                  <button class="td2-button" @click="oneProfLevelValue = 21">{{setTo}} 21</button>
                  <br/>

                  <input type="checkbox" id="oneWithArmorValue" 
                      name="oneWithArmorValue" v-model="oneWithArmorValue"
                      :class="{ 'unchecked' : !oneWithArmorValue }"
                      @change="updateTotalArmor()">
                  <label for="oneWithArmorValue">
                      {{armorCore}}: {{ gearWithArmorCount ? gearWithArmorCount + " &times; 170 k = " + shortNumber(170000 * gearWithArmorCount) : "0" }}
                  </label> <br/>
                </div>
              </div>
              <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
              <div v-show="isIndividual">
                <div class="flex-container">
                  <div v-for="(gear, gearIndex) in gearItems"
                      :key="gearIndex"
                      style="width: 16em;">
                      
                      <hr class="td2-hr"/>
                      
                      <div>
                          {{gearType[gear.type]}}: {{shortNumber(gearArmorList[gearIndex])}} + 
                          {{gearProfLevelList[gearIndex]}}% = 
                          {{shortNumber(gearArmorList[gearIndex] * (1 + gearProfLevelList[gearIndex]/100))}}
                      </div>
                      <label :for="'gearProfLevelList_'+gearIndex">{{proficiencyLevel}}: </label>
                      <input :id="'gearProfLevelList_'+gearIndex"
                          v-model="gearProfLevelList[gearIndex]"
                          class="text-lg td2-input" 
                          style="width: 7ex; text-align: end;"
                          type="number" placeholder="0" 
                          min="0" max="21" step="1">
                      <br/>
                      <input type="checkbox" :id="'gearIndex_'+gearIndex"
                        name="gearIndex" v-model="gearWithArmorList[gearIndex]"
                        :class="{ 'unchecked' : !gearWithArmorList[gearIndex] }">
                      <label :for="'gearIndex_'+gearIndex">{{armorCore}}: {{ gearWithArmorList[gearIndex] ? "170 k" : "0" }}</label>
                  </div>
                </div>

                <hr class="td2-hr"/>
                {{allProficiencyLevel}}:
                <button class="td2-button" @click="setAllProfLevel(0)">{{setTo}} 0</button>
                <button class="td2-button" @click="setAllProfLevel(10)">{{setTo}} 10</button>
                <button class="td2-button" @click="setAllProfLevel(20)">{{setTo}} 20</button>
                <button class="td2-button" @click="setAllProfLevel(21)">{{setTo}} 21</button>
                <button class="td2-button" @click="decAllProfLevel()">-1</button>
                <button class="td2-button" @click="incAllProfLevel()">+1</button>
            </div>
          </div>           

<!-- ///////////////////////////////////////////////////////// -->

            <div class="stick stick-bottom">
                {{gearUpgradeCosts}}
                <hr class="td2-hr"/>
                <div class="flex-container">
                  <div v-for="(gearMatName,matIndex) in gearMaterialNames"
                  :key="matIndex"
                  style="width: 10em;">
                      {{gearMatName}}: {{totalGearUpgradeCoast[matIndex]}}
                  </div>
                </div>
            </div>

            <!--
           
            <br />

            <div style="margin: 15px; margin-bottom: 100%; border: 1px solid #ff6d10;">
            </div>

            -->
            
        </div>
    `,
};
