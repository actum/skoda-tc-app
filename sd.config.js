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
  source: ['tokens/transformedTokens.json'],
  platforms: {
    'react-native': {
      transformGroup: 'custom/react-native',
      buildPath: 'app/',
      files: [
        {
          destination: 'styles.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
