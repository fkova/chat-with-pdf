import { MastraModelConfig } from "@mastra/core/llm";
import { DynamicArgument } from "@mastra/core/types";

export const LMSTUDIO_MODELS = {
  // local
  qwen3_coder_30b: {
    id: 'lmstudio/qwen/qwen3-coder-30b',
    url: 'http://127.0.0.1:1234/v1'
  },

  // local fast, small with reasoning capabilities
  qwen3_1_7b: {
    id: 'lmstudio/qwen/qwen3-1.7b',
    url: 'http://127.0.0.1:1234/v1'
  },

  // local via LM Link 
  qwen3_9b: {
    id: 'lmstudio/qwen/qwen3.5-9b',
    url: 'http://127.0.0.1:1234/v1'

  },
  qwen2_5_coder_14b: {
    id: 'lmstudio/qwen/qwen2.5-coder-14b',
    url: 'http://127.0.0.1:1234/v1'
  },

  // OpenAI
  'gpt-5.2': 'openai/gpt-5.2',
} satisfies Record<string, DynamicArgument<MastraModelConfig>>;