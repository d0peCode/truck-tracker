import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['**/presets/*'],
  },
  {
    rules: {
      'vue/custom-event-name-casing': ['error', 'kebab-case', { ignores: [] }],
    },
  },
)
