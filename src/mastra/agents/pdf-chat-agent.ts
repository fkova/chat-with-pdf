import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { pdfQueryTool } from '../tools/pdf-query-tool';
import { listDocumentsTool } from '../tools/list-documents-tool';
import { indexPdfWorkflow } from '../workflows/index-pdf';
import { pdfChatAgentInstructions } from '../utils/instructions';
import { LMSTUDIO_MODELS } from '../utils/llm-models';

export const pdfChatAgent = new Agent({
  id: 'pdf-chat-agent',
  name: 'Chat with PDF',
  instructions: pdfChatAgentInstructions,
  model: LMSTUDIO_MODELS.qwen3_1_7b,
  tools: { pdfQueryTool, listDocumentsTool },
  workflows: { indexPdfWorkflow },
  memory: new Memory(),
});
