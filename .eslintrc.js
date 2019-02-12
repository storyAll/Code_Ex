// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    // 0:关闭规则 2:报错
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': 0,//禁止使用alert confirm prompt
    'no-bitwise': 0,//禁止使用按位运算符
    'no-continue': 0,//禁止使用continue
    'no-inline-comments': 0,//禁止行内备注
    'no-nested-ternary': 0,//禁止使用嵌套的三目运算
    'no-path-concat': 0,//node中不能使用__dirname或__filename做路径拼接
    'no-plusplus': 0,//禁止使用++，--
    'no-process-env': 0,//禁止使用process.env
    'no-process-exit': 0,//禁止使用process.exit()
    'no-restricted-modules': 0,//如果禁用了指定模块，使用就会报错
    'no-script-url': 0,//禁止使用javascript:void(0)
    'no-sequences': 0,//禁止使用逗号运算符
    'no-ternary': 0,//禁止使用三目运算符
    'no-this-before-super': 0,//在调用super()之前不能使用this或super
    'no-var': 0,//禁用var，用let和const代替
    'arrow-parens': 0,//箭头函数用小括号括起来
    'arrow-spacing': 0,//=>的前/后括号
    'accessor-pairs': 0,//在对象中使用getter/setter
    'block-scoped-var': 0,//块语句中使用var
    'comma-spacing': 0,//逗号前后的空格
    'wrap-regex': 0,//正则表达式字面量用小括号包起来
    'id-match': 0,//命名检测
    'require-yield': 0,//生成器函数必须有yield
    'semi-spacing': [0, {'before': false, 'after': true}],//分号前后空格
    'sort-vars': 0,//变量声明时排序
    'space-after-keywords': [0, 'always'],//关键字后面是否要空一格
    'space-before-blocks': [0, 'always'],//不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空格
    'space-in-parens': [0, 'never'],//小括号里面要不要有空格
    'space-infix-ops': 0,//中缀操作符周围要不要有空格
    'space-unary-ops': [0, {'words': true, 'nonwords': false}],//一元运算符的前/后要不要加空格
    'spaced-comment': 0,//注释风格要不要有空格什么的
    // 强制驼峰法命名
    'camelcase': 2
  }
}
