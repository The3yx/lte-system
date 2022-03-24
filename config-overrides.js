const { override, addDecoratorsLegacy, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    addDecoratorsLegacy()
);

