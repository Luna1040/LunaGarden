<template>
  <div
          class="lunaSelect"
          :style="[selectStyles]"
          :class="[className, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'},{lightSelect: theme === 'light', darkSelect: theme === 'dark'}]"
          @focusin='handelClick'
          @focusout="hideList()"
          @keydown.esc="handleKeydown"
          @keydown.enter="handleKeydown"
          @keydown.up.prevent="handleKeydown"
          @keydown.down.prevent="handleKeydown"
          @keydown.tab="handleKeydown"
          @keydown.delete="handleKeydown"
  >
    <Input
            :readonly="!filterable"
            :disabled="disabled"
            :width="inputStyles.width"
            :height="inputStyles.height"
            :corner="corner"
            icon="iconfont icon-down"
            suffix
            :spin="showList"
            v-model="initValue"
            @focusin='handelClick'
            @focusout="hideList()"
            :background="background"
            :theme="theme"
    ></Input>
    <div
            class="optionScrollBarHidden"
            :class="{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}"
    >
      <transition name="slideDown">
        <div
                v-show="showList"
                class="optionGroup"
                :class="{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}"
                :style="[optionStyles]"
        >
          <slot>
            <Option
                    v-for="(i,index) in filterData"
                    :key="index"
                    :value="i[keyValue]"
                    :label="i[keyLabel]"
                    :class='{optionActive: index === choiceIndex}'
                    @optionSelect="optionSelect"
            ></Option>
          </slot>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Select",
    props: {
      value: {
        type: [String, Array, Number],
        default: ''
      },
      selectData: {
        type: Array,
        default: []
      },
      keyValue: {
        type: String,
        default: ""
      },
      keyLabel: {
        type: String,
        default: ''
      },
      filterable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      returnLabel: {
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: 180
      },
      height: {
        type: [String, Number],
        default: 32
      },
      className: {
        type: String,
        default: ""
      },
      corner: {
        type: String,
        default: "large"
      },
      radius: {
        type: Number,
        default: -1
      },
      background: {
        type: String,
        default: '#FFFFFF'
      },
      optionBackground: {
        type: String,
        default: 'none'
      },
      color: {
        type: String,
        default: 'none'
      },
      optionColor: {
        type: String,
        default: 'none'
      },
      shadow: {
        type: Boolean,
        default: true
      },
      shadowStyle: {
        type: String,
        default: 'dark'
      },
      theme: {
        type: String,
        default: 'light'
      },
    },
    data() {
      return {
        showList: false,
        initValue: '',
        filterData: [],
        choiceIndex: -1
      }
    },
    computed: {
      selectStyles() {
        const styleList = {};
        if (typeof this.width !== 'string') {
          styleList.width = this.width + 'px'
        } else {
          styleList.width = this.width
        }

        if (typeof this.height !== 'string') {
          styleList.paddingTop = this.height + 3 + 'px'
        } else {
          styleList.paddingTop = 'calc(' + this.height + '+ 3px)'
        }

        return styleList
      },
      inputStyles() {
        const styleList = {};
        if (typeof this.width !== 'string') {
          styleList.width = this.width + 'px'
        } else {
          styleList.width = this.width
        }

        if (typeof this.height !== 'string') {
          styleList.paddingTop = this.height + 'px'
        } else {
          styleList.height = this.height
        }

        return styleList
      },
      optionStyles() {
        const styleList = {};
        if(this.optionBackground !== 'none') {
          return {
            backgroundColor: this.optionBackground + '!important'
          }
        }
      },
    },
    watch: {
      initValue() {
        let newData = [];
        if (this.initValue !== '') {
          this.selectData.forEach(item => {
            if (item[this.keyLabel].indexOf(this.initValue) !== -1) {
              newData.push(item)
            }
          });
          this.filterData = newData;
        } else {
          this.filterData = this.selectData;
          this.choiceIndex = -1
        }
      },
    },
    created() {
      if (this.value !== '') {
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i][this.keyValue] === this.value) {
            this.initValue = this.selectData[i][this.keyLabel];
            this.filterData.push(this.selectData[i]);
            this.choiceIndex = 0
            break;
          }
        }
      } else {
        this.initValue = this.value;
        this.filterData = this.selectData
      }
    },
    methods: {
      handelClick() {
        this.showList = !this.showList;
        if(this.showList === false) {
          this.$emit('input', '');
          this.initValue = ''
        }
        this.$emit('on-click')
      },
      optionSelect(obj) {
        this.showList = false;
        this.choiceIndex = 0;
        this.$emit('input', obj.value);
        this.initValue = obj.label;
        if (!this.returnLabel) {
          this.$emit('on-change', obj.value)
        } else {
          this.$emit('on-change', obj)
        }
      },
      handleKeydown(e) {
        const key = e.key || e.code;
        if (key === 'Backspace') {
          return;
        }

        if (this.showList) {
          e.preventDefault();
          if (key === 'Tab') {
            e.stopPropagation();
          }

          // Esc slide-up
          if (key === 'Escape') {
            e.stopPropagation();
            this.hideList()
          }
          // next
          if (key === 'ArrowUp') {
            this.navigateOptions(-1);
          }
          // prev
          if (key === 'ArrowDown') {
            this.navigateOptions(1);
          }
          // enter
          if (key === 'Enter') {
            let choiceItem = {
              key: this.filterData[this.choiceIndex][this.keyValue],
              label: this.filterData[this.choiceIndex][this.keyLabel],
            };
            this.optionSelect(choiceItem);
            this.choiceIndex = 0
          }
        }
      },
      navigateOptions(direction) {
        if(this.filterData.length !== 0) {
          if(this.choiceIndex === -1) {
            if(direction === 1) {
              this.choiceIndex = 0
            } else {
              this.choiceIndex = this.filterData.length - 1
            }
          } else {
            if(this.choiceIndex === 0 && direction === -1) {
              this.choiceIndex = this.filterData.length - 1
            } else if(this.choiceIndex === this.filterData.length - 1 && direction === 1) {
              this.choiceIndex = 0
            } else {
              this.choiceIndex = this.choiceIndex + direction
            }
          }
        }
      },
      hideList() {
        this.showList = false
      }
    },
  }
</script>

<style scoped lang="scss">
  .slideDown-enter-active {
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.8, 1) 0s;
  }
  .slideDown-leave-active {
    transition: all 0.5s cubic-bezier(0.8, 0, 0.2, 1) 0s;
  }
  .slideDown-enter,
  .slideDown-leave-to {
    transform: translateY(-100%);
  }
  .offMiddle{
    transform: scaleY(0);
  }
</style>
