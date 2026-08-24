const files = {
  chatgpt: 'adapters/chatgpt.js',
  claude: 'adapters/claude.js',
  gemini: 'adapters/gemini.js',
  grok: 'adapters/grok.js',
  deepseek: 'adapters/deepseek.js'
};
export function getAdapterScript(provider) { return files[provider]; }
