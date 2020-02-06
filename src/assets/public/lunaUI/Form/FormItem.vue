<template>
  <div
    class="lunaFormItem"
    :class="[
      { morePadding: formItemData.errStatus && formItemData.description },
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
    <div>
      <template v-if="formItemData.render">
        <Render
          :data="formItemData"
          :validateMethods="formItemData.validateMethods"
          :validateOnChange="formItemData.validateOnChange"
          :render="formItemData.render"
        ></Render>
      </template>
      <p
        v-if="formItemData.description"
        :class="{ moveMargin: formItemData.errStatus }"
      >
        {{ formItemData.description }}
      </p>
      <p v-if="formItemData.errStatus" class="errorText">
        {{ formItemData.errText }}
      </p>
    </div>
  </div>
</template>

<script>
import Render from './formRender.js'
import {
  noChara,
  noChinese,
  noChineseChara,
  noEnglish,
  noEnglishChara,
  noNumber,
  email,
  phone,
  IDNumber,
  urlLink
} from '../js/validate'

export default {
  name: 'FormItem',
  components: { Render },
  props: {
    labelWidthCount: {
      type: Object,
      default: {}
    },
    itemData: {
      type: Object,
      default: {}
    },
    corner: {
      type: String,
      default: 'large'
    }
  },
  data () {
    return {
      formItemData: {}
    }
  },
  created () {
    this.formItemData = this.itemData
  },
  methods: {}
}
</script>

<style scoped></style>
