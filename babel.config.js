module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'hot-updater/babel-plugin',
    [
      'module-resolver',
      {
        alias: {
          hooks: './src/hooks',
          components: './src/components',
          provider: './src/provider',
          // '@component': './src/component',
          '@icons': './src/icons',
          '@images': './assets/images',
          '@colors': './src/colors/colors.ts',
          '@utils': './src/common/utils.tsx',
          '@constants': './src/common/constants.ts',
          '@storage': './src/storage.tsx',
          '@lottie': './assets/lottie',
          '@styles': './src/styles',
          modal: './src/modal',
          graph: './src/graphql',
          view: './src/view',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
