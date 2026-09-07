import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      {
        // The shadcn pattern exports a *Variants constant next to its
        // component (e.g. buttonVariants) — that is fine for fast refresh.
        // allowExportNames takes exact names, not globs.
        plugins: { 'react-refresh': reactRefresh },
        rules: {
          'react-refresh/only-export-components': [
            'error',
            { allowConstantExport: true, allowExportNames: ['buttonVariants'] },
          ],
        },
      },
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
