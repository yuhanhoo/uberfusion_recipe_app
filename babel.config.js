module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@models': './src/models',
          '@services': './src/services',
          '@repositories': './src/repositories',
          '@store': './src/store',
          '@data': './src/data',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
