import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { pdfQueryTool } from '../tools/pdf-query-tool';
import { listDocumentsTool } from '../tools/list-documents-tool';
import { indexPdfLocalWorkflow, indexPdfWorkflow } from '../workflows/index-pdf';
import { pdfChatAgentInstructions } from '../utils/instructions';
import { LLM_MODELS } from '../utils/models';

export const pdfChatAgent = new Agent({
  id: 'pdf-chat-agent',
  name: 'Chat with PDF',
  instructions: pdfChatAgentInstructions,
  model: LLM_MODELS['gpt-5.2'],
  tools: {
    pdfQueryTool: pdfQueryTool({ isLocal: false }),
    listDocumentsTool: listDocumentsTool({ isLocal: false })
  },
  workflows: { indexPdfWorkflow },
  memory: new Memory(),
});

export const pdfChatLocalAgent = new Agent({
  id: 'pdf-chat-local-agent',
  name: 'Chat with PDF (LM Studio)',
  instructions: pdfChatAgentInstructions,
  model: LLM_MODELS.qwen3_1_7b,
  tools: {
    pdfQueryTool: pdfQueryTool({ isLocal: true }),
    listDocumentsTool: listDocumentsTool({ isLocal: true })
  },
  workflows: { indexPdfLocalWorkflow },
  memory: new Memory(),
});