module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    require.resolve('eslint-config-standard'),
  ],
  rules: {
    // vue 相关规则 plugin:vue/essential 中提供了较为松散的校验规则
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }], // 可能会导致iview Col Input 报错
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/this-in-template': 'error',
    'vue/html-end-tags': 'error',
    'vue/no-template-shadow': 'error',
    'vue/html-quotes': 'error',
    'vue/html-indent': 'error',
    // vue组件在template中使用时的命名方式 这里使用大驼峰的方式
    // 'vue/component-name-in-template-casing': ['error',
    //   'PascalCase',{ 'ignores': [] }
    // ],
    // 闭合标签之后 强制加个空格
    // 'vue/html-closing-bracket-spacing': 'error',
    // 在自定义组件中强制使用连字符 - 命名的 属性 props
    'vue/attribute-hyphenation': 'warn',
    // 强制要求按照规定顺序书写 指令 属性 事件
    'vue/attributes-order': 'warn',
    // 强制 prop在组件中声明时使用小驼峰的命名方式
    'vue/prop-name-casing': 'warn',
    // 强制 {{  }} 表达式空格
    'vue/mustache-interpolation-spacing': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
