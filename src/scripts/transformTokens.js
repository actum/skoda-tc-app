import * as fs from 'fs';

const inputPath = '_src/tokens/tokens.json';
const outputPath = '_src/tokens/transformedTokens.json';

// Načtení původních tokenů
const rawTokens = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Funkce pro transformaci tokenů
function transformTokens(rawTokens) {
  const transformed = {};

  for (const category in rawTokens) {
    const categoryTokens = rawTokens[category];
    transformed[category] = {};

    // Pokud je categoryTokens pole, převedeme ho na objekt s klíči
    if (Array.isArray(categoryTokens)) {
      categoryTokens.forEach((item, index) => {
        // Použijeme hodnotu 'name' jako klíč
        const key = item.name || index;
        transformed[category][key] = {
          value: item.style || item.value,
        };
      });
    } else {
      for (const tokenName in categoryTokens) {
        const tokenValue = categoryTokens[tokenName];

        // Pokud je tokenValue objekt s 'value', ponecháme ho
        if (tokenValue.hasOwnProperty('value')) {
          transformed[category][tokenName] = tokenValue;
        } else {
          // Jinak vytvoříme objekt s 'value'
          transformed[category][tokenName] = {
            value: tokenValue,
          };
        }
      }
    }
  }

  return transformed;
}

const transformedTokens = transformTokens(rawTokens);

// Uložení transformovaných tokenů
fs.writeFileSync(outputPath, JSON.stringify(transformedTokens, null, 2));
