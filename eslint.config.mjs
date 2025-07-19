import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Disable problematic rules for portfolio project
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];

export default eslintConfig;
