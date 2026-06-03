import { LibSQLVector } from '@mastra/libsql';

export const vectorStore = new LibSQLVector({
  id: 'pdf-vectors',
  url: 'file:./mastra.db',
});

export const PDF_INDEX_NAME = 'pdf_sections';
export const PDF_INDEX_NAME_LOCAL = 'pdf_sections_local';
