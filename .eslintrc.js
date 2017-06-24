/**
 * Created by fio on 17/4/13.
 */

const OFF = 0;
const WARNING = 1;
const ERROR = 2;


module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'mocha': true
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  ecmaFeatures: {
    'jsx': true
  },
  plugins: [
    'react'
  ],
  rules: {
    // TODO : define own rules
    'arrow-body-style': [OFF],  // 警告: (单行)箭头函数包裹在{}中
    'comma-dangle': [OFF, 'never'], // 警告:
    'func-names': OFF,  // 关闭: 不应该使用匿名函数
    'global-require': [OFF], // 警告: 不应全局使用require
    'indent': [ERROR, 4, { 'SwitchCase': 1 }], // 错误: 2个空格缩进
    'jsx-quotes': [OFF, 'prefer-single'],   // 警告: 应该使用单引号
    'max-len': [ERROR, 120, { ignoreUrls: true }],  // 错误: 单行最大字符数
    'new-cap': [OFF],   // 警告: 大写开头的函数仅应作为构造函数
    'no-else-return': [OFF],    // 警告: if 中有return语句的,不应该再出现else
    'no-param-reassign': [OFF], // 警告: 对函数参数进行了修改
    'no-use-before-define': [OFF],  //警告: 未定义前使用
    'prefer-rest-params': [OFF],    // 警告: 使用...args, 而不是arguments
    'quotes': [OFF, 'single'],  // 警告: 使用单引号
    'react/jsx-indent-props': [OFF, 2], // 警告: jsx语法中props 4个空格缩进
    'react/jsx-indent': [ERROR, 2], // 错误: jsx语法中应该4个空格缩进
    "react/no-did-mount-set-state": [OFF],
    'react/jsx-no-bind': [ERROR, {  // 错误: jsx语法中,不出现bind函数,但是可以出现箭头函数
      allowArrowFunctions: true   //
    }],
    // 'react/jsx-uses-react': [OFF],  // 出现jsx语法时, 默认React是被使用到的, 而非多余
    'react/prefer-stateless-function': [OFF], // 关闭: 使用stateless 函数
    'react/prop-types': [OFF],  // 警告: 需要定义prop的type
    'react/react-in-jsx-scope': [OFF],  // 警告: 使用到jsx时候,React需要在语法域中
    'react/no-multi-comp': [OFF],    // 警告: 一个文件中声明了多个component
    'spaced-comment': [ERROR, "always"],  // 关闭: 注释起始位置不出现空格
    'strict': [OFF], // 警告: 不应该使用use strict
    'prefer-template': [OFF],
    'no-underscore-dangle': [OFF],
    "array-callback-return": "error",
    "block-spacing": "error",
    "brace-style": ["off"],
    "camelcase": ["off", { "properties": "never" }],
    "callback-return": ["error", ["cb", "callback", "next"]],
    "comma-spacing": "error",
    "comma-style": ["error", "last"],
    "consistent-return": "off",
    "curly": ["error", "all"],
    "default-case": "error",
    "dot-notation": ["error", { "allowKeywords": true }],
    "eol-last": "error",
    "eqeqeq": "error",
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "guard-for-in": "error",
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "keyword-spacing": "error",
    "lines-around-comment": ["error", {
      "beforeBlockComment": false,
      "afterBlockComment": false,
      "beforeLineComment": false,
      "afterLineComment": false
    }],
    "semi": 2,
    "import/no-unresolved": [ERROR, { ignore: ['vendor-manifest.json'] }],
    'no-extend-native': [OFF],
    'no-restricted-syntax': [OFF],
    'no-useless-escape': [OFF],
    "react/require-extension": [OFF],
    "react/jsx-filename-extension": [OFF],
    "react/self-closing-comp": [OFF],
    "react/jsx-first-prop-new-line": [OFF],
    "react/jsx-closing-bracket-location": [OFF],
    "object-curly-spacing": [2, "never"],
    "space-infix-ops": ["error", {"int32Hint": false}],
    "quotes": ["error", "single"],
    "arrow-parens": [2, "as-needed"],
    "arrow-body-style": ["error", "as-needed"],
    "comma-dangle": ["error", "never"],
    "generator-star-spacing": 0
  }
};
