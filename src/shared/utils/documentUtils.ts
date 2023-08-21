import { DocumentType } from '@pitchtalk/contract-api-js/dist/core';

export enum Attachments {
  TOKENOMICS = 'tokenomics',
  PITCHDECK = 'pitchdeck',
  WHITEPAPER = 'whitepaper',
}

export const AttachmentsDocTypes = {
  [Attachments.TOKENOMICS]: DocumentType.Tokenomics,
  [Attachments.PITCHDECK]: DocumentType.Diagram,
  [Attachments.WHITEPAPER]: DocumentType.Whitepaper,
};

export const DocTypesAttachments = {
  [DocumentType.Tokenomics]: Attachments.TOKENOMICS,
  [DocumentType.Diagram]: Attachments.PITCHDECK,
  [DocumentType.Whitepaper]: Attachments.WHITEPAPER,
  [DocumentType.Other]: Attachments.WHITEPAPER,
};
