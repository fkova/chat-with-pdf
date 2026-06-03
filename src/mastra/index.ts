import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { indexPdfWorkflow, indexPdfLocalWorkflow } from './workflows/index-pdf';
import { pdfChatAgent, pdfChatLocalAgent } from './agents/pdf-chat-agent';
import { vectorStore } from './lib/vector-store';

export const mastra = new Mastra({
  workflows: { indexPdfWorkflow, indexPdfLocalWorkflow },
  agents: { pdfChatAgent, pdfChatLocalAgent },
  vectors: { vectorStore },
  storage: new LibSQLStore({
    id: 'mastra-storage',
    url: 'file:./mastra.db',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
