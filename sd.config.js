import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransformGroup({
  name: 'custom/react-native',
  transforms: [
    'attribute/cti',
    'name/camel',
    'color/hex8android',
    'size/remToSp',
  ],
});

export default {
  source: ['src/tokens/transformedTokens.json'],
  platforms: {
    'react-native': {
      transformGroup: 'custom/react-native',
      buildPath: 'src/assets/',
      files: [
        {
          destination: 'styles.tsx',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
