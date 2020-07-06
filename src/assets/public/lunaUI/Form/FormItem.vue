<template>
  <div
    class="lunaFormItem"
    :class="[
      { errBorder: formItemData.errStatus },
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full'
      }
    ]"
  >
    <span :style="labelWidthCount" :class="{ required: formItemData.required }">
      {{ formItemData.title }}
    </span>
    <template v-if="formItemData.render">
      <Render :data="formItemData" :validate-methods="formItemData.validateMethods" :validate-on-change="formItemData.validateOnChange" :render="formItemData.render"></Render>
    </template>
    <p v-if="formItemData.errStatus" class="errorText">
      {{ formItemData.errText }}
    </p>
    <p v-if="formItemData.description" :class="{ moveToBottom: formItemData.errStatus }" class="descriptionText">
      {{ formItemData.description }}
    </p>
  </div>
</template>

<script>
import Render from './formRender.js'

export default {
  name: 'FormItem',
  components: { Render },
  props: {
    labelWidthCount: {
      type: Object,
      default: () => {}
    },
    itemData: {
      type: Object,
      default: () => {}
    },
    corner: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {
      formItemData: {}
    }
  },
  created() {
    this.formItemData = this.itemData
  },
  watch: {
    itemData() {
      this.formItemData = this.itemData
    }
  },
  methods: {}
}
</script>

<style scoped></style>
