module.exports = {
  singleQuote: true, // 是否支持单引号
  printWidth: 100, // 单行的最大字符数，默认为 80
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
};
