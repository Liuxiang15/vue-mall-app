const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            // 设置1rem为75px,宽度是750rem
            remUnit: 75,
          }),
        ],
      },
    },
  },
};
