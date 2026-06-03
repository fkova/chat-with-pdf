import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { vectorStore, PDF_INDEX_NAME, PDF_INDEX_NAME_LOCAL } from '../lib/vector-store';
import { IsLocalParam } from '../utils/types';
import { EMBEDDING_MODELS } from '../utils/models';

export const listDocumentsTool = ({ isLocal }: IsLocalParam) => createTool({
  id: 'list-documents',
  description: `List all indexed PDF documents available for quizzing.
Use this tool when:
- The user asks what documents/books are available
- You need to know which documents exist before quizzing
- The user wants to quiz but hasn't specified which document`,
  inputSchema: z.object({}),
  execute: async () => {
    try {
      // HACK: Vector stores don't have a "list all documents" operation, so we use a
      // workaround: embed an arbitrary word and query for up to 1000 results, then
      // extract unique documentIds from the metadata. This has known limitations:
      // - Wastes an embedding API call on a meaningless query
      // - May miss documents if there are >1000 total chunks
      // - Uses similarity search when we really want metadata aggregation
      //
      // A cleaner approach would be a separate document registry, but this keeps the
      // template simple with fewer moving parts. For production, consider tracking
      // indexed documents in your own database.
      const embeddingModel = new ModelRouterEmbeddingModel(isLocal ? EMBEDDING_MODELS.nomic_embed_text_v1_5 : EMBEDDING_MODELS['text-embedding-3-small']);
      const { embeddings } = await embeddingModel.doEmbed({ values: ['document'] });

      const results = await vectorStore.query({
        indexName: isLocal ? PDF_INDEX_NAME_LOCAL : PDF_INDEX_NAME,
        queryVector: embeddings[0],
        topK: 1000,
      });

      // Extract unique documents from metadata
      const documentsMap = new Map<
        string,
        {
          documentId: string;
          title: string;
          totalPages: number;
        }
      >();

      for (const result of results) {
        const docId = result.metadata?.documentId as string;
        if (docId && !documentsMap.has(docId)) {
          documentsMap.set(docId, {
            documentId: docId,
            title: (result.metadata?.documentTitle as string) || 'Untitled',
            totalPages: (result.metadata?.totalPages as number) || 0,
          });
        }
      }

      const documents = Array.from(documentsMap.values());

      if (documents.length === 0) {
        return {
          documents: [],
          message: `No documents have been indexed yet. Use the index-pdf workflow to add a PDF.`,
        };
      }

      return {
        documents,
        count: documents.length,
      };
    } catch {
      return {
        documents: [],
        message: 'Could not retrieve documents. The vector index may not exist yet.',
      };
    }
  },
});
