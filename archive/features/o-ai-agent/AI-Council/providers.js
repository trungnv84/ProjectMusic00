export const PROVIDER_CONFIG = {
  chatgpt: {
    label: 'ChatGPT',
    matches: [
      /^https:\/\/chatgpt\.com(?:\/|$)/i,
      /^https:\/\/chat\.openai\.com(?:\/|$)/i
    ],
    roles: ['Strategic Analyst', 'Software Architect', 'Synthesizer'],
    adapter: 'adapters/chatgpt.js'
  },
  claude: {
    label: 'Claude',
    matches: [
      /^https:\/\/claude\.ai(?:\/|$)/i
    ],
    roles: ['Devil\'s Advocate', 'Reviewer', 'Risk Analyst'],
    adapter: 'adapters/claude.js'
  },
  gemini: {
    label: 'Gemini',
    matches: [
      /^https:\/\/gemini\.google\.com(?:\/|$)/i
    ],
    roles: ['Researcher', 'Market Analyst', 'Fact Checker'],
    adapter: 'adapters/gemini.js'
  },
  grok: {
    label: 'Grok',
    matches: [
      /^https:\/\/grok\.com(?:\/|$)/i,
      /^https:\/\/x\.com\/i\/grok(?:\/|$)/i
    ],
    roles: ['Trend Analyst', 'Counter-example Analyst', 'Risk Finder'],
    adapter: 'adapters/grok.js'
  },
  deepseek: {
    label: 'DeepSeek',
    matches: [
      /^https:\/\/chat\.deepseek\.com(?:\/|$)/i,
      /^https:\/\/deepseek\.com(?:\/|$)/i
    ],
    roles: ['Logic Checker', 'Financial Analyst', 'Debugger'],
    adapter: 'adapters/deepseek.js'
  }
};

export const PROVIDER_ORDER = ['chatgpt', 'claude', 'gemini', 'grok', 'deepseek'];

export function detectProvider(url) {
  if (!url) return null;
  for (const [provider, config] of Object.entries(PROVIDER_CONFIG)) {
    if (config.matches.some((pattern) => pattern.test(url))) return provider;
  }
  return null;
}
