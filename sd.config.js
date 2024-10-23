import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransformGroup({
  name: 'custom/react-native',
  transforms: [
    'attribute/cti',
    'name/camel', // Použijeme camelCase pro názvy proměnných
    'color/hex8android', // Pro podporu hex s alfa kanálem
    'size/remToSp', // Pokud máte velikosti v rem
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
