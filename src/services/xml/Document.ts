import { ParentNode } from './ParentNode';

export class Document extends ParentNode {
  nodeType: number = 9;

  constructor() {
    super("#document");
  }
}