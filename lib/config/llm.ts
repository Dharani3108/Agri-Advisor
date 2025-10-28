// Environment Configuration for LLM API
export const ENV_CONFIG = {
  // LLM API Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // Fallback configuration
  FALLBACK_ENABLED: process.env.FALLBACK_ENABLED !== 'false',
  
  // API Settings
  MAX_TOKENS: parseInt(process.env.MAX_TOKENS || '2000'),
  TEMPERATURE: parseFloat(process.env.TEMPERATURE || '0.7'),
  MODEL: process.env.LLM_MODEL || 'gpt-3.5-turbo',
  
  // Rate limiting
  RATE_LIMIT_REQUESTS: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
};

// Validation function
export function validateLLMConfig(): { isValid: boolean; message: string } {
  if (!ENV_CONFIG.OPENAI_API_KEY) {
    return {
      isValid: false,
      message: 'OPENAI_API_KEY is required. Please set it in your environment variables.'
    };
  }
  
  return {
    isValid: true,
    message: 'LLM configuration is valid'
  };
}

// Get API key with validation
export function getAPIKey(): string {
  const validation = validateLLMConfig();
  if (!validation.isValid) {
    throw new Error(validation.message);
  }
  return ENV_CONFIG.OPENAI_API_KEY;
}
