module.exports = {
  semi: true,
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: false,
  jsxSingleQuote: true,
  quoteProps: "preserve",
  arrowParens: "avoid",
  proseWrap: "preserve",
  overrides: [
    {
      "files": ["*.md"],
      "options": {
        embeddedLanguageFormatting: "off",
      },
    },
  ],
};
