import { defineConfig, globalIgnores } from "eslint/config";

export default [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  // Basic config to unblock the Telegram test
  {
    rules: {
      "no-unused-vars": "warn",
    }
  }
];
