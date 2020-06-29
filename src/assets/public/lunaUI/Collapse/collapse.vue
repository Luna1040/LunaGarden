<template>
  <div class="lunaCollapse">
    <div
      class="lunaPanel"
      v-for="(i, index) in panelList"
      :class="[
        className,
        {
          squareCorner: corner === 'square',
          smallCorner: corner === 'small',
          filletCorner: corner === 'fillet',
          largeCorner: corner === 'large',
          fullCorner: corner === 'full',
          roundCorner: corner === 'round',
        },
        { lightCard: theme === 'light', darkCard: theme === 'dark' },
      ]"
    >
      <div
        class="lunaPanelTitle"
        @click="togglePanel(index)"
        v-if="i.title && i.title !== ''"
      >
        <span>{{ i.title }}</span>
        <div :class="{ rotate90: value === index }">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="lunaPanelTitle" @click="togglePanel(index)" v-else>
        <div :class="{ rotate180: value === index }">
          <i class="iconfont icon-down"></i>
        </div>
      </div>
      <transition name="slideDown">
        <div class="lunaPanelBody" v-show="value === index">
          <pre v-if="code" v-highlight><code>{{ i.content }}</code></pre>
          <p v-else>{{ i.content }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "collapse",
  props: {
    panelList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: Number,
      default: -1,
    },
    radius: {
      type: Number,
      default: -1,
    },
    corner: {
      type: String,
      default: "large",
    },
    theme: {
      type: String,
      default: "light",
    },
    code: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  },
  methods: {
    togglePanel(index) {
      if (index === this.value) {
        this.$emit("input", -1);
      } else {
        this.$emit("input", index);
      }
    },
  },
};
</script>

<style scoped></style>
